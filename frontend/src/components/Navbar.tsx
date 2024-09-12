import { Link } from 'wouter';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Notifications from '@mui/icons-material/Notifications';
import Person from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Home from '@mui/icons-material/Home';
import Avatar from '@mui/joy/Avatar';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { useLocalStorage } from 'usehooks-ts';
import { useUser } from '../firebase';

const Navbar = () => {
  const [authUser, setAuthUser] = useLocalStorage("auth-user", "")
  const [user, setUser] = useUser(authUser);

  const handleLogout = () => {
    setAuthUser("")
  }

  const avatarInitial = user?.name?.charAt(0) || "?";

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
          <Typography level="body-lg" >(insert logo :P)</Typography>
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

          <IconButton>
            <CalendarMonthIcon style={{ color:'var(--tertiary-color)'}} />
          </IconButton>
        
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
                <Avatar sx={{color: 'var(--tertiary-color)'}}>{avatarInitial}</Avatar>
              </IconButton>
            </MenuButton>
            <Menu>
              <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                <MenuItem>Edit Profile</MenuItem>
              </Link >
              <MenuItem>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>
                <Link href="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Logout</Link>
              </MenuItem>
            </Menu>
          </Dropdown>
        </Stack>
      </Stack>
    </Card>
  );
};

export default Navbar;
