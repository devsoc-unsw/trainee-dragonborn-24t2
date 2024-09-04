import { Sheet, ListItem, Checkbox, List, ListItemButton, Input } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';
import { useState } from 'react';

interface ListProps {
  title: string;
}

export default function ListCard({ title }: ListProps) {
  const [todos, setTodos] = useState<string[]>(["New item"]);

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
        width: 275, 
        backgroundColor: 'var(--secondary-color)', 
        boxShadow: "md" 
      }}
    >
      <Typography
        id="filter-status"
        sx={{
          color: "var(--tertiary-color)",
          font: "var(--font-primary)",
          fontWeight: "bold",
          mb: 1,
        }}
      >
        {title}
      </Typography>
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
            <AddIcon />
            Add new item
          </ListItemButton>
        </List>
      </div>
    </Sheet>
  );
}
