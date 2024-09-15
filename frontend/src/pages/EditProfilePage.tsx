import { Avatar, Button, Card, Input, Stack, Typography } from "@mui/joy";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { useState } from "react";
import { useLocation } from "wouter";
import { useAuthUser } from "../firebase";


const EditProfilePage = () => {
  const [user, setUser] = useAuthUser();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [, setLocation] = useLocation();

  const auth = getAuth();
  const handleSave = async () => {
    if (user) {

      // update in the auth place
      const userCredential = auth.currentUser;
      if (userCredential) {
        if (email && email !== user.email) {
          await updateEmail(userCredential, email);
        }
        if (newPassword) {
          await updatePassword(userCredential, newPassword);
        }
      }

      // TODO: fix to actually update the auth values

      // update in datastore
      await setUser({ ...user, name, email });
      setLocation("/profile"); // redirect
    }
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ pt: "60px", minHeight: "100vh" }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        width="80%"
        gap={5}
      >
        <Stack width="70%" direction="column" justifyContent="center">
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 5,
              width: "100%"
            }}
          >
            <Avatar sx={{ "--Avatar-size": "100px" }}>{user?.name?.charAt(0).toUpperCase()}</Avatar>
            <Typography level="h3">Edit Profile</Typography>

            {/* datat fiedls */}
            <Stack spacing={2} sx={{ width: "100%", mb: 2 }}>
              <Typography>Username</Typography>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="New Username"
                fullWidth
              />
            </Stack>

            <Stack spacing={2} sx={{ width: "100%", mb: 2 }}>
              <Typography>Email</Typography>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="New Email"
                fullWidth
              />
            </Stack>

            <Stack spacing={2} sx={{ width: "100%", mb: 2 }}>
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
                bgcolor: "var(--primary-color)",
                "&:hover": {
                  bgcolor: "var(--tertiary-color)",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
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