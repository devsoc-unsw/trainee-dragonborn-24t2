import {
  Stack,
  Typography, 
  
} from '@mui/joy'

import  WbSunnyIcon from '@mui/icons-material/WbSunny';

const ItineraryPage = () => {

  const startTime = 9;
  const endTime = 13.5;
  
    return (
      <Stack justifyContent='center' alignItems='center' width='100%' height='100%'>
        <Stack height='70%' width='20%' sx={{border:'solid', borderColor:'grey', borderRadius:'10px'}} flexDirection={"column"} p="20px" gap="10px">
          <Stack bgcolor={"red"} flexDirection='row' justifyContent='space-between' alignItems='center' pt="30px">
            <Stack flexDirection='column'>
              <Typography level="h3">Monday</Typography>
              <Typography level="title-sm">4/09/2024</Typography>
            </Stack>
            <WbSunnyIcon sx={{fontSize:'44px'}} />
          </Stack>  
          <Stack bgcolor="green" height="80%" >
            <Stack bgcolor="blue" sx={{position:'relative', top:"40px"}} >hello</Stack>
           
          </Stack>
        </Stack>
      </Stack>

    )
  }
  
export default ItineraryPage;