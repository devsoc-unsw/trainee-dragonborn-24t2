import {
  Stack,
  Typography,
  Button,
} from '@mui/joy';
import { Link } from 'wouter';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import CreateActivityModal from "../components/modal/CreateActivityModal.tsx";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useTrip, useUsers } from "../firebase.ts";
import { useLocation, useRoute } from 'wouter';
import { DaySchedule, Activity } from '../types.ts';

const dayLength: number = 24 - 7; // Day length from 7am to midnight
const dayStart: number = 7;

const timeblockHeight = (startTime: number, endTime: number) => {
  return (endTime - startTime) / dayLength;
}

const topRelative = (startTime: number) => {
  return ((startTime - dayStart) / dayLength) * 100;
}

const ItineraryPage = () => {
  const [match, params] = useRoute("/itinerary/:tripId");
  const tripId = params?.tripId;
  const [trip, setTrip] = useTrip(tripId ?? "");
  const tripMembers = useUsers(trip?.members ?? []);
  const [, setLocationPath] = useLocation();

  const handleBackClick = () => {
    setLocationPath(`/tripoverview/${tripId}`)
  }

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: '2-digit'
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };

  const renderTimes = () => (
    <Stack direction="column" spacing={0.5} sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
      {[...Array(24).keys()].map(hour => (
        <Typography key={hour} sx={{ textAlign: 'center' }}>
          {hour >= dayStart ? `${hour}:00` : ''}
        </Typography>
      ))}
    </Stack>
  );

  const renderDaySchedule = (day: DaySchedule) => (
    <Stack
      key={day.date.seconds}
      width="2000px"
      bgcolor='white'
      sx={{ border: 'solid', borderColor: 'grey', borderRadius: '10px' }}
      flexDirection="column"
      p="20px"
      gap="10px"
    >
      {/* Day date and icon */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pt="24px"
      >
        <Stack flexDirection='column'>
          <Typography level="h3">{day.date.toDate().toLocaleDateString('en-US', { weekday: 'long' })}</Typography>
          <Typography level="title-sm">{formatDate(day.date.toDate())}</Typography>
        </Stack>
        <WbSunnyIcon sx={{ fontSize: '44px', color: 'var(--tertiary-color)' }} />
      </Stack>

      {/* One day's schedule with activities */}
      <Stack
        bgcolor='var(--background-color)'
        height="80%"
        sx={(theme) => ({
          boxShadow: theme.shadow.md,
          '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
          '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
          borderRadius: '10px'
        })}
      >
        {day.dayEvents.map((event: Activity) => {
          const startTime = event.starttime.toDate().getHours() + event.starttime.toDate().getMinutes() / 60;
          const endTime = event.endtime.toDate().getHours() + event.endtime.toDate().getMinutes() / 60;
          const eventName = event.name;

          return (
            <Stack
              key={event.activityId}
              bgcolor='var(--tertiary-color)'
              color='white'
              sx={(theme) => ({
                boxShadow: theme.shadow.md,
                '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
                '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
                position: 'relative',
                top: `${topRelative(startTime)}%`,
                height: `${timeblockHeight(startTime, endTime)}%`,
                borderRadius: '10px'
              })}
              justifyContent='center'
              alignItems='center'
            >
              {eventName}
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      height="100%"
      sx={{ pt: "60px"}}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        width="80%"
        height="100%"
        gap={5}
        sx={{ flexGrow: 1 }}
      >
        {/** stack one */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          height="10%"
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Link href={`/tripoverview/${tripId}`}>
            <Button
              variant='plain'
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent'
                }
              }}
              onClick={handleBackClick}
            >
              <ArrowLeftIcon sx={{ fontSize: "2rem", color: "black" }} />
              <Typography sx={{ color: "black", ml: 1 }}>
                {trip?.destination}
              </Typography>
            </Button>
          </Link>
          {trip && <CreateActivityModal trip={trip} />}
        </Stack>

        {/** stack two */}
        <Stack
          direction="row"
          spacing={2}
          width="100%"
          sx={{ border: 'solid', borderColor: 'grey', flexGrow: 1 }}
        >
          <Stack
            width="100%"
            height="100%"
            flexDirection="column"
            sx={{ overflowY: 'none' }}
          >
            {/** times */}
            {renderTimes()}
          </Stack>

          {/* Iterate through the itinerary days */}
          <Stack
            direction="row"
            spacing={2}
            flexGrow={1}
            overflow="auto"
            sx={{ height: '100%' }}
          >
            {trip?.itinerary.map(renderDaySchedule)}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ItineraryPage;