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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAllUsers } from '../../firebase';

const AddFriendModal: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [hoveredUser, setHoveredUser] = React.useState<string | null>(null);

  // Get all users from Firestore
  const allUsers = useAllUsers();

  // Filter users based on the search term
  const filteredUsers = allUsers?.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleSendRequest = (user: string) => {
    // Placeholder for send friend request logic
    alert(`Friend request sent to: ${user}`);
  };

  return (
    <React.Fragment>
      <Button
        startDecorator={<PersonAddIcon sx={{ fontSize: 20 }} />}
        sx={{
          mt: 1,
          bgcolor: 'var(--primary-color)',
          '&:hover': {
            bgcolor: 'var(--tertiary-color)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          },
        }}
        onClick={() => setOpen(true)}
      >
        Add Friend
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogContent>
            Search for a username to add a friend.
          </DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              // Dummy submit handler; you'd add the real logic here later
              setSearchTerm('');
              setOpen(false); // Close the modal after submit
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

              {/* List of filtered users, with overflow handling */}
              <List
                sx={{
                  maxHeight: 150, // Limit to show 4 users (adjust depending on user name length)
                  overflowY: 'auto', // Enable vertical scrolling if more than 4 users
                }}
              >
                {filteredUsers.map((user, index) => (
                  <ListItem
                    key={index}
                    onMouseEnter={() => setHoveredUser(user.name)}
                    onMouseLeave={() => setHoveredUser(null)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {user.name}
                    {hoveredUser === user.name && (
                      <Button
                        variant="plain"
                        sx={{ color: 'var(--primary-color)', fontSize: '10px'}}
                        onClick={() => handleSendRequest(user.name)}
                      >
                        + Send Request
                      </Button>
                    )}
                  </ListItem>
                ))}
              </List>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default AddFriendModal;