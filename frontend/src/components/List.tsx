import { Sheet, ListItem, Checkbox, List, ListItemButton, Input } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';
import { useState } from 'react';

interface ListCardProps {
  initialTitle?: string;
}

export default function ListCard({ initialTitle = '' }: ListCardProps) {
  const [todos, setTodos] = useState<string[]>(["New item"]);
  const [title, setTitle] = useState<string>(initialTitle);

  const onChangeTodo = (idx: number, newTodo: string) => {
    const newTodos = [...todos];
    newTodos[idx] = newTodo;
    setTodos(newTodos);
  };

  const addNewTodo = () => {
    setTodos([...todos, ""]);
  };

  return (
    <Sheet 
      variant="soft" 
      sx={{ 
        p: 3, 
        borderRadius: '10px', 
        width: 250, 
        backgroundColor: 'var(--secondary-color)', 
        boxShadow: "md" 
      }}
    >
      <Input
        variant='plain'
        onChange={(e) => setTitle(e.target.value)}
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
        
      <div role="group" aria-labelledby="filter-status">
        <List>
          {todos.map((todo, idx) => (
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
                }}
              />
              <Input
                variant="plain"
                placeholder="New item"
                value={todo}
                onChange={(event) => onChangeTodo(idx, event.target.value)}
                sx={{ 
                  color: "black", 
                  backgroundColor: "transparent", 
                }}
              />
            </ListItem>
          ))}
          <ListItemButton 
            onClick={addNewTodo} 
            sx={{ 
              color: "black", 
              justifyContent: 'center',
            }}
          >
            <AddIcon/>
            Add new item
          </ListItemButton>
        </List>
      </div>
    </Sheet>
  );
}
