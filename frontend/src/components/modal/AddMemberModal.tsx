import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAllUsers } from '../../firebase';
import { Trip, User } from '../../types';
import { IconButton } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';

interface AddMemberModalProps {
  tripId: string | undefined;
  handleAddMember: (user: User) => Promise<void>; // Use the prop passed from the parent
}

export default function AddMemberModal({ tripId, handleAddMember }: AddMemberModalProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const allUsers = useAllUsers();
  const filteredUsers = allUsers?.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const onAddMemberClick = async (user: User) => {
    await handleAddMember(user); // Call the function passed down from the parent
    setOpen(false); // Close modal
  };

  return (
    <React.Fragment>
      <IconButton onClick={() => setOpen(true)} sx={{ fontSize: 20 }}><AddIcon/></IconButton>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Add Member</DialogTitle>
          <Stack spacing={2}>
            <Input
              placeholder="Search username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />

            <List>
              {filteredUsers?.map((user, index) => (
                <ListItem key={index}>
                  {user.name}
                  <Button onClick={() => onAddMemberClick(user)}>+ Add</Button>
                </ListItem>
              ))}
            </List>
          </Stack>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}