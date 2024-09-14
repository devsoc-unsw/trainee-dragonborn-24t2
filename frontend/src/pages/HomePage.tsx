import '../styles.css';
import { useState } from 'react';
import { Stack, Typography } from '@mui/joy';
import TripCard from '../components/TripCard';
import TripCountdown from '../components/TripCountdown';
import SearchBar from '../components/SearchBar';
import { useUser, useTrips } from '../firebase';
import { useLocalStorage } from 'usehooks-ts';
import CreateNewTripModal from '../components/modal/CreateNewTripModal.tsx'

const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [authUser] = useLocalStorage("auth-user", "");
  const [user] = useUser(authUser);
  const userName = user?.name ? user.name : '?';

  const userTripIds = user?.trips || []; // gets the trip ids
  const trips = useTrips(userTripIds);  // get the trips associated with the ids

  const filteredTrips = trips?.filter((trip) =>
    trip.name.toLowerCase().includes(searchText.toLowerCase())
  ) || []; // seatch trip filter

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ pt: '60px' }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        width="80%"
        gap={5}
      >
        {/* lefty */}
        <Stack width="40%" direction="column" alignItems="flex-start">
          <Stack sx={{ pt: 5, pb: 5 }}>
            <Typography level="h4" sx={{ color: 'var(--tertiary-color)' }}>
              Hello {userName},
            </Typography>
            <Typography
              level="h1"
              sx={{ color: 'var(--tertiary-color)', letterSpacing: '0.5px' }}
            >
              Where to next?
            </Typography>
          </Stack>
          <TripCountdown user={user}/>
        </Stack>

        {/* righty */}
        <Stack
          width="60%"
          direction="column"
          alignItems="center"
          sx={{ maxHeight: '80vh', padding: '16px' }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ width: '100%', p: 2 }}
          >
            <SearchBar
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <CreateNewTripModal/>
          </Stack>

          {/* scrolly*/}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              width: '100%',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {/* trips cards if statement */}
            {trips?.length === 0 ? (
              <Typography level="h3" sx={{ color: 'var(--tertiary-color)' }}>
                Plan your first trip!
              </Typography>
            ) : (
              <>
                {/* searchy if statement */}
                {filteredTrips.length > 0 ? (
                  filteredTrips.map((trip) => (
                    <TripCard
                      key={trip.tripId}
                      title={trip.name}
                      destination={trip.destination}
                      imageUrl='https://cdn.naturettl.com/wp-content/uploads/2020/04/25152036/how-to-find-great-locations-for-landscape-photography-11.jpg'
                      linkTo={`/tripoverview/${trip.tripId}`}
                    />
                  ))
                ) : (
                  <Typography level="h3" sx={{ color: 'var(--tertiary-color)' }}>
                    No trips found for “{searchText}” :(
                  </Typography>
                )}
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HomePage;