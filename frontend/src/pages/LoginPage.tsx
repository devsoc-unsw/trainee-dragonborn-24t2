import { Button, Input, Stack, Typography } from "@mui/joy"
import logo from "../assets/images./login.png"
import photo from "../assets/images/login.png"
import { Link } from "wouter"

const LoginPage = () => {
  return (
    <Stack
      height="100%"
      justifyContent="center"
      alignItems="center"
      bgcolor="#F7F8F3"
    >
      <Stack
        direction="row" 
        justifyContent="space-between"
        alignItems="center"
        gap={15} 
      >

        <Stack
          bgcolor="#f9E1D6"
          width={350}
          height={550}
          justifyContent="center"
          alignItems="center"
          gap={3}
          borderRadius={15}
          sx={{ boxShadow: "md" }}
        >
          <Stack alignItems="left" justifyContent="center" width="70%">
            <Typography level="h3" fontWeight="bold" sx={{ color: "#590000" }}>
              Login
            </Typography>
          </Stack>

          <Stack width="70%">
            <Input
              sx={{ backgroundColor: "white", color: "#737373" }}
              placeholder="Email"
              variant="soft"
            />
          </Stack>

          <Stack width="70%">
            <Input
              sx={{ backgroundColor: "white", color: "#737373" }}
              placeholder="Password"
              variant="soft"
            />
          </Stack>

          <Stack width="70%" gap={1}>
            <Button sx={{ width: "100%", backgroundColor: "#F98568" }}>
              Login
            </Button>
            <Stack alignItems="flex-end">
              <Stack direction="row" gap={0.5}>
                <Typography sx={{ color: "black" }} level="body-xs">
                  Noob?
                </Typography>
                <Typography
                  component={Link}
                  href="/register"
                  sx={{ 
                    color: "#F98568", 
                    textDecoration: "none",
                    ":hover": { textDecoration: "underline"}
                  }}
                  level="body-xs"
                  fontWeight="bold"
                >
                  Register here
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <img src={photo} alt="Login logo" height="55%" />
      </Stack>
    </Stack>
  );
};

export default LoginPage;