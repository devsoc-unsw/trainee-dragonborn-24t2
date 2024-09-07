import AspectRatio from '@mui/joy/AspectRatio';
import {Stack, Card} from '@mui/joy';
import Typography from '@mui/joy/Typography';
import Place from '@mui/icons-material/Place';
import { Link } from "wouter";

interface TripCardProps {
  title: string;
  location: string;
  imageUrl: string;
  linkTo: string;
}

export default function TripCard({ title, location, imageUrl, linkTo }: TripCardProps) {
  return (
    <Link href={linkTo} style={{textDecoration: 'none' }}>
      <Card variant="plain"
      sx={{
        width: '100%',
        maxWidth: '400px',
        height: 'auto',
        aspectRatio: '4 / 3',
        "--Card-radius": "15px",
        cursor: 'pointer',
        boxShadow: 'none',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // colour of showd
          transform: 'scale(1.05)'
        }
      }}>
        <Stack justifyContent="center">
          <AspectRatio>
            <img src={imageUrl} style={{ objectFit: 'cover', borderRadius: 'md' }}/>
          </AspectRatio>
          <Typography textAlign="left" level="body-md" fontWeight="bold">{title}</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Place fontSize="small" sx={{color: 'var(--primary-color)'}} />
            <Typography textAlign="left" level="body-sm">{location}</Typography>
          </Stack>
        </Stack>
      </Card>
    </Link>
  );
}







