import "../styles.css";
import { DeleteForever, Person } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LuggageRoundedIcon from "@mui/icons-material/LuggageRounded";
import {
  AspectRatio,
  Avatar,
  Checkbox,
  Dropdown,
  Input,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Typography
} from "@mui/joy";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import { useLocation, useRoute } from "wouter";
import AddMemberModal from "../components/modal/AddMemberModal";
import TripMenu from "../components/modal/TripMenu";
import { useAllUsers, useTrip } from "../firebase.ts";
import { Trip, User } from "../types.ts";


const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "2-digit"
  };
  return new Intl.DateTimeFormat("en-GB", options).format(date);
};

const TripOverviewPage = () => {
  const [, params] = useRoute("/tripoverview/:tripId");
  const tripId = params?.tripId;

  const [trip, setTrip] = useTrip(tripId ?? "");
  const [todos, setTodos] = React.useState<string[]>(trip?.todos || []);
  const [, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  const allUsers = useAllUsers();
  const [tripMembers, setTripMembers] = useState<User[]>([]);
  const firestore = useFirestore();

  useEffect(() => {
    if (tripId) {
      setLoading(false);
    }

    // loading the data once we get trip
    if (allUsers && trip?.members) {
      const filteredMembers = allUsers.filter(user => trip.members.includes(user.uid));
      setTripMembers(filteredMembers);
    }
  }, [tripId, allUsers, trip?.members]);

  if (!trip) {
    return <div>Loading...</div>;
  }

  const handleAddMember = async (user: User) => {
    if (trip) {
      const updatedMembers = [...trip.members, user.uid];
      const updatedTrip = { ...trip, members: updatedMembers };
      await setDoc(doc(firestore, "Trips", trip.tripId), updatedTrip);

      // get added Member data and update
      const userRef = doc(firestore, "Users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        const updatedUser = {
          ...userData,
          trips: [...(userData.trips || []), trip.tripId],
        };
        await setDoc(userRef, updatedUser);
      }
    }
  };

  const handleDeleteMember = async (uid: string) => {
    if (trip) {
      alert(`${uid}`);
      const updatedMembers = trip.members.filter(memberId => memberId !== uid);
      const updatedTrip = { ...trip, members: updatedMembers };
      await setDoc(doc(firestore, "Trips", trip.tripId), updatedTrip);

      // remove from users trips
      const userToDelete = tripMembers.find(member => member.uid === uid);
      if (userToDelete) {
        const userRef = doc(firestore, "Users", userToDelete.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          const updatedUserTrips = userData.trips?.filter(tripId => tripId !== trip.tripId) || [];
          const updatedUser = {
            ...userData,
            trips: updatedUserTrips,
          };
          await setDoc(userRef, updatedUser);
          alert(`Removed trip from user ${uid}'s trips list`);
        }
      }
    }
  };

  const handleDeleteTrip = async (trip: Trip) => {
    alert(`${trip.tripId}`);
    if (trip) {
      // delete from all the members trips[]
      const members = trip.members;
      for (const memberId of members) {
        const userRef = doc(firestore, "Users", memberId);
        const userData = await getDoc(userRef);
        if (userData.exists()) {
          const data = userData.data() as User;
          const updatedTrips = data.trips?.filter(tripId => tripId !== trip.tripId) || [];
          await updateDoc(userRef, { trips: updatedTrips });
        }
      }

      // delete all the activities
      for (const activityId of trip.activities || []) {
        await deleteDoc(doc(firestore, "Activities", activityId));
      }

      // delete the actial trip
      try {
        await deleteDoc(doc(firestore, "Trips", trip.tripId));
        alert(`Trip ${trip.destination} deleted successfully`);
      } catch (error) {
        console.error("Error deleting trip:", error);
        alert("Error deleting trip. Please try again.");
      }
    }
    setLocation("/home");
  };


  const onChangeTodo = async (idx: number, newTodo: string) => {
    const newTodos = [...todos];
    newTodos[idx] = newTodo;
    setTodos(newTodos);

    if (trip) {
      const updatedTrip = { ...trip, todos: newTodos };
      await setTrip(updatedTrip);
    }
  };

  const addNewTodo = async () => {
    const newTodos = [...todos];
    newTodos.push("");
    setTodos(newTodos);
    if (trip) {
      const updatedTrip = { ...trip, todos: newTodos };
      await setTrip(updatedTrip);
    }
  };

  const handlePackingClick = () => {
    setLocation(`/packinglist/${tripId}`);
  };

  const handleItineraryClick = () => {
    setLocation(`/itinerary/${tripId}`);
  }

  return (
    <Stack
      direction="column"
      alignItems={"center"}
      height="100%"
      bgcolor={"var(--background-color)"}
      fontFamily={"var(--font-primary)"}
      color={"var(--tertiary-color)"}
    >
      <Stack
        width="80%"
        height="100%"
        direction="row"
        gap={5}
        justifyContent="space-around"
        py="100px"
      >
        <TripMenu
          style={{ position: "absolute", top: 140, right: 150 }}
          handleDeleteTrip={() => handleDeleteTrip(trip)}
        />
        <Stack width="60%" direction="column">
          <Stack direction="row" justifyContent="space-between" alignItems="flex-end" pb="10px">
            <Typography
              fontFamily={"var(--font-primary)"}
              level="h1"
              fontSize="53px"
              pl="20px"
              sx={{ color: "var(--tertiary-color)", marginLeft: "-20px", marginBottom: "-9px"}}
            >
              {trip?.destination}
            </Typography>
            <Typography level="body-lg" fontSize="24px" fontWeight="bold">
              {trip?.from && trip?.to ? `${formatDate(trip.from.toDate())} - ${formatDate(trip.to.toDate())}` : ""}
            </Typography>
          </Stack>
          <AspectRatio
            ratio="16/9"
            sx={(theme) => ({
              boxShadow: theme.shadow.md,
              "--joy-shadowChannel": theme.vars.palette.primary.mainChannel,
              "--joy-shadowRing": "inset 0 -3px 0 rgba(0 0 0 / 0.24)",
              width: "100%", borderRadius: "lg",
            })}
          >	
		  	<img src={trip.image} alt="trip image" />
          </AspectRatio>
          <List sx={{ maxWidth: 320, paddingTop: "20px" }}>
            <ListItem>
              <ListItemButton onClick={handleItineraryClick}>
                <ListItemDecorator>
                  <CalendarTodayIcon sx={{ fontSize: "24px", color: "var(--tertiary-color)" }}/>
                </ListItemDecorator>
                <Typography level="body-lg" fontSize="24px" fontWeight="bold">View Itinerary</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handlePackingClick}>
                <ListItemDecorator>
                  <LuggageRoundedIcon sx={{ fontSize: "28px", color: "var(--tertiary-color)" }}/>
                </ListItemDecorator>
                <Typography level="body-lg" fontSize="24px" fontWeight="bold">View Packing List</Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>

        <Stack width="30%" gap="40px" paddingTop={"32px"}>
          <Stack>
            <Typography level="h2" fontSize="30px">Members</Typography>
            <Stack direction="row" flexWrap="wrap" gap="24px">
              {tripMembers?.map((member, idx) => (
                <Dropdown key={idx}>
                  <MenuButton variant="plain" sx={{ p: 0 }}>
                    <Avatar
                      size="lg"
                      sx={(theme) => ({
                        boxShadow: theme.shadow.md,
                        "--joy-shadowChannel": theme.vars.palette.primary.mainChannel,
                        "--joy-shadowRing": "inset 0 -3px 0 rgba(0 0 0 / 0.24)",
                      })}
                    >
                      {member?.name?.charAt(0) ?? "?"}
                    </Avatar>
                  </MenuButton>
                  <Menu placement="bottom-end">
                    {/* display name */}
                    <MenuItem>
                      <ListItemDecorator>
                        <Person/>
                      </ListItemDecorator>{member.name}
                    </MenuItem>
                    <ListDivider/>
                    {/* delete action */}
                    <MenuItem variant="soft" color="danger" onClick={() => handleDeleteMember(member.uid)}>
                      <ListItemDecorator>
                        <DeleteForever/>
                      </ListItemDecorator>{" "}Delete
                    </MenuItem>
                  </Menu>
                </Dropdown>
              ))}
              {trip && (
                <AddMemberModal
                  handleAddMember={handleAddMember} // so handling members is done in overview page
                />
              )}

            </Stack>
          </Stack>

          <Stack>
            <Typography level="body-lg" fontSize="30px" fontWeight="bold">To Do</Typography>
            <List
              sx={(theme) => ({
                boxShadow: theme.shadow.md,
                "--joy-shadowChannel": theme.vars.palette.primary.mainChannel,
                "--joy-shadowRing": "inset 0 -3px 0 rgba(0 0 0 / 0.24)",
                borderRadius: "lg", bgcolor: "white"
              })}
            >
              {todos.map((todo, idx) => (
                <ListItem key={idx}>
                  <Checkbox/>
                  <Input
                    variant="plain"
                    placeholder="Type here"
                    onChange={(e) => onChangeTodo(idx, e.target.value)}
                    value={todo}
                  />
                </ListItem>
              ))}
              <ListItemButton onClick={addNewTodo} sx={{ justifyContent: "center" }}>
                <AddIcon/> Add new to do
              </ListItemButton>
            </List>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TripOverviewPage;