import { useState } from 'react';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function RegisterPasswordInput() {
  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const minLength = 12;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getStrength = () => {
    return Math.min((value.length * 100) / minLength, 100);
  };

  const strength = getStrength();

  return (
    <Stack spacing={0.5} sx={{ '--hue': Math.min(value.length * 10, 120) }}>
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder="Type in here…"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        endDecorator={
          <IconButton onClick={handleClickShowPassword}>
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        }
        sx={{ backgroundColor: 'white', color: '#737373' }}
      />
      <LinearProgress
        determinate
        size="sm"
        value={strength}
        sx={{ bgcolor: 'background.level3', color: `hsl(var(--hue) 80% 40%)` }}
      />
      <Typography
        level="body-xs"
        sx={{ alignSelf: 'flex-end', color: `hsl(var(--hue) 80% 30%)` }}
      >
        {value.length < 6 && 'Invalid Password'}
        {value.length >= 6 && value.length < 8 && 'Weak'}
        {value.length >= 8 && value.length < 10 && 'Strong'}
        {value.length >= 10 && 'Very strong'}
      </Typography>
    </Stack>
  );
}