import '../styles.css';
import { Link, Redirect } from 'wouter';
import { Stack, Typography, Card, Avatar, Button } from '@mui/joy';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useUser } from '../firebase';
import { useLocalStorage } from 'usehooks-ts';

const ProfilePage = () => {
  const [authUser, setAuthUser] = useLocalStorage("auth-user", "");
  const [user] = useUser(authUser);
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '?';

  const handleLogout = () => {
    setAuthUser("");
    <Redirect to='/login'/>
  };


  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ pt: '60px', minHeight: '100vh' }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        width="80%"
        gap={5}
      >
        {/* left */}
        <Stack width='30%' direction="column" justifyContent="center">
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 5,
            }}
          >
            <Avatar sx={{ "--Avatar-size": "100px" }}>{userInitial}</Avatar>
            <Typography level="h3">{user?.name}</Typography>
            <Typography>{user?.email}</Typography>

            {/* buttons */}
            <Stack sx={{ m: 2 }} spacing={2}>
              <Link href="/editprofile">
                <Button
                  variant="plain"
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%', color: 'black'}}
                  startDecorator={<EditIcon sx={{ fontSize: 20 }} />}
                >
                  Edit Profile
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="plain"
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%', color: 'black'}}
                  startDecorator={<LogoutIcon sx={{ fontSize: 20 }} />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Link>
            </Stack>

            <Button
              startDecorator={<PersonAddIcon sx={{ fontSize: 20 }} />}
              sx={{
                mt: 2,
                bgcolor: 'var(--primary-color)',
                '&:hover': {
                  bgcolor: 'var(--tertiary-color)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              Add Friend
            </Button>
          </Card>
        </Stack>

        {/* right */}
        <Stack width='60%' direction="column" justifyContent="center">
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Avatar>BS</Avatar>
            <Typography level="h3">Bea Dela Cruz</Typography>
            <Typography>{user?.email}</Typography>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProfilePage;
