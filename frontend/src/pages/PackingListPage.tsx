import { Stack, Typography, Button } from '@mui/joy';
import '../styles.css';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Link } from 'wouter';  
import ListCard from '../components/List';

const PackingListPage = () => {
  return (
    <Stack 
      height="100%" 
      justifyContent="center" 
      alignItems="center" 
      bgcolor="var(--background-color)"
    >
      <Stack
        width="95%"
        justifyContent="flex-start" 
        // bgcolor="pink"
        sx={{ marginTop: '-3rem' }}
        direction="row"
      >
        <Link href='/tripoverview'>
          <Button
            variant='plain'
            sx={{
              marginLeft: "-20px",
              '&:hover': {
                backgroundColor: 'transparent'
            }}}
          >
            <ArrowLeftIcon sx={{ fontSize: "2rem", color: "black", transform: 'translateY(1px)' }}></ArrowLeftIcon>
            <Typography sx={{ marginLeft: "-6px", color: "black" }}>
              japan
            </Typography>
        </Button>
        </Link>
      </Stack>
      
      <Stack
        gap={2}
        height="65%" 
        width="90%"
        justifyContent="center" 
        alignItems="flex-left" 
        // bgcolor="pink"
      >
        <Typography 
          level="h2" 
          fontWeight="bold" 
        >
          Packing List
        </Typography>
        <Stack
          height="85%" 
          width="100%"
          bgcolor="white"
          borderRadius={15}
        >
          <ListCard title="Clothes"/>
          <ListCard title="Electronics"/>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default PackingListPage