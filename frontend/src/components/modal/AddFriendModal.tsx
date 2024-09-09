import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';

// Type for props
interface AddFriendModalProps {
  open: boolean;
  onClose: () => void;
}

// Dummy data for demonstration
const dummyFriends = [
  'Alice Smith',
  'Bob Johnson',
  'Charlie Brown',
  'David Wilson',
  'Emily Davis'
];

const AddFriendModal: React.FC<AddFriendModalProps> = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  // Filtered list based on search term
  const filteredFriends = dummyFriends.filter(friend =>
    friend.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <DialogTitle>Add Friend</DialogTitle>
        <DialogContent>
          Search for a username to add a friend.
        </DialogContent>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            // Dummy submit handler; you'd add the real logic here later
            alert(`Friend added: ${searchTerm}`);
            setSearchTerm('');
            onClose();
          }}
        >
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Search</FormLabel>
              <Input
                placeholder="Search for a username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                required
              />
            </FormControl>

            {/* List of filtered friends */}
            <List>
              {filteredFriends.map((friend, index) => (
                <ListItem key={index}>{friend}</ListItem>
              ))}
            </List>

            <Button type="submit">Add Friend</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default AddFriendModal;