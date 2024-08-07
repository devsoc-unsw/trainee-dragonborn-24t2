import * as React from 'react';
import Input from '@mui/joy/Input';
import { Box } from '@mui/joy';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function BasicSearchBar() {
  const [query, setQuery] = React.useState('');

  return (
    <Box sx={styles.box}>
      <Input
        value={query}
        placeholder="Search your trps"
        startAdornment={
          <InputAdornment position="start"> <SearchIcon /> </InputAdornment>
        }
        sx={styles.seachbar}
      />
    </Box>
  );
}

const styles = {
    box: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        maxWidth: '400px',
        margin: 'auto'
    },
    seachbar: {
        flexGrow: 1, // exspands
        fontSize: '0.7rem',
        fontWeight: 'var(--font-weight-medium)',
        borderRadius: '20px',
    }
  };
