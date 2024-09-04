
import '../styles.css';
import {
	Avatar, 
	List, 
	ListItem, 
	ListItemButton,
	ListItemDecorator,
	Grid, 
	Box,
	AspectRatio,
	Stack,
	Typography,
	Button,
	Input,
	IconButton,


} from '@mui/joy'; 
// import OpenInNew from '@mui/icons-material/OpenInNew';
// import Info from '@mui/icons-material/Info';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';

import LuggageRoundedIcon from '@mui/icons-material/LuggageRounded';
import Add from '@mui/icons-material/Add';

// SHADOW
// sx={
//   (theme) => ({
//     boxShadow: theme.shadow.md,
//     '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
//     '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)'})}

const TripOverviewPage = () => {
	const [ setToDo] = useState("");

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	  setToDo(event.target.value)
	}

	const [todos, setTodos] = React.useState<string[]>(["todo1", "2", "3"]);

	const onChangeTodo = (idx: number, newTodo: string) => {
		const newTodos = [...todos];
		newTodos[idx] = newTodo;
		setTodos(newTodos);

	}
	const addNewTodo = () => {
		const newTodos = [...todos];
		newTodos.push("");
		setTodos(newTodos);
	}

	const [friends, setFriends] = React.useState<string[]>(["AB", "BC", "CD"]);

	const addNewFriends = () => {
		const newFriends = [...friends];
		newFriends.push("");
		setFriends(newFriends);
	}

	return (

	<Stack 
	direction="column"
	// justifyContent={"center"}
	alignItems={"center"}
	height="100%"
  
  bgcolor={'var(--background-color)'}
  fontFamily={'var(--font-primary)'}
  color={'var(--tertiary-color)'}
	>
	
		<Stack 
		// bgcolor={"pink"} 
		width="80%" 
		height="100%"
		direction="row" 
		gap={5}
		justifyContent="space-around"
		py="100px"
		>

			<Stack 
			width="60%"
			direction="column"
			>
				<Stack direction="row" justifyContent="space-between" alignItems="flex-end" pb="10px">
					<Typography fontFamily={'var(--font-primary)'} level="h1" fontSize="53px" pl="20px" sx={{color: 'var(--tertiary-color)'}}>Japan</Typography>
					<Typography level="body-lg" fontSize="24px" fontWeight="bold">8 Aug 24 - 17 Aug 24</Typography>
				</Stack>
				<AspectRatio 
        ratio="16/9"  
        sx={
          (theme) => ({
            boxShadow: theme.shadow.md,
            '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
            '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
            width: "100%", borderRadius: "lg",
          })
        } >

					<img src="/japan.jpg"></img>
				</AspectRatio>
				<List
					sx={{
						maxWidth: 320,
            paddingTop: '20px'
					}}
          
				>
					<ListItem>
							<ListItemButton component="a" href="/itinerary">
								<ListItemDecorator>
									<CalendarTodayIcon sx={{fontSize: '24px', color:'var(--tertiary-color)'}}/>
								</ListItemDecorator>
								<Typography level="body-lg" fontSize="24px" fontWeight="bold">View Itinerary</Typography>
							</ListItemButton>
						</ListItem>
						<ListItem>
							<ListItemButton component="a" href="/packinglist">
								<ListItemDecorator>
                  <LuggageRoundedIcon sx={{fontSize: '28px', color:'var(--tertiary-color)'}}/>
								</ListItemDecorator>
								<Typography level="body-lg" fontSize="24px" fontWeight="bold">View Packing List</Typography>
							</ListItemButton>
						</ListItem>
				</List>
			</Stack>

			<Stack  width='30%' gap="40px" paddingTop={'32px'}>
				<Stack>
					<Typography level="h2" fontSize="30px">Friends</Typography>
					<Stack direction="row" flexWrap="wrap" gap="24px" > 
						{friends.map((friend, idx) => 
						
						<Avatar size="lg" sx={
							(theme) => ({
								boxShadow: theme.shadow.md,
								'--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
								'--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)'})}>{friend}</Avatar>
						)}
						<IconButton
						size="lg"
        color="neutral"
        onClick={addNewFriends}
        sx={{
          borderRadius: '50%',
          marginInlineStart: 'var(--Avatar-marginInlineStart)',
          boxShadow: 'var(--Avatar-ring)',
					
        }}
      ><AddIcon/></IconButton>
					</Stack>
				</Stack>

				<Stack >
					<Typography level="body-lg" fontSize="30px" fontWeight="bold">To Do</Typography>
					<List marker='disc' 
						sx={
							(theme) => ({
								boxShadow: theme.shadow.md,
								'--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
								'--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
							borderRadius: "lg", bgcolor:'white'})}>
								{todos.map((todo, idx) => 
									<ListItem key={idx}>
										<Input variant='plain' placeholder='Type here' onChange={(e) => {
											onChangeTodo(idx, e.target.value);
										}} value={todo}/>
									</ListItem>
								)}
								<ListItemButton onClick={addNewTodo} sx={{justifyContent:'center'}}><AddIcon/>Add new to do</ListItemButton>
								
          </List>
				</Stack>
			</Stack>
		</Stack>
	</Stack>
  )
} 


export default TripOverviewPage;
