import Input from '@mui/joy/Input';
import { Box } from '@mui/joy';
import Search from '@mui/icons-material/Search';

interface SearchBarProps {
  value: string;  // value inthe searchabar
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // handle input changes
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Box width="100%" sx={{ alignItems: 'center', margin: 3 }}>
      <Input
        startDecorator={<Search sx={{ color: 'var(--primary-color)' }} />}
        placeholder="Search your trips"
        sx={{ fontSize: '0.7rem', borderRadius: '20px', '--Input-minHeight': '40px' }}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
}