import { Sheet, ListItem, Checkbox, List, Input } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import Clear from '@mui/icons-material/Clear';
import { Button } from '@mui/joy';
import { Stack } from '@mui/joy';

interface ListCardProps {
  initialTitle?: string;
  title: string;
  items: string[];
  onTitleChange: (newTitle: string) => void;
  onItemsChange: (newItems: string[]) => void;
  onDelete: () => void;
}

export default function ListCard({ 
  title = '',
  items = [],
  onTitleChange,
  onItemsChange,
  onDelete,
}: ListCardProps) {
  const onChangeTodo = (idx: number, newTodo: string) => {
    const newTodos = [...items];
    newTodos[idx] = newTodo;
    onItemsChange(newTodos); 
  };
  

  const addNewTodo = () => {
    onItemsChange([...items, ""]);
  };

  return (
    <Sheet 
      variant="soft" 
      sx={{ 
        p: 3, 
        borderRadius: '10px', 
        width: 250, 
        backgroundColor: 'var(--secondary-color)', 
        boxShadow: "sm" 
      }}
    >
      <Stack
        marginTop="-23px"
        marginRight="-29px"
        marginBottom="-15px"
        // bgcolor="pink"
        alignItems="flex-end"
      >
        <Button
          onClick={onDelete}
          color='danger'
          variant='plain'
          sx={{
            '&:hover': {
              backgroundColor: 'transparent'
            }
          }}
        >
          <Clear sx={{color: "black"}}/>
        </Button>
      </Stack>
      
      <Input
        variant='plain'
        onChange={(e) => onTitleChange(e.target.value)}
        value={title}
        placeholder='Enter category ...'
        id="filter-status"
        sx={{
          marginTop: '-9px',
          pb: 0,
          color: "var(--tertiary-color)",
          fontWeight: "bold",
          backgroundColor: 'transparent',
        }}
      />
        
      <Stack 
        role="group" 
        aria-labelledby="filter-status" 
        sx={{ 
            maxHeight: "calc(100vh - 380px)", 
            overflowY: "auto",
        }}
      >
        <List>
          {items.map((item, idx) => (
            <ListItem key={idx} variant="plain">
              <Checkbox 
                variant="soft"
                sx={{
                  '& .MuiCheckbox-checkbox': {
                    borderRadius: '50%', 
                    border: '2px solid black',
                    backgroundColor: 'transparent', 
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'black', 
                  },
                  '&:hover': {
                  backgroundColor: 'transparent'
                }
                }}
              />
              <Input
                variant="plain"
                placeholder="New item"
                value={item}
                onChange={(event) => onChangeTodo(idx, event.target.value)}
                sx={{ 
                  color: "black", 
                  backgroundColor: "transparent", 
                }}
              />
            </ListItem>
          ))}
          <Button 
            variant='plain'
            onClick={addNewTodo} 
            sx={{ 
              marginBottom: "-10px",
              color: "black", 
              justifyContent: 'center',
              '&:hover': {
                  backgroundColor: '#f5f5f7',
                }
            }}
          >
            <AddIcon/>
            Add new item
          </Button>
        </List>
      </Stack>
    </Sheet>
  );
}
