import {
  Stack,
  Typography, 
  Button,
} from '@mui/joy'

import  WbSunnyIcon from '@mui/icons-material/WbSunny';

import { useTrip, useUsers } from "../firebase.ts"; 

import { useLocation, useRoute } from 'wouter';
import Add from '@mui/icons-material/Add';
import { Trip, DaySchedule, DayEvent } from '../types.ts';

const eventStartTime: number = 20;
const eventEndTime: number = 23.5;
const dayLength: number = 24-7;
const dayStart: number = 7;

const timeblockHeight = (startTime: number, endTime: number) => {
  return (endTime - startTime) / dayLength;
}

const topRelative = (startTime: number ) => {
  const res = ((startTime - dayStart) / dayLength) * 100;
  console.log(res)
  return res;
}

const date = '4/09/2024';
const day = 'Monday'; 
const eventName = 'hiking';

const shadow = (theme: any) => ({
      boxShadow: theme.shadow.md,
      '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
      '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)'})

const ItineraryPage = () => {
  
	const [match, params] = useRoute("/itinerary/:tripId");
  const tripId = params?.tripId; // Get the tripId from the URL
	const [trip, setTrip] = useTrip(tripId ?? "")
	const tripMembers = useUsers(trip?.members ?? []);
	const [, setLocationPath] = useLocation();
  
	const handleBackClick = () => {
		setLocationPath(`/tripoverview/${tripId}`)
	}
	
    return (
      <Stack justifyContent='center' alignItems='center' width='100%' height='100%' bgcolor='var(--background-color)'>
        <Button sx={{position:'absolute', top:'70px', left:'60px'}} onClick={handleBackClick}> back </Button>
        <Stack  width='80%' height='70%' flexDirection='row' gap='20px' sx={{border:'solid', borderColor:'grey'}}>
          <Stack flexDirection='column'>times</Stack>
          { days.map((day) => 
            <Stack height='100%' width='20%' bgcolor='white' sx={{border:'solid', borderColor:'grey', borderRadius:'10px'}} flexDirection={"column"} p="20px" gap="10px">
              
              {/* day date and icon */}
              <Stack flexDirection='row' justifyContent='space-between' alignItems='center' pt="24px">
                <Stack flexDirection='column'>
                  <Typography level="h3">{day}</Typography>
                  <Typography level="title-sm">{date}</Typography>
                </Stack>
                <WbSunnyIcon sx={{fontSize:'44px', color:'var(--tertiary-color)'}} />
              </Stack>  
              {/* navigation arrows */}

              {/* one day schedule */}
              <Stack bgcolor='var(--background-color)' height="80%"  sx={
                  (theme) => ({
                    boxShadow: theme.shadow.md,
                    '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
                    '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)', borderRadius:'10px'})}>
                <Stack bgcolor='var(--tertiary-color)' color='white'
                sx={
                  (theme) => ({
                    boxShadow: theme.shadow.md,
                    '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
                    '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)', 
                    position:'relative', 
                    top:`${topRelative(eventStartTime)}%`, 
                    height:`${timeblockHeight(eventStartTime, eventEndTime)}`, 
                    borderRadius:'10px'
                  })}
                justifyContent={'center'} alignItems='center'>{eventName}</Stack>

              </Stack>
            </Stack>        
        )

          }

        </Stack>
      </Stack>

    )
  }
  
export default ItineraryPage;