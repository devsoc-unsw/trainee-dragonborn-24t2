import '../styles.css';
import { Typography, Stack } from '@mui/joy';
import { useTrips } from "../firebase.ts";
import { useEffect, useState } from 'react';
import { Trip, User } from '../types.ts';

interface TripCountdownProps {
  user?: User;
}

const TripCountdown = ({ user }: TripCountdownProps) => {
  const userTrips = useTrips(user?.trips || []);
  const [earliestTrip, setEarliestTrip] = useState<Trip | null>(null);
  const [remainingDays, setRemainingDays] = useState<number>(0);

  useEffect(() => {
    if (userTrips) {
      const upcomingTrips = userTrips.filter(trip => trip.from.toDate() > new Date()); // only getting dates after todays
      if (upcomingTrips.length > 0) {
        const sortedTrips = upcomingTrips.sort((a, b) => a.from.toDate().getTime() - b.from.toDate().getTime());
        const nextTrip = sortedTrips[0];
        setEarliestTrip(nextTrip);
        const diffTime = nextTrip.from.toDate().getTime() - new Date().getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setRemainingDays(diffDays);
      } else {
        setRemainingDays(0);
      }
    }
  }, [userTrips]);

  return (
    <Stack width="32vw" gap={0.5}>
      <Typography justifySelf="flex-start" level="body-lg" fontWeight="bold" sx={{ color: 'var(--tertiary-color)' }}>
        Your Next Trip
      </Typography>
      <Stack
        bgcolor='var(--secondary-color)'
        alignItems="center"
        borderRadius={15}
        sx={{
          p: 3,
          width: 340,
          height: 240,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        }}
      >
        {remainingDays > 0 ? (
          <>
            <Typography level="h3" fontWeight="bold" sx={{ color: 'var(--tertiary-color)' }}>
              {earliestTrip?.name}
            </Typography>
            <Stack
              width="90%"
              alignItems="center"
              sx={{
                borderRadius: 10,
                backgroundColor: '#ffffff',
                margin: 1,
                pt: 4,
                pb: 4,
                pl: 6,
                pr: 6,
              }}
            >
              <Typography level="h2" fontWeight="bold" sx={{ color: 'var(--tertiary-color)' }}>
                {remainingDays}
              </Typography>
              <Typography level="body-sm" sx={{ color: 'var(--tertiary-color)' }}>
                days
              </Typography>
            </Stack>
          </>
        ) : (
          <Stack
            width="90%"
            alignItems="center"
            sx={{
              borderRadius: 10,
              backgroundColor: '#ffffff',
              margin: 1,
              pt: 4,
              pb: 4,
              pl: 6,
              pr: 6,
            }}
          >
            <Typography level="body-lg" fontWeight="bold" sx={{ color: 'var(--tertiary-color)' }}>
              No upcoming trips
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default TripCountdown;