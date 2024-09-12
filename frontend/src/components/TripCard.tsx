import AspectRatio from '@mui/joy/AspectRatio';
import {Stack, Card} from '@mui/joy';
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
      <Card sx={{
        width: 320,
        cursor: 'pointer',
        boxShadow: 'none',
        transition: 'transform 0.3s, box-shadow 0.3s', // does thee movbements
        '&:hover': { // & to apply to hover to 'Card'
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // colour of showd
          transform: 'scale(1.05)'
        }
      }}>
        <Stack justifyContent="center">
          <AspectRatio>
            <img src={imageUrl} style={{ objectFit: 'cover' }}/>
          </AspectRatio>
          <Typography textAlign="left" level="body-md" fontWeight="bold">{title}</Typography>
          <Typography textAlign="left" level="body-sm">{location}</Typography>
        </Stack>
      </Card>
    </Link>
  );
}
