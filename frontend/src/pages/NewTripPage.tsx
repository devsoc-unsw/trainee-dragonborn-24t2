import { Button, Input, Stack, Typography } from '@mui/joy';
import React, { useState } from 'react';
import { useLocation } from 'wouter';
// import { useNavigate } from 'react-router-dom';

const NewTripPage = () => {
  const [location, setLocation] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [, setLocationPath] = useLocation();
  // const navigate = useNavigate();

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value)
  }
  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(event.target.value)
  }
  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(event.target.value)
  }

  const handleClick = () => {
    setLocationPath('/tripoverview', { state: { location, fromDate, toDate } });
    // navigate('/tripoverview', { state: { location, fromDate, toDate } });
    // console.log("we are travelling to " + location + "from" + fromDate + "to" + toDate);
  }

  return (
    <Stack height="100%" justifyContent="center" alignItems="center" bgcolor="var(--background-color)" gap={1}>
      <Stack width={800} alignItems="flex-start">
        <Typography level="h1" sx={{ color: "var(--tertiary-color)"}}>New Trip</Typography>
      </Stack>
      <Stack
        bgcolor="#f9e1d6"
        width={800}
        height={500}
        justifyContent="center"
        alignItems="center"
        gap={4}
        border="solid 3px var(--primary-color)"
        borderRadius={15}
      >
        <Stack direction="row" gap={2} alignItems="center" width="50%">
          <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">Location</Typography>
          <Input sx={{
            width: "100%", 
            color: "#B9A49A"
          }} 
          placeholder="add location"
          variant="outlined"
          onChange={handleLocationChange}/>
        </Stack>
        <Stack direction="row" justifyContent="space-between" width="50%">
          <Stack gap={1}>
            <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">From</Typography>
            <Input type="date" sx={{color: "#B9A49A"}} onChange={handleFromDateChange}/>
          </Stack>
          <Stack gap={1}>
            <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">To</Typography>
            <Input type="date" sx={{color: "#B9A49A"}} onChange={handleToDateChange}/>
          </Stack>
        </Stack>
        <Stack direction="row" gap={2} alignItems="center" width="50%">
          <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">Picture</Typography>
          <Input
            type="file"
            sx={{ width: "100%", alignItems: "center", color: "#B9A49A"}}
          />
        </Stack>
        <Button 
        // component="a" href="/tripoverview"
        sx={{ width: "25%", backgroundColor: "var(--primary-color)", borderRadius: "15px", ":hover": { backgroundColor: "#f5623d"}, marginTop: "20px"}} 
        variant="solid"
        size='lg'
        onClick={handleClick}
        >PLAN TRIP!</Button>
      </Stack>
    </Stack>
  );
}

export default NewTripPage;