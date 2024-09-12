import Input from '@mui/joy/Input';
import { Box } from '@mui/joy';

export default function SearchBar() {
  return (
    <Box width="100%" sx={{alignItems: 'center', margin:3}}>
      <Input
        placeholder="Search your trips"
        sx={{fontSize: '0.7rem', borderRadius: '20px',}}/>
    </Box>
  );
}
