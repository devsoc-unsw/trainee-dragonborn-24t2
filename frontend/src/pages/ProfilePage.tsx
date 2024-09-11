import '../styles.css';
import { Link, Redirect } from 'wouter';
import { Stack, Typography, Card, Avatar, Button } from '@mui/joy';
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { useUser } from '../firebase';
import { useLocalStorage } from 'usehooks-ts';
import AddFriendModal from '../components/modal/AddFriendModal.tsx'

const ProfilePage = () => {
  const [authUser, setAuthUser] = useLocalStorage("auth-user", "");
  const [user] = useUser(authUser);
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '?';

  const handleLogout = () => {
    setAuthUser("");
  };

  // triggered when logout
  if (!authUser) {
    return <Redirect to='/login'/>
  }

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
              p: 3,
            }}
          >
            <Avatar sx={{ "--Avatar-size": "100px" }}>{userInitial}</Avatar>
            <Typography level="h3">{user?.name}</Typography>
            <Typography>{user?.email}</Typography>

            {/* buttons */}
            <Stack sx={{ m: 2 }} spacing={2}>
              <Link href="/viewfriends">
                <Button
                  variant="plain"
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%', color: 'black'}}
                  startDecorator={<GroupIcon sx={{ fontSize: 20 }} />}
                >
                  View Friends
                </Button>
              </Link>
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
            <AddFriendModal/>
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
              p: 3,
              gap: 4,
            }}
          >
            {/* freidsn*/}
            <Stack
              direction="column"
              alignItems="center"
              width="100%"
            >
              <Typography level="h4">Friends</Typography>
              <Typography>No friends yet.</Typography>
            </Stack>

            {/* requests */}
            <Stack
              direction="column"
              alignItems="center"
              width="100%"
            >
              <Typography level="h4">Friend Requests</Typography>
              <Typography>No friend requests.</Typography>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProfilePage;