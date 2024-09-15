import React, { useState } from 'react';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function LoginPasswordInput({ placeholder, value, onChange }: {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Stack spacing={0.5}>
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        endDecorator={
          <IconButton onClick={handleClickShowPassword}>
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        }
        sx={{ backgroundColor: 'white', color: '#737373' }}
      />
    </Stack>
  );
}