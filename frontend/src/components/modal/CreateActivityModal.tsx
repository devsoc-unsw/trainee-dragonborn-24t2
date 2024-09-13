import React, { useState } from 'react';
import { Button, Input, Stack, Typography, Modal, ModalClose, Sheet } from '@mui/joy';
import { useUser, createActivity, useActivity, useTrip } from '../../firebase';
import { useFirestore } from 'reactfire';
import { Timestamp } from 'firebase/firestore';
import { useLocalStorage } from 'usehooks-ts';
import { Trip } from '../../types';

export default function CreateActivityModal({ trip}: { trip: Trip }) { // prop shorthand
  const [authUser] = useLocalStorage("auth-user", "");
  const [user,] = useUser(authUser);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [open, setOpen] = useState(false);
  const firestore = useFirestore();
  const [tripData, updateTrip] = useTrip(trip.tripId);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleFromTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromTime(event.target.value);
  };

  const handleToTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToTime(event.target.value);
  };

  const handleCreateActivity = async (trip: Trip) => {
    if (user) {
      const fromDateTime = new Date(`${date}T${fromTime}`);
      const toDateTime = new Date(`${date}T${toTime}`);
      const activityId = await createActivity(firestore, trip.tripId, {
        name,
        date: Timestamp.fromDate(new Date(date)),
        starttime: Timestamp.fromDate(fromDateTime),
        endtime: Timestamp.fromDate(toDateTime),
      });

      // add to trips activities
      if (tripData) {
        const updatedActivities = [...(trip.activities || []), activityId];
        await updateTrip({...tripData, activities: updatedActivities});
      }
    }
    setOpen(false);
  };

  return (
    <div>
      {/* openign */}
      <Button
      variant="outlined"
      onClick={() => setOpen(true)}
      sx={{
        width: '120px',
        color: "var(--tertiary-color)",
        borderColor: "var(--tertiary-color)",
        borderWidth: '3px',
        '&:hover': {
          borderColor: "var(--primary-color)",
          bgcolor: "var(--primary-colour)"
        },
      }}
    >
      + Activity
    </Button>

      {/* modal */}
      <Modal
        aria-labelledby="create-activity-modal-title"
        open={open}
        onClose={(_event: React.MouseEvent<HTMLButtonElement>, reason: string) => {
          if (reason === 'closeClick') {
            setOpen(false);
          }
        }}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            minWidth: 600,
            height: 400,
            bgcolor: "#fbf2ee",
            border: "solid 5px var(--tertiary-color)",
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

          {/* Content */}
          <Stack
            spacing={3}
            sx={{
              width: '70%',
              maxWidth: 500,
              alignItems: 'center'
            }}
          >
            <Typography
              component="h2"
              id="create-activity-modal-title"
              level="h1"
              textColor="var(--tertiary-color)"
              sx={{ fontWeight: 'bold', textAlign: 'center' }}
            >
              Create New Activity
            </Typography>
            <Stack spacing={3} width="100%">
              <Stack direction="row" gap={2} alignItems="center" width="100%">
                <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">
                  Name
                </Typography>
                <Input
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Add activity name"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    color: "#b9a49a"
                  }}
                />
              </Stack>
              <Stack direction="row" gap={2} alignItems="center" width="100%">
                <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">
                  Date
                </Typography>
                <Input
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                  sx={{ width: "100%", color: "#b9a49a" }}
                />
              </Stack>
              <Stack direction="row" gap={2} justifyContent="space-between" width="100%">
                <Stack gap={1}>
                  <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">
                    From
                  </Typography>
                  <Input
                    type="time"
                    value={fromTime}
                    onChange={handleFromTimeChange}
                    sx={{ width: "100%", color: "#b9a49a" }}
                  />
                </Stack>
                <Stack gap={1}>
                  <Typography fontFamily="var(--font-primary)" level="h3" fontWeight="bold">
                    To
                  </Typography>
                  <Input
                    type="time"
                    value={toTime}
                    onChange={handleToTimeChange}
                    sx={{ width: "100%", color: "#b9a49a" }}
                  />
                </Stack>
              </Stack>
            </Stack>
            <Button
              onClick={() => handleCreateActivity(trip)}
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
              CREATE ACTIVITY
            </Button>
          </Stack>
        </Sheet>
      </Modal>
    </div>
  );
}