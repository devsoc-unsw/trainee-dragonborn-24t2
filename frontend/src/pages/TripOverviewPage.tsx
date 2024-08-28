
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
} from '@mui/joy'; 
// import OpenInNew from '@mui/icons-material/OpenInNew';
// import Info from '@mui/icons-material/Info';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import LuggageRoundedIcon from '@mui/icons-material/LuggageRounded';

// SHADOW
// sx={
//   (theme) => ({
//     boxShadow: theme.shadow.md,
//     '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
//     '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)'})}

const TripOverviewPage = () => {
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
						<Avatar size="lg" sx={
            (theme) => ({
              boxShadow: theme.shadow.md,
              '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
              '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)'})}>AB</Avatar>
						<Avatar size="lg" sx={
            (theme) => ({
              boxShadow: theme.shadow.md,
              '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
              '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)'})}>CD</Avatar>
						<Avatar size="lg" sx={
            (theme) => ({
              boxShadow: theme.shadow.md,
              '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
              '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)'})}>EF</Avatar>
						<Avatar size="lg" sx={
            (theme) => ({
              boxShadow: theme.shadow.md,
              '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
              '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)'})}>AB</Avatar>
						<Avatar size="lg" sx={
            (theme) => ({
              boxShadow: theme.shadow.md,
              '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
              '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)'})}>AB</Avatar>
						<Avatar size="lg" sx={
            (theme) => ({
              boxShadow: theme.shadow.md,
              '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
              '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)'})}>CD</Avatar>
						<Avatar size="lg" sx={
            (theme) => ({
              boxShadow: theme.shadow.md,
              '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
              '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)'})}>EF</Avatar>
						<Avatar size="lg" sx={
            (theme) => ({
              boxShadow: theme.shadow.md,
              '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
              '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)'})}>AB</Avatar>
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
            borderRadius: "lg", bgcolor:'white', paddingLeft:'32px'})}>
						<ListItem>book flights</ListItem>
						<ListItem nested>
						<ListItem>book sightseeing</ListItem>
						<List marker="circle">
							<ListItem>disney sea</ListItem>
							<ListItem>tokyo tower</ListItem>
							<ListItem>osaka bullet train</ListItem>
						</List>
						</ListItem>
						<ListItem>book hotels</ListItem>
          </List>
				</Stack>
			</Stack>
		</Stack>
	{/* <Box>Navbar goes up here</Box>
		<Box 
			my={4}
			// display="flex"
			alignItems="center"
			gap={4}
			p={2}
			sx={{ border: '2px solid grey' }}
		>
			<h1>Trip Name</h1>
			<AspectRatio ratio="4/3">
				<img src="./assets/trip.JPG"></img>
			</AspectRatio>
			<h2>dates</h2>

			<List
				sx={{
					maxWidth: 320,
				}}
			>
				<ListItem>
					<ListItemButton onClick={() => alert('You clicked')}>
						<ListItemDecorator>
							<p>icon</p>
						</ListItemDecorator>
						Clickable item
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton component="a" href="#actionable">
						<ListItemDecorator>
							<p>icon</p>
						</ListItemDecorator>
						Open a new tab
					</ListItemButton>
				</ListItem>
			</List>
		</Box >

		<Box
			my={10}
			p={2}
			sx={{ border: '2px solid grey' }}
		 display="block"
		 alignItems="left"
		>
			<h2>Friends</h2>
			<Box
				my={4}
				display="flex"
				alignItems="center"
				gap={2}
				sx={{ border: '2px solid grey' }}
			
			>
				<Avatar>AB</Avatar>
				<Avatar>CD</Avatar>
				<Avatar>EF</Avatar>
				<Avatar>AB</Avatar>
				<Avatar>CD</Avatar>
				<Avatar>EF</Avatar>
			</Box>

		</Box>

		<Box
			my={4}
			// display="flex"
			alignItems="center"
			gap={4}
			p={2}
			sx={{ border: '2px solid grey' }}
		
		>
			<h1>To do list</h1>
			<List marker={"disc"}>
					<ListItem>The Shawshank Redemption</ListItem>
					<ListItem nested>
						<ListItem>Star Wars</ListItem>
						<List marker="circle">
							<ListItem>Episode I – The Phantom Menace</ListItem>
							<ListItem>Episode II – Attack of the Clones</ListItem>
							<ListItem>Episode III – Revenge of the Sith</ListItem>
						</List>
					</ListItem>
					<ListItem>The Lord of the Rings: The Two Towers</ListItem>
				</List>
		</Box> */}
		
	</Stack>
  )
} 


export default TripOverviewPage;
