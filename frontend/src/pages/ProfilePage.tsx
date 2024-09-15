import React, { useState } from "react";
import "../styles.css";
import EditIcon from "@mui/icons-material/Edit";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Button, Card, Stack, Typography } from "@mui/joy";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth, deleteUser as deleteAuthUser, signOut } from 'firebase/auth';
import { Link, useLocation } from "wouter";
import AddFriendModal from "../components/modal/AddFriendModal";
import EditProfileImageModal from "../components/modal/EditProfileImageModal";
import DeleteAccountModal from "../components/modal/DeleteAccountModal";
import { useAuthUser } from "../firebase";
import { Trip, User } from "../types";
import { useFirestore } from "reactfire";

const ProfilePage = () => {
  const [user] = useAuthUser();
  const [, setLocation] = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "?";
  const profileImg = user?.profileimg;
  const firestore = useFirestore();

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    localStorage.removeItem("auth-user");
    setLocation("/login");
  };

  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const authUser = auth.currentUser;

    if (authUser) {
      // Fetch the user's data from Firestore to get the trips
      const userRef = doc(firestore, "Users", authUser.uid);
      const userData = await getDoc(userRef);
      if (userData.exists()) {
        const deleteUser = userData.data() as User;

        // delete from trips
        for (const tripId of deleteUser.trips || []) {
          const tripRef = doc(firestore, "Trips", tripId);
          const tripData = await getDoc(tripRef);

          if (tripData.exists()) {
            const trip = tripData.data() as Trip;
            const updatedMembers = trip.members?.filter(memberId => memberId !== authUser.uid) || [];
            await updateDoc(tripRef, { members: updatedMembers });
          }
        }

        // dekete docu and auth detailss
        await deleteDoc(userRef);
        await deleteAuthUser(authUser);

        // clear local storage and redirect
        localStorage.removeItem("auth-user");
        setLocation("/login");
      }
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
      >
        {/* leftyu */}
        <Stack
          width="50%"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 10,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
            }}
          >
            <Avatar
              src={profileImg || undefined}
              sx={{ "--Avatar-size": "150px" }}
            >
              {!profileImg && userInitial}
            </Avatar>
            <Typography level="h3">{user?.name}</Typography>
            <Typography>{user?.email}</Typography>
            <Button
              variant="soft"
              onClick={() => setIsModalOpen(true)}
              sx={{
                bgcolor: "var(--primary-colour)",
                mt: 2,
              }}
            >
              Edit Profile Picture
            </Button>
            {user && (
              <EditProfileImageModal
                user={user}
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          </Card>
        </Stack>

        {/* righty */}
        <Stack
          width="40%"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 4,
              width: "100%",
              textAlign: "center",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
            }}
          >
            {/* profiel actions */}
            <Stack sx={{ m: 2 }} spacing={2} width="100%" alignItems="center">
              <Link to="/viewfriends" style={{ width: "100%" }}>
                <Button
                  variant="plain"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    color: "black",
                  }}
                  startDecorator={<GroupIcon sx={{ fontSize: 20 }} />}
                >
                  View Friends
                </Button>
              </Link>
              <Link to="/editprofile" style={{ width: "100%" }}>
                <Button
                  variant="plain"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    color: "black",
                  }}
                  startDecorator={<EditIcon sx={{ fontSize: 20 }} />}
                >
                  Edit Profile
                </Button>
              </Link>
              <Button
                variant="plain"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  color: "black",
                }}
                startDecorator={<LogoutIcon sx={{ fontSize: 20 }} />}
                onClick={handleLogout}
              >
                Logout
              </Button>
              <DeleteAccountModal handleDeleteAccount={handleDeleteAccount} />
            </Stack>
            {/*modal */}
            <AddFriendModal />
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProfilePage;