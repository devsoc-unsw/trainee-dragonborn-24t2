import { Link } from 'wouter';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Notifications from '@mui/icons-material/Notifications';
import Person from '@mui/icons-material/Person';
import Home from '@mui/icons-material/Home';
import Avatar from '@mui/joy/Avatar';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';

const Navbar = () => {

  return (
    <Card // or stack for non rounded
      sx={{
        backgroundColor: '#F98568',
        padding: '10px 20px',
        color: 'white',
        position: 'fixed',
        width: '100%',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Link href="/" style={{textDecoration: 'none' }}>
          <Typography level="body-lg">(insert logo :P)</Typography>
        </Link>

        <Stack direction="row" spacing={2} alignItems="center">
          <Link href="/home">
            <IconButton>
              <Home style={{ color: 'var(--tertiary-color)'}} />
            </IconButton>
          </Link>

          <Link href="/friends">
            <IconButton>
              <Person style={{ color:'var(--tertiary-color)'}} />
            </IconButton>
          </Link>

          <Dropdown>
          <MenuButton variant="plain" sx={{ p: 0}}>
              <IconButton>
                <Notifications style={{ color: 'var(--tertiary-color)'}} />
              </IconButton>
            </MenuButton>
            <Menu>
              <MenuItem>No notifications yet</MenuItem>
            </Menu>
          </Dropdown>

          <Dropdown>
            <MenuButton variant="plain" sx={{ p: 0 }}>
              <IconButton>
                <Avatar sx={{color: 'var(--tertiary-color)'}}>BC</Avatar>
              </IconButton>
            </MenuButton>
            <Menu>
              <Link href="/profile">
                <MenuItem>Edit Profile</MenuItem>
              </Link>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </Dropdown>

        </Stack>
      </Stack>
    </Card>
  );
};

export default Navbar;
