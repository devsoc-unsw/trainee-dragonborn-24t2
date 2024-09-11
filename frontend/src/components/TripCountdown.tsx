import '../styles.css';
import { Typography, Stack } from '@mui/joy';

const TripCountdown = () => {
  const remainingDays = 0;

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
        <Typography level="h3" fontWeight="bold" sx={{ color: 'var(--tertiary-color)' }}>
          TripName
        </Typography>

        {remainingDays > 0 ? (
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