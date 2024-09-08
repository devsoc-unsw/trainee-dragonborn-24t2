import { useState } from 'react';
import { Redirect } from 'wouter';
import { Stack, Typography, Card, Avatar, Button, Input } from '@mui/joy';
import { useUser } from '../firebase';
import { useLocalStorage } from 'usehooks-ts';

const EditProfilePage = () => {
  const [authUser] = useLocalStorage("auth-user", "");
  const [user, setUser] = useUser(authUser);
  const [username, setUsername] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSave = async () => {
    if (user) {
      const updates = {
        ...(username !== user.name && { name: username }), // only if diff
        ...(email !== user.email && { email: email }),
        ...(currentPassword === user.password && newPassword && { password: newPassword }) // checkign curr
      };

      // update in datastore
      await setUser({ ...user, ...updates});
      <Redirect to='/profile'/>;
    }
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
        <Stack width='70%' direction="column" justifyContent="center">
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 5,
              width: '100%'
            }}
          >
            <Avatar sx={{ "--Avatar-size": "100px" }}>{user?.name?.charAt(0).toUpperCase()}</Avatar>
            <Typography level="h3">Edit Profile</Typography>

            {/* Input fields to edit profile details */}
            <Stack spacing={2} sx={{ width: '100%', mb: 2 }}>
              <Typography>Username</Typography>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="New Username"
                fullWidth
              />
            </Stack>

            <Stack spacing={2} sx={{ width: '100%', mb: 2 }}>
              <Typography>Email</Typography>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="New Email"
                fullWidth
              />
            </Stack>

            <Stack spacing={2} sx={{ width: '100%', mb: 2 }}>
              <Typography>Current Password</Typography>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                fullWidth
              />
              <Typography>New Password</Typography>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                fullWidth
              />
            </Stack>

            <Button
              onClick={handleSave}
              sx={{
                mt: 2,
                bgcolor: 'var(--primary-color)',
                '&:hover': {
                  bgcolor: 'var(--tertiary-color)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              Save Changes
            </Button>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default EditProfilePage;