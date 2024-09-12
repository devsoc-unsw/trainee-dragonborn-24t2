import '../styles.css';
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  AspectRatio,
  Stack,
  Typography,
  Button,
  Input,
  Checkbox,
} from '@mui/joy';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddIcon from '@mui/icons-material/Add';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import LuggageRoundedIcon from '@mui/icons-material/LuggageRounded';
import { useTrip, useAllUsers, useUser } from "../firebase.ts";
import { useRoute } from "wouter";
import AddMemberModal from '../components/modal/AddMemberModal';
import { User } from '../types.ts';
import { collection, doc, documentId, Firestore, getDoc, query, setDoc, where } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useFirestoreDocData } from "reactfire";


const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: '2-digit'
  };
  return new Intl.DateTimeFormat('en-GB', options).format(date);
};

const TripOverviewPage = () => {
  const [setToDo] = useState("");
  const [match, params] = useRoute("/tripoverview/:tripId");
  const tripId = params?.tripId;
  const [trip, setTrip] = useTrip(tripId ?? "");
  const [, setLocationPath] = useLocation();
  const [openAddMemberModal, setOpenAddMemberModal] = useState(false);

  const allUsers = useAllUsers();
  const [tripMembers, setTripMembers] = useState<User[]>([]);

  useEffect(() => {
    if (allUsers && trip?.members) {
      const filteredMembers = allUsers.filter(user => trip.members.includes(user.name));
      setTripMembers(filteredMembers);
    }
  }, [allUsers, trip?.members]); // updating the icons as we add

  // const handleAddMember = async (user: User) => {
  //   if (trip) {
  //     const updatedMembers = [...trip.members, user.name];
  //     const updatedTrip = { ...trip, members: updatedMembers };
  //     await setTrip(updatedTrip)

  //     // add this trip to the members
  //     const [userData, setUser] = useUser(user.uid);
  //     if (userData) {
  //       alert(`${userData.uid}`)
  //       const updatedUser = {
  //           ...userData,
  //           trips: [...(user.trips || []), trip.tripId]
  //       };
  //       await setUser(updatedUser);
  //     }

  //   }
  // };
  const firestore = useFirestore();
  const handleAddMember = async (user: User) => {
    if (trip) {
      // Update trip members
      const updatedMembers = [...trip.members, user.name];
      const updatedTrip = { ...trip, members: updatedMembers };
      await setDoc(doc(firestore, "Trips", trip.tripId), updatedTrip);

      // Fetch user data
      const userRef = doc(firestore, "Users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as User;

        // Update user's trips
        const updatedUser = {
          ...userData,
          trips: [...(userData.trips || []), trip.tripId],
        };
        await setDoc(userRef, updatedUser);
        alert(`Updated user trips for UID: ${userData.uid}`);
      } else {
        console.error("User does not exist");
      }
    }
  };

  const [todos, setTodos] = React.useState<string[]>(trip?.todos || []);

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
    setLocationPath(`/packinglist/${tripId}`);
  };

  return (
    <Stack
      direction="column"
      alignItems={"center"}
      height="100%"
      bgcolor={'var(--background-color)'}
      fontFamily={'var(--font-primary)'}
      color={'var(--tertiary-color)'}
    >
      <Stack
        width="80%"
        height="100%"
        direction="row"
        gap={5}
        justifyContent="space-around"
        py="100px"
      >
        <Stack width="60%" direction="column">
          <Stack direction="row" justifyContent="space-between" alignItems="flex-end" pb="10px">
            <Typography fontFamily={'var(--font-primary)'} level="h1" fontSize="53px" pl="20px" sx={{ color: 'var(--tertiary-color)' }}>
              {trip?.destination}
            </Typography>
            <Typography level="body-lg" fontSize="24px" fontWeight="bold">
              {trip?.from && trip?.to ? `${formatDate(trip.from.toDate())} - ${formatDate(trip.to.toDate())}` : ''}
            </Typography>
          </Stack>
          <AspectRatio
            ratio="16/9"
            sx={(theme) => ({
              boxShadow: theme.shadow.md,
              '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
              '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
              width: "100%", borderRadius: "lg",
            })}
          >
            <img src="/japan.jpg" alt="Trip Destination" />
          </AspectRatio>
          <List sx={{ maxWidth: 320, paddingTop: '20px' }}>
            <ListItem>
              <ListItemButton component="a" href="/itinerary">
                <ListItemDecorator>
                  <CalendarTodayIcon sx={{ fontSize: '24px', color: 'var(--tertiary-color)' }} />
                </ListItemDecorator>
                <Typography level="body-lg" fontSize="24px" fontWeight="bold">View Itinerary</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handlePackingClick}>
                <ListItemDecorator>
                  <LuggageRoundedIcon sx={{ fontSize: '28px', color: 'var(--tertiary-color)' }} />
                </ListItemDecorator>
                <Typography level="body-lg" fontSize="24px" fontWeight="bold">View Packing List</Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>

        <Stack width='30%' gap="40px" paddingTop={'32px'}>
          <Stack>
            <Typography level="h2" fontSize="30px">Members</Typography>
            <Stack direction="row" flexWrap="wrap" gap="24px">
              {tripMembers?.map((member, idx) => (
                <Avatar
                  key={idx}
                  size="lg"
                  sx={(theme) => ({
                    boxShadow: theme.shadow.md,
                    '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
                    '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
                  })}
                >
                  {member?.name?.charAt(0) ?? '?'}
                </Avatar>
              ))}
              {trip && (
          <AddMemberModal
            handleAddMember={handleAddMember} // Pass the function to handle adding members
          />
        )}

            </Stack>
          </Stack>

          <Stack>
            <Typography level="body-lg" fontSize="30px" fontWeight="bold">To Do</Typography>
            <List
              sx={(theme) => ({
                boxShadow: theme.shadow.md,
                '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
                '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
                borderRadius: "lg", bgcolor: 'white'
              })}
            >
              {todos.map((todo, idx) => (
                <ListItem key={idx}>
                  <Checkbox />
                  <Input
                    variant='plain'
                    placeholder='Type here'
                    onChange={(e) => onChangeTodo(idx, e.target.value)}
                    value={todo}
                  />
                </ListItem>
              ))}
              <ListItemButton onClick={addNewTodo} sx={{ justifyContent: 'center' }}>
                <AddIcon /> Add new to do
              </ListItemButton>
            </List>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TripOverviewPage;