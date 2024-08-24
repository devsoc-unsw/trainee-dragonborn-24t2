import '../styles.css';
import { Typography, Stack } from '@mui/joy';


const TripCountdown = () => {
  return (
    <Stack width="60%" gap={0.5}>
      <Typography justifySelf="flex-start" level="body-lg" fontWeight="bold" sx={{color: 'var(--tertiary-color)'}}>Your Next Trip</Typography>

      <Stack bgcolor='var(--secondary-color)' alignItems="center" borderRadius={15}
      sx={{
        p: 3,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>

        <Typography level="h3" fontWeight="bold" sx={{color: 'var(--tertiary-color)'}}>TripName</Typography>
        <Stack width="70%" alignItems="center"
          sx={{
            borderRadius: 10,
            backgroundColor: 'var(--background-color)',
            margin: 1,
            pt: 4,
            pb: 4,
            pl: 6,
            pr: 6,
          }}
        >
          <Typography level="h2" fontWeight="bold" sx={{color: 'var(--tertiary-color)'}}>100</Typography>
          <Typography level="body-sm" sx={{color: 'var(--tertiary-color)'}}>days</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

 export default TripCountdown;