import { Stack, Typography, Button } from '@mui/joy';
import '../styles.css';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Link } from 'wouter';  
import ListCard from '../components/List';
import { useRoute } from "wouter";
import { useTrip } from "../firebase.ts"; 
import { Grid } from '@mui/joy';
import { useState } from 'react';

const PackingListPage = () => {
  const [match, params] = useRoute("/packinglist/:tripId");
  const tripId = params?.tripId; // Get the tripId from the URL
  const [trip, setTrip] = useTrip(tripId ?? "");
  const initialCategories = [
    { }
  ];
 
  const [categories, setCategories] = useState(initialCategories);
  
  const handleAddCategory = () => {
    setCategories([...categories, { title: ''}]);
  };
  

  return (
    <Stack 
      height="100%" 
      width="100%"
      justifyContent="flex-start" 
      alignItems="center" 
      bgcolor="var(--background-color)"
      padding="2rem"
    >
      <Stack
        height="100%" 
        width="100%"
        justifyContent="flex-start" 
        alignItems="center" 
        padding="2rem"
      >
        <Stack
          width="100%"
          height={30}
          justifyContent="center"
        >
          <Link href={`/tripoverview/${tripId}`}>
            <Button
              variant='plain'
              sx={{
                marginLeft: "-50px",
                '&:hover': {
                  backgroundColor: 'transparent'
                }
              }}
            >
              <ArrowLeftIcon sx={{ fontSize: "2rem", color: "black", transform: 'translateY(1px)' }} />
              <Typography sx={{ marginLeft: "-6px", color: "black" }}>
                {trip?.destination}
              </Typography>
            </Button>
          </Link>
        </Stack>

        <Stack
          width="95%"
          height={60}
          justifyContent="space-between" 
          alignItems="center"
          marginBottom="1rem"
          direction="row"
        >
          <Typography level="h2" fontWeight="bold">
            Packing List
          </Typography>

          <Button
            size='lg'
            sx={{
              height: '20%',
              width: '10%',
              border: '2px solid var(--tertiary-color)',
              borderRadius: '15px',
              backgroundColor: 'transparent',
              color: 'var(--tertiary-color)',
              fontSize: '25px',
              justifyContent: 'center',
              ":hover": { backgroundColor: "var(--secondary-color)" },
              boxShadow: 'md'
            }}
            onClick={handleAddCategory}
          >
            +
          </Button>
        </Stack>

        <Stack
          height="100%"
          width="95%"
          bgcolor="white"
          borderRadius={15}
          alignItems="flex-start"
          maxHeight="90%"
          padding="2rem"
          sx={{
            overflow: 'hidden', 
          }}
          >
          <Stack
            height="100%"
            maxWidth="100%"
            direction="column"
            flexWrap="wrap"
            justifyContent="flex-start"
            alignItems="flex-start"
            gap={3}
            // bgcolor="pink"
            sx={{
              overflow: "hidden"
            }}
          >
            {categories.map((category, index) => (
              <Stack 
                key={index} 
              >
                <ListCard initialTitle={index === 0 ? "Clothes" : ""}/>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PackingListPage;
