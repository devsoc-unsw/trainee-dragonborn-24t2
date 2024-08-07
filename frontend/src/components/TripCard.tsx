import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { Link } from "wouter";

interface TripCardProps {
  title: string;
  location: string;
  imageUrl: string;
  linkTo: string;
}

export default function TripCard({ title, location, imageUrl, linkTo }: TripCardProps) {
  return (
    <Link href={linkTo}>
      <Card sx={styles.card}>
        <AspectRatio>
          <img
            src={imageUrl}
            style={{ objectFit: 'cover' }}
          />
        </AspectRatio>
        <div>
          <Typography sx={styles.title}>{title}</Typography>
          <Typography sx={styles.location}>{location}</Typography>
        </div>
      </Card>
    </Link>
  );
}

const styles = {
  card: {
    width: 320,
    cursor: 'pointer',
    boxShadow: 'none',
    transition: 'transform 0.3s, box-shadow 0.3s', // does thee movbements
    '&:hover': { // & to apply to hover to 'Card'
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // colour of showd
      transform: 'scale(1.05)'
    }
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--text-color)',
    textAlign: 'left',
  },
  location: {
    fontSize: '0.9rem',
    fontWeight: 'var(--font-weight-normal)',
    color: 'var(--text-color)',
    textAlign: 'left',
  }
};
