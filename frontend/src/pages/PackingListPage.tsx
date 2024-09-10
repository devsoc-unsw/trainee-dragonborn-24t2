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
                marginLeft: "-20px",
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
              boxShadow: 'lg'
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
          justifyContent="center"
          alignItems="center"
          sx={{
            maxHeight: 'calc(100vh - 200px)', // Adjust this value based on your design needs
            overflowY: 'auto'
          }}
        >
          <Stack
            height="100%"
            width="100%"
            padding="2rem"
            // bgcolor="pink"
            // borderRadius={15}
          >
            <Grid
              container
              spacing={2}
              // rowSpacing={1}
              // columnSpacing={3}
              direction="row"
              sx={{
                justifyContent: "flex-start",
                alignItems: "baseline",
                flexGrow: 1
              }}
            >
              {categories.map((category, index) => (
                <Grid key={index} 
                  // rowSpacing={5}
                  // columnSpacing={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }}
                  xs={12}    // Full width on extra small screens (mobile)
                  sm={6}     // 2 columns on small screens
                  md={4}     // 3 columns on medium screens (tablet)
                  lg={3}     // 4 columns on large screens (laptop)
                  xl={2.4} 
                >
                  
                  <ListCard initialTitle={index === 0 ? "Clothes" : ""}/>
                </Grid>
              ))}
            </Grid>
          </Stack>
          
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PackingListPage;
