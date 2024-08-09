import '../styles.css';
import { Typography, Stack } from '@mui/joy';


const TripCountdown = () => {
  return (
    <Stack width="60%" gap={0.5}>
      <Typography justifySelf="flex-start" level="body-sm" fontWeight="bold" sx={{color: 'var(--tertiary-color)'}}>Your Next Trip</Typography>
      <Stack bgcolor="#f9e1d6" alignItems="center" borderRadius={15} sx = {{p:3}}>
        <Typography level="h3" fontWeight="bold" sx={{color: 'var(--tertiary-color)'}}>TripName</Typography>
        <Stack width="70%" alignItems="center" sx = {{borderRadius: 10, backgroundColor: 'var(--background-color)', margin:1, pt:4, pb:4, pl:6, pr:6}}>
        <Typography level="h2" fontWeight="bold" sx={{color: 'var(--tertiary-color)'}}>100</Typography>
        <Typography level="body-sm" sx={{color: 'var(--tertiary-color)'}}>days</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

 export default TripCountdown;