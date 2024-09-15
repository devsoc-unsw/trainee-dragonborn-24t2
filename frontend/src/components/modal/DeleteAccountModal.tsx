import React, { useState } from "react";
import { Modal, Stack, Typography, Button, ModalDialog } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteAccountModalProps {
  handleDeleteAccount: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ handleDeleteAccount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Button
        variant="plain"
        sx={{ color: "red" }}
        startDecorator={<DeleteIcon sx={{ fontSize: 20 }} />}
        onClick={openModal}
      >
        Delete Account
      </Button>

      <Modal open={isOpen} onClose={closeModal}>
        <ModalDialog
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '400px',
            mx: 'auto',
            backgroundColor: '#fce4e4',
            borderRadius: '8px',
            p: 4,
          }}
        >
          <Typography level="h3" sx={{ color: '#ae0000', mb: 2 }}>
            Delete Account?
          </Typography>
          <Typography>
            Are you sure you want to delete this account?
          </Typography>
          <Typography level="body-xs" sx={{ mb: 4 }}>
            dont go :(
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="soft" color="neutral" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={() => {
                handleDeleteAccount();
                closeModal();
              }}
            >
              Delete Account
            </Button>
          </Stack>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default DeleteAccountModal;
