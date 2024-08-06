import React, { useEffect, useState } from 'react';
import { Box, Typography, Card } from '@mui/joy';


interface CountdownTimerProps {
  tripDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ tripDate }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0 });

    useEffect(() => {
      const calculateTimeLeft = () => {
        const now = new Date();
        const timeDifference = tripDate.getTime() - now.getTime();
        if (timeDifference > 0) {
          setTimeLeft({
            days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
          });
        } else {
          setTimeLeft({ days: 0 });
        }
      };

      const timer = setInterval(calculateTimeLeft, 1000);
      calculateTimeLeft(); // Initial calculation

      return () => clearInterval(timer);
    }, [tripDate]);

    return (
        <Card sx={{
            width: 320,
            padding: 2,
            textAlign: 'center',
            backgroundColor: '#ffe1d3'}}>
          <Typography level="h4">Trip Name</Typography>
          <Box
            sx={{
              border: '2px solid black',
              borderRadius: '8px',
              padding: 2,
              marginTop: 2,
              backgroundColor: '#ffffff',
            }}
          >
            <Typography level="body-sm">Countdown</Typography>
            <Typography level="body-lg">{timeLeft.days} days</Typography>
          </Box>
        </Card>
      );
    };

export default CountdownTimer;

