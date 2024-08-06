import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { Link } from "wouter"


interface TripCardProps {
  title: string;
  location: string;
  imageUrl: string;
  linkTo: string;
}

export default function TripCard({ title, location, imageUrl, linkTo }: TripCardProps) {
  return (
    <Link href={linkTo} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          width: 320,
          cursor: 'pointer',
          boxShadow: 'none',
          transition: 'transform 0.5s, box-shadow 0.5s', // Smooth transition
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            transform: 'scale(1.05)'
          }
        }}
      >
        <AspectRatio minHeight="80px" maxHeight="180px">
          <img
            src={imageUrl}
            alt={title}
            style={{ objectFit: 'cover' }}
          />
        </AspectRatio>
        <div>
          <Typography level="title-lg">{title}</Typography>
          <Typography level="body-sm">{location}</Typography>
        </div>
      </Card>
    </Link>
  );
}
