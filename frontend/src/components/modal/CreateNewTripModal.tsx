import React, { useState } from 'react';
import { Button, Input, Stack, Typography, Modal, ModalClose, Sheet } from '@mui/joy';
import { useUser, createTrip } from '../../firebase';
import { useFirestore } from 'reactfire';
import { Timestamp } from 'firebase/firestore';
import { useLocalStorage } from 'usehooks-ts';

export default function CreateNewTripModal() {
const [authUser] = useLocalStorage("auth-user", "");
const [user, setUser] = useUser(authUser);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [tripId, setTripId] = useState("");
  const [open, setOpen] = useState(false);
  const firestore = useFirestore();

  // real time updating hte bvalues
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

  const handleClick = async () => {
    // create trip
    try {
      const tripId = await createTrip(firestore, authUser, {
        name: name,
        destination: location,
        from: Timestamp.fromDate(new Date(fromDate)),
        to: Timestamp.fromDate(new Date(toDate)),
      });
      setTripId(tripId);

      // add it to the users array
      if (user) {
      const updatedUser = {
          ...user,
          trips: [...(user.trips || []), tripId]
      };

      // put into the storefire
      await setUser(updatedUser);
      }

      // closing modal and redirect to the created page
      setOpen(false);
      setLocation(`/trip/${tripId}`);
    } catch (error) {
      console.error("Error creating trip: ", error);
    }
  };

  return (
    <div>
      {/* opening */}
      <Button
        onClick={() => setOpen(true)}
        sx={{
            width: '120px',
            bgcolor: 'var(--primary-color)',
            '&:hover': {
              bgcolor: 'var(--tertiary-color)',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            },
          }}>
        + Trip
      </Button>

      {/* the sheet */}
      <Modal
        aria-labelledby="close-modal-title"
        open={open}
        onClose={(_event: React.MouseEvent<HTMLButtonElement>, reason: string) => {
          if (reason === 'closeClick') { // only for 'x' click
            setOpen(false);
          }
        }}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            minWidth: 800,
            height: 500,
            bgcolor: "#fbf2ee", // lighter than teriaty
            border: "solid 5px var(--primary-color)",
            borderRadius: 15,
            p: 4,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* 'x' button */}
          <ModalClose
            variant="plain"
            sx={{ position: 'absolute', top: 10, right: 10 }}
            onClick={() => setOpen(false)}
          />

          {/* content */}
          <Stack
            spacing={3}
            sx={{
              width: '60%',
              maxWidth: 600,
              alignItems: 'center'
            }}
          >
            <Typography
              component="h2"
              id="close-modal-title"
              level="h1"
              textColor="var(--tertiary-color)"
              sx={{ fontWeight: 'bold', textAlign: 'center' }}
            >
              Create New Trip
            </Typography>
            <Stack spacing={3} width="100%">
              <Stack direction="row" gap={2} alignItems="center" width="100%">
                <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">
                  Location
                </Typography>
                <Input
                  value={location}
                  onChange={handleLocationChange}
                  placeholder="Add location"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    color: "#b9a49a"
                  }}
                />
              </Stack>
              <Stack direction="row" gap={2} alignItems="center" width="100%">
                <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">
                  Name
                </Typography>
                <Input
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Add trip name"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    color: "#B9A49A"
                  }}
                />
              </Stack>
              <Stack direction="row" gap={2} justifyContent="space-between" width="100%">
                <Stack gap={1}>
                  <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">
                    From
                  </Typography>
                  <Input
                    type="date"
                    value={fromDate}
                    onChange={handleFromDateChange}
                    sx={{ width: "100%", color: "#B9A49A" }}
                  />
                </Stack>
                <Stack gap={1}>
                  <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">
                    To
                  </Typography>
                  <Input
                    type="date"
                    value={toDate}
                    onChange={handleToDateChange}
                    sx={{ width: "100%", color: "#b9a49a" }}
                  />
                </Stack>
              </Stack>
              <Stack direction="row" gap={2} alignItems="center" width="100%">
                <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">
                  Picture
                </Typography>
                <Input type="file" sx={{ width: "100%", color: "#b9a49a" }} />
              </Stack>
            </Stack>
            <Button
              onClick={handleClick}
              sx={{
                width: "50%",
                backgroundColor: 'var(--primary-color)',
                '&:hover': {
                  bgcolor: 'var(--tertiary-color)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                },
                mt: 2
              }}
              variant="solid"
              size="lg"
            >
              PLAN TRIP!
            </Button>
          </Stack>
        </Sheet>
      </Modal>
    </div>
  );
};