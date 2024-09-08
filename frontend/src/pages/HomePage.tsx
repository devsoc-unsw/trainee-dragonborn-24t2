// import '../styles.css';
// import { useState } from 'react';
// import { Link } from 'wouter';
// import { Stack, Typography, Button } from '@mui/joy';
// import TripCard from '../components/TripCard';
// import TripCountdown from '../components/TripCountdown';
// import SearchBar from '../components/SearchBar';
// import { useUser } from '../firebase';
// import { useLocalStorage } from 'usehooks-ts';


// const trips = [
//   { id: 1, title: 'Trip to Bali', location: 'Bali', imageUrl: 'https://example.com/image1.jpg' },

//   { id: 2, title: 'Trip to Paris', location: 'Paris', imageUrl: 'https://example.com/image2.jpg' },

//   { id: 3, title: 'Trip to New York', location: 'New York', imageUrl: 'https://example.com/image3.jpg' },

//   { id: 4, title: 'Trip to Vegas', location: 'Las Vegas', imageUrl: 'https://example.com/image3.jpg' },

//   { id: 5, title: 'Trip to Queensland', location: 'Queensland', imageUrl: 'https://example.com/image3.jpg' },

//   { id: 6, title: 'Trip to Japan', location: 'Japan', imageUrl: 'https://example.com/image3.jpg' },
// ];

// const HomePage = () => {
//   const [searchText, setSearchText] = useState('');
//   const [authUser] = useLocalStorage("auth-user", "");
//   const [user] = useUser(authUser);
//   const userName = user?.name ? user.name : '?';


//   const filteredTrips = trips.filter((trip) =>
//     trip.title.toLowerCase().includes(searchText.toLowerCase())
//   );

//   return (
//     <Stack
//       direction="column"
//       alignItems="center"
//       justifyContent="center"
//       sx={{ pt: '60px' }}
//     >
//       <Stack
//         direction="row"
//         justifyContent="center"
//         alignItems="center"
//         width="80%"
//         gap={5}
//       >
//         {/* left */}
//         <Stack width="40%" direction="column" alignItems="flex-start">
//           <Stack sx={{ pt: 5, pb: 5 }}>
//             <Typography level="h4" sx={{ color: 'var(--tertiary-color)' }}>Hello {userName},</Typography>
//             <Typography level="h1" sx={{ color: 'var(--tertiary-color)', letterSpacing: '0.5px' }}>Where to next?</Typography>
//           </Stack>
//           <TripCountdown />
//         </Stack>

//         {/* right */}
//         <Stack
//           width="60%"
//           direction="column"
//           alignItems="center"
//           sx={{ maxHeight: '80vh', padding: '16px' }}
//         >
//           <Stack
//             direction="row"
//             alignItems="center"
//             spacing={1}
//             sx={{ width: '100%' , p: 2}}
//           >
//             <SearchBar
//               value={searchText}
//               onChange={(event) => setSearchText(event.target.value)}
//             />
//             <Link href="/newtrip">
//               <Button
//                 sx={{
//                   width: '120px',
//                   bgcolor: 'var(--primary-color)',
//                 '&:hover': {
//                     bgcolor: 'var(--tertiary-color)',
//                     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
//                   },
//                 }}
//               > + Trip
//               </Button>
//             </Link>
//           </Stack>

//           {/* scrolly cards */}
//           <Stack
//             direction="row"
//             spacing={2}
//             sx={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//               gap: '16px',
//               width: '100%',
//               overflowY: 'auto',
//               overflowX: 'hidden',
//             }}
//           >
//             {filteredTrips.length > 0 ? (
//               filteredTrips.map((trip) => (
//                 <TripCard
//                   key={trip.id}
//                   title={trip.title}
//                   destination={trip.location}
//                   imageUrl={trip.imageUrl}
//                   linkTo='/'
//                 />
//               ))
//             ) : (
//               <Typography level="h3" sx={{ color: 'var(--tertiary-color)' }}>
//                 No trips found for “{searchText}” :(</Typography>
//             )}
//           </Stack>
//         </Stack>
//       </Stack>
//     </Stack>
//   );
// };

// export default HomePage;




import '../styles.css';
import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Stack, Typography, Button } from '@mui/joy';
import TripCard from '../components/TripCard';
import TripCountdown from '../components/TripCountdown';
import SearchBar from '../components/SearchBar';
import { useUser, useTrips } from '../firebase'; // Import useTrips
import { useLocalStorage } from 'usehooks-ts';

const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [authUser] = useLocalStorage("auth-user", "");
  const [user] = useUser(authUser);

  // Ensure tripIds is fetched or available
  const tripIds = user?.tripIds || []; // Assume `tripIds` is an array in user data

  // Fetch trips using the hook
  const trips = useTrips(tripIds);

  // Filter trips based on search text
  const filteredTrips = trips?.filter((trip) =>
    trip.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const userName = user?.name ? user.name : '?';

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
        {/* left */}
        <Stack width="40%" direction="column" alignItems="flex-start">
          <Stack sx={{ pt: 5, pb: 5 }}>
            <Typography level="h4" sx={{ color: 'var(--tertiary-color)' }}>
              Hello {userName},
            </Typography>
            <Typography level="h1" sx={{ color: 'var(--tertiary-color)', letterSpacing: '0.5px' }}>
              Where to next?
            </Typography>
          </Stack>
          <TripCountdown />
        </Stack>

        {/* right */}
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
            sx={{ width: '100%' , p: 2}}
          >
            <SearchBar
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <Link href="/newtrip">
              <Button
                sx={{
                  width: '120px',
                  bgcolor: 'var(--primary-color)',
                  '&:hover': {
                    bgcolor: 'var(--tertiary-color)',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  },
                }}
              >
                + Trip
              </Button>
            </Link>
          </Stack>

          {/* scrolly cards */}
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
            {filteredTrips?.length > 0 ? (
              filteredTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  title={trip.title}
                  destination={trip.location}
                  imageUrl={trip.imageUrl}
                  linkTo='/'
                />
              ))
            ) : (
              <Typography level="h3" sx={{ color: 'var(--tertiary-color)' }}>
                No trips found for “{searchText}” :(
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HomePage;
