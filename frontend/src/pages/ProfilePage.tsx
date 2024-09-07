import '../styles.css';
import { Stack, Typography, Card, Avatar, Button, IconButton } from '@mui/joy';



const ProfilePage = () => {
	return (

	<Stack alignItems={"center"} height="100%">
		<Stack width="80%" height="100%" direction="row" gap={5} justifyContent="space-around" py="100px">

    <Stack width='50%' direction="column" justifyContent="center">
      <Card sx={{justifyContent: 'center', alignItems: 'center', p: 5}}>
          <Avatar sx={{"--Avatar-size": "150px"}}>BS</Avatar>
          <Typography level="h3">Bea Dela Cruz</Typography>
          <Typography>*email*</Typography>
          <Stack>
            <IconButton></IconButton>
            <Typography>Hello</Typography>
          </Stack>
        </Card>
			</Stack>

      <Stack width='50%' direction="column" justifyContent="center">
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