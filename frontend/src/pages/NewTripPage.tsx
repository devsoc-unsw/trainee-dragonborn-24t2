import { Button, Input, Stack, Typography } from "@mui/joy";
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useFirestore } from "reactfire";
import { Link, useLocation } from "wouter";
import { createTrip, useAuthUser } from "../firebase";

const NewTripPage = () => {
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [user] = useAuthUser();
  const [, setLocationPath] = useLocation();
  const [imgDataUrl, setImgDataUrl] = useState<string | null>(null);

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(event.target.value);
  };
  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgDataUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const firestore = useFirestore();
  const handleClick = async () => {
    console.log("before creating trip")
    const tripId = await createTrip(firestore, user!.uid, {
      name: name,
      destination: location,
      from: Timestamp.fromDate(new Date(fromDate)),
      to: Timestamp.fromDate(new Date(toDate)),
      image: imgDataUrl || "../assets/images/tripPlaceholder.jpg",
    });
    console.log(`this is the dataurl ${imgDataUrl}`)
    setLocationPath(`/tripoverview/${tripId}`);
  };

  return (
    <Stack height="100%" justifyContent="center" alignItems="center" bgcolor="var(--background-color)" gap={1}>
      <Stack width={800} alignItems="flex-start">
        <Typography level="h1" sx={{ color: "var(--tertiary-color)" }}>New Trip</Typography>
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
          <Input
            sx={{
              width: "100%",
              color: "#B9A49A"
            }}
            placeholder="add location"
            variant="outlined"
            onChange={handleLocationChange}
          />
        </Stack>
        <Stack direction="row" gap={2} alignItems="center" width="50%">
          <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">Name</Typography>
          <Input
            sx={{
              width: "100%",
              color: "#B9A49A"
            }}
            placeholder="add trip name"
            variant="outlined"
            onChange={handleNameChange}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between" width="50%">
          <Stack gap={1}>
            <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">From</Typography>
            <Input type="date" sx={{ color: "#B9A49A" }} onChange={handleFromDateChange}/>
          </Stack>
          <Stack gap={1}>
            <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">To</Typography>
            <Input type="date" sx={{ color: "#B9A49A" }} onChange={handleToDateChange}/>
          </Stack>
        </Stack>
        <Stack direction="row" gap={2} alignItems="center" width="50%">
          <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">Picture</Typography>
          <Input
            type="file"
            sx={{ width: "100%", alignItems: "center", color: "#B9A49A" }}
            onChange={handleImageChange}
          />
        </Stack>

        <Button
          sx={{
            width: "25%",
            backgroundColor: "var(--primary-color)",
            "&:hover": {
              bgcolor: "var(--tertiary-color)",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
            },
            marginTop: "20px"
          }}
          variant="solid"
          size="lg"
          onClick={handleClick}
        >PLAN TRIP!
        </Button>
      </Stack>
      <Link href="/home">
        <Button variant="plain" sx={{ fontSize: "7px", color: "var(--tertiary-color)" }}>I wanna go back pls</Button>
      </Link>
    </Stack>
  );
};

export default NewTripPage;