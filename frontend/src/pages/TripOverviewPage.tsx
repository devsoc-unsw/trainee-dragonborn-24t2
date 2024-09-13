import '../styles.css';
import {
  Avatar, List, ListItem, ListItemButton, ListItemDecorator,
  AspectRatio, Stack, Typography, Input, Checkbox, Dropdown,
  MenuButton, Menu, MenuItem, ListDivider } from '@mui/joy';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddIcon from '@mui/icons-material/Add';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import LuggageRoundedIcon from '@mui/icons-material/LuggageRounded';
import { useTrip, useAllUsers } from "../firebase.ts";
import { useRoute } from "wouter";
import AddMemberModal from '../components/modal/AddMemberModal';
import { User } from '../types.ts';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";
import { DeleteForever, Person } from '@mui/icons-material';
import CreateActivityModal from '../components/modal/CreateActivityModal.tsx';


const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: '2-digit'
  };
  return new Intl.DateTimeFormat('en-GB', options).format(date);
};

const TripOverviewPage = () => {
  const [, params] = useRoute("/tripoverview/:tripId");
  const tripId = params?.tripId;
  const [trip, setTrip] = useTrip(tripId ?? "");
  const [, setLocationPath] = useLocation();

  const allUsers = useAllUsers();
  const [tripMembers, setTripMembers] = useState<User[]>([]);

  if (!trip) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (allUsers && trip?.members) {
      const filteredMembers = allUsers.filter(user => trip.members.includes(user.name));
      setTripMembers(filteredMembers);
    }
  }, [allUsers, trip?.members]); // updating the icons as we add

  const firestore = useFirestore();
  const handleAddMember = async (user: User) => {
    if (trip) {
      const updatedMembers = [...trip.members, user.name];
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

  const handleDeleteMember = async (name: string) => {
    if (trip) {
      const updatedMembers = trip.members.filter(memberName => memberName !== name);
      const updatedTrip = { ...trip, members: updatedMembers };
      await setDoc(doc(firestore, "Trips", trip.tripId), updatedTrip);

      // remove from users trips
      const userToDelete = tripMembers.find(member => member.name === name);
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
          alert(`Removed trip from user ${name}'s trips list`);
        }
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
                <Dropdown key={idx}>
                  <MenuButton variant="plain" sx={{ p: 0 }}>
                    <Avatar
                      size="lg"
                      sx={(theme) => ({
                        boxShadow: theme.shadow.md,
                        '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
                        '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
                      })}
                    >
                      {member?.name?.charAt(0) ?? '?'}
                    </Avatar>
                  </MenuButton>
                <Menu placement="bottom-end">
                  {/* display name */}
                  <MenuItem>
                  <ListItemDecorator>
                      <Person />
                    </ListItemDecorator>{member.name}
                  </MenuItem>
                  <ListDivider />
                  {/* delete action */}
                  <MenuItem variant="soft" color="danger" onClick={() => handleDeleteMember(member.name)}>
                    <ListItemDecorator>
                      <DeleteForever />
                    </ListItemDecorator>{' '}Delete
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
          <CreateActivityModal tripId={trip.tripId}/>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TripOverviewPage;