import { Stack, Typography, Input, Button } from '@mui/joy';
import '../styles.css';

const RegisterPage = () => {
  return (
    <Stack 
      height="100%" 
      justifyContent="center" 
      alignItems="center" 
      bgcolor="var(--background-color)"
    >
      <Stack
        bgcolor="var(--secondary-color)"
        width={600}
        height={450}
        justifyContent="center"
        alignItems="center"
        borderRadius={15}
        sx={{ boxShadow: "lg" }}
        gap={5}
      >
        <Typography 
          level="h3" 
          fontWeight="bold" 
          sx={{ color: "var(--tertiary-color)" }}
        >
          Create Account
        </Typography>

        <Stack gap={2}>
          <Input
            sx={{ backgroundColor: "white", color: "#737373" }}
            placeholder="Name"
            variant="soft"
          />
          
          <Input
            sx={{ backgroundColor: "white", color: "#737373" }}
            placeholder="Email"
            variant="soft"
          />
          
          <Input
            sx={{ backgroundColor: "white", color: "#737373" }}
            placeholder="Password"
            variant="soft"
          />

          <a href="/home">
            <Button 
              sx={{ 
                width: "100%", 
                backgroundColor: "var(--primary-color)", 
                ":hover": { backgroundColor: "#f5623d" }
              }}
            >
              Sign up
            </Button>
          </a>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default RegisterPage;
