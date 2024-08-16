import { CssVarsProvider, Sheet } from "@mui/joy"
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

const NewTripPage = () => {
  return (
    <CssVarsProvider>
      <Sheet
      sx={{
        width: 800,
        height: 480,
        mx: 'auto', // margin left & right
        my: 4, // margin top & bottom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md',
        backgroundColor: '#F9E1D6'
      }}
      variant='outlined' 
      style={{ border: '2px solid' }}
      >
        <div>
        <Typography level='h3' component="h1" 
          sx={{ 
            mt: 4,
          }}>
          Location
        </Typography>
        </div>
        <FormControl>
          <Input variant='soft' 
          name='location'
          placeholder='add location'
          />
        </FormControl>

        <div>
        <Typography level='h3' component="h1" 
          sx={{ 
            mt: 4,
          }}>
          From
        </Typography>
        </div>
        <FormControl>
          <Input variant='soft' 
          name='location'
          placeholder='dd/mm/yyyy'
          />
        </FormControl>

        <div>
        <Typography level='h3' component="h1" 
          sx={{ 
            mt: 4,
          }}>
          To
        </Typography>
        </div>
        <FormControl>
          <Input variant='soft' 
          name='location'
          placeholder='dd/mm/yyyy'
          />
        </FormControl>
        
        <Button variant='solid' color='#000000'
        sx={{ 
          mt: 1,
          backgroundColor: '#F98568',
          color: '#FFFFFF'
        }}>
        PLAN TRIP!
      </Button>

        </Sheet>



    </CssVarsProvider>
  )
}
export default NewTripPage