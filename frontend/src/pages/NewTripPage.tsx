import { Button, Input, Stack, Typography } from '@mui/joy';
import React, { useState } from 'react';


const NewTripPage = () => {
  const [location, setLocation] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value)
  }

  const handleClick = () => {
    console.log("we are travelling to " + location);
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
          onChange={handleInputChange}/>
        </Stack>
        <Stack direction="row" justifyContent="space-between" width="50%">
          <Stack gap={1}>
            <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">From</Typography>
            <Input type="date" sx={{color: "#B9A49A"}}/>
          </Stack>
          <Stack gap={1}>
            <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">To</Typography>
            <Input type="date" sx={{color: "#B9A49A"}}/>
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