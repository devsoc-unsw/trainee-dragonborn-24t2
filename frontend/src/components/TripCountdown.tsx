import '../styles.css';
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

      const timer = setInterval(calculateTimeLeft, 10000);
      calculateTimeLeft();

      return () => clearInterval(timer); // when component uncmounts
    }, [tripDate]);

    return (
        <Card sx={styles.card}>
          <Typography sx={styles.header}>Trip Name</Typography>
          <Box sx={styles.box}>
            <Typography sx={styles.counter}>{timeLeft.days}</Typography>
            <Typography sx={styles.counterText}>days</Typography>
          </Box>
        </Card>
      );
    };

    const styles = {
      card: {
        width: 320,
        padding: 2,
        textAlign: 'center',
        borderRadius: '20px',
        boxShadow: '0 2px 2px rgba(0, 0, 0, 0.3)',
        backgroundColor: 'var(--secondary-color)',
      },
      header: {
        fontSize: 'var(--font-size-medium)',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--tertiary-color)',
      },
      box: {
        borderRadius: '20px',
        padding: 3,
        marginTop: 0.5,
        marginBottom: 1,
        backgroundColor: '#ffffff',
      },
      counter: {
        fontSize: 'var(--font-size-large)',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--tertiary-color)',
        marginBottom: 0.1,
      },
      counterText: {
        fontSize: 'var(--font-size-extrasmall)',
        fontWeight: 'var(--font-weight-normal)',
        color: 'var(--tertiary-color)',
        marginTop: 0.1,
      }
    };

export default CountdownTimer;
