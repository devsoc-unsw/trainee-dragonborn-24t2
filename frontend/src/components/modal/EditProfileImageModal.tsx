import React, { useState } from "react";
import { Modal, ModalDialog, Typography, Button, Stack, Avatar } from "@mui/joy";
import { User } from "../../types";
import { useUser } from "../../firebase";

interface EditProfileImageModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

const EditProfileImageModal = ({ open, onClose, user }: EditProfileImageModalProps) => {
  const [imgDataUrl, setImgDataUrl] = useState<string | null>(null);
  const [, setUser] = useUser(user.uid);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        alert("Image too large. Please upload an image smaller than 1MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgDataUrl(reader.result as string);
      };
      reader.onerror = () => {
        alert("Failed to upload image. Please try another one.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (imgDataUrl) {
      console.log("Image uploaded:", imgDataUrl);
      await setUser({ ...user, profileimg: imgDataUrl });
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <Typography level="body-lg" mb={2}>
          Edit Profile Picture
        </Typography>
        <Stack spacing={2} direction="column" alignItems="center">
          {imgDataUrl ? (
            <Avatar src={imgDataUrl} sx={{ "--Avatar-size": "150px" }} />
          ) : (
            <Avatar sx={{ "--Avatar-size": "150px" }}>?</Avatar>
          )}
          <Button variant="soft" component="label">
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </Button>
          <Button onClick={handleUpload} disabled={!imgDataUrl}>
            Change pfp!
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default EditProfileImageModal;