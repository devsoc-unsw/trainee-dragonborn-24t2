import '../styles.css';
import { Stack, Typography, Card, Avatar, Button, IconButton } from '@mui/joy';



const ProfilePage = () => {
	return (

	<Stack
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{pt: '60px'}}>

    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      width="80%"
      gap={5}
      >

    {/* left */}
    <Stack width='30%' direction="column" justifyContent="center">
      <Card sx={{justifyContent: 'center', alignItems: 'center', p: 5}}>
          <Avatar sx={{"--Avatar-size": "100px"}}>BS</Avatar>
          <Typography level="h3">Bea Dela Cruz</Typography>
          <Typography>*email*</Typography>
          <Stack>
            <IconButton></IconButton>
            <Typography>Hello</Typography>
          </Stack>
        </Card>
			</Stack>

      <Stack width='60%' direction="column" justifyContent="center">
      <Card sx={{justifyContent: 'center', alignItems: 'center'}}>
          <Avatar>BS</Avatar>
          <Typography level="h3">Bea Dela Cruz</Typography>
          <Typography>*email*</Typography>
      </Card>
			</Stack>


		</Stack>
	</Stack>
  )
}

export default ProfilePage;