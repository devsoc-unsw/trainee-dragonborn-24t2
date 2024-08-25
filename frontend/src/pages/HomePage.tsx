import '../styles.css';
import { Stack, Typography } from '@mui/joy';
import TripCard from '../components/TripCard';
import TripCountdown from '../components/TripCountdown';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  return (
    <Stack height="100%" direction="row" justifyContent="space-evenly" alignItems="center">
      <Stack width="30%" justifyContent="flex-start" gap={5}>
        <Stack width="50%">
          <Typography level="body-md" sx={{color: 'var(--tertiary-color)'}}>Hello Bea,</Typography>
          <Typography level="h2" fontWeight="bold" sx={{color: 'var(--tertiary-color)'}}>Where to next?</Typography>
        </Stack>
        <TripCountdown/>
      </Stack>

      <Stack width="30%" justifyContent="center" alignItems="center">
        <SearchBar/>
        <Stack> {/** overall cards cube */}
          <Stack direction="row" justifyContent="space-between" gap={3} sx={{margin: 1}}>
            <TripCard
            title="solo travellign japan"
            location="Japan"
            imageUrl="https://media.cnn.com/api/v1/images/stellar/prod/230210161917-01-japan-never-traveler-culture-tokyo.jpg?c=16x9&q=h_833,w_1480,c_fill"
            linkTo='/'/>
            <TripCard
            title="grad trip"
            location="New Zealand"
            imageUrl="https://media.gq.com/photos/5ba1680236b2d004cdd843cd/16:9/w_2560%2Cc_limit/new-zealand-queenstown-travel-guide-gq.jpg"
            linkTo='/'/>
          </Stack>
          <Stack direction="row" justifyContent="space-between" gap={3} sx={{margin: 1}}>
          <TripCard
            title="road drip"
            location="melbourne"
            imageUrl="https://thumbs.dreamstime.com/b/purple-melbourn-angle-view-melbourne-downtown-reflection-yarra-river-171547301.jpg"
            linkTo='/'/>
            <TripCard
            title="summer 2023"
            location="ny"
            imageUrl="https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg"
            linkTo='/'/>
          </Stack>
        </Stack>
      </Stack>

    </Stack>
  );
};

export default HomePage;
