import { Link, Redirect, useLocation } from 'wouter';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import MenuButton from '@mui/joy/MenuButton';
import IconButton from '@mui/joy/IconButton';
import Dropdown from '@mui/joy/Dropdown';
import Notifications from '@mui/icons-material/Notifications';
import Home from '@mui/icons-material/Home';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import Avatar from '@mui/joy/Avatar';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { useUser } from '../firebase';
import { useLocalStorage } from 'usehooks-ts';
import firebase from 'firebase/compat/app';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = () => {
  const [authUser, setAuthUser] = useLocalStorage("auth-user", "");
  const [user] = useUser(authUser);
  const [, setLocation] = useLocation();
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '?';

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    localStorage.removeItem("auth-user");
    setLocation('/login');
  };

  return (
    <Card
      sx={{
        backgroundColor: '#F98568',
        padding: '10px 20px',
        color: 'white',
        position: 'fixed',
        width: '100%',
        height: '60px',
        zIndex: 1000,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Typography level="body-lg">(insert logo :P)</Typography>
        </Link>

        <Stack direction="row" spacing={2} alignItems="center">
          <Link href="/home">
            <IconButton>
              <Home style={{ color: 'var(--tertiary-color)' }} />
            </IconButton>
          </Link>

          <IconButton>
            <CalendarMonth style={{ color: 'var(--tertiary-color)' }} />
          </IconButton>

          <Dropdown>
            <MenuButton variant="plain" sx={{ p: 0 }}>
              <IconButton>
                <Notifications style={{ color: 'var(--tertiary-color)' }} />
              </IconButton>
            </MenuButton>
            <Menu>
              <MenuItem>No notifications yet</MenuItem>
            </Menu>
          </Dropdown>

          <Dropdown>
            <MenuButton variant="plain" sx={{ p: 0 }}>
              <Avatar sx={{ color: 'var(--tertiary-color)' }}>{userInitial}</Avatar>
            </MenuButton>
            <Menu>
              <Link href="/profile" style={{ textDecoration: 'none' }}>
                <MenuItem>View Profile</MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Dropdown>
        </Stack>
      </Stack>
    </Card>
  );
};

export default Navbar;