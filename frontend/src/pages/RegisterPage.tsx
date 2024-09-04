import { Stack, Typography, Input, Button } from '@mui/joy';
import '../styles.css';
import { Link } from 'wouter';  
import React, { useState } from 'react';
import photo from "../assets/images/login.png";

const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleClick = () => {
    console.log(`Name is ${name}, Email is ${email}, Password is ${password}`)
  }

  return (
    <Stack
      height="100%"
      justifyContent="center"
      alignItems="center"
      bgcolor="var(--background-color)"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={15}
      >
        <Stack
          bgcolor="var(--secondary-color)"
          width={350}
          height={550}
          justifyContent="center"
          alignItems="center"
          gap={3}
          borderRadius={15}
          sx={{ boxShadow: "lg" }}
        >
          <Stack alignItems="left" justifyContent="center" width="70%">
            <Typography
              level="h3"
              fontWeight="bold"
              sx={{ color: "var(--tertiary-color)" }}
            >
              Sign Up 
            </Typography>
          </Stack>

          <Stack width="70%">
            <Input
              sx={{ backgroundColor: "white", color: "#737373" }}
              placeholder="Name"
              variant="soft"
              onChange={handleNameChange}
            />
          </Stack>

          <Stack width="70%">
            <Input
              sx={{ backgroundColor: "white", color: "#737373" }}
              placeholder="Email"
              variant="soft"
              onChange={handleEmailChange}
            />
          </Stack>

          <Stack width="70%">
            <Input
              sx={{ backgroundColor: "white", color: "#737373" }}
              placeholder="Password"
              variant="soft"
              onChange={handlePasswordChange}
            />
          </Stack>

          <Stack width="70%" gap={1}>
            <Link href="/home">
              <Button
                sx={{
                  width: "100%",
                  backgroundColor: "var(--primary-color)",
                  ":hover": { backgroundColor: "#f5623d" },
                }}
                onClick={handleClick}
              >
                Sign up
              </Button>
            </Link>

            <Stack alignItems="flex-end">
              <Stack direction="row" gap={0.5}>
                <Typography sx={{ color: "black" }} level="body-xs">
                  Already have an account?
                </Typography>
                <Typography
                  component={Link}
                  href="/register"
                  sx={{
                    color: "var(--primary-color)",
                    textDecoration: "none",
                    ":hover": { textDecoration: "underline" },
                  }}
                  level="body-xs"
                  fontWeight="bold"
                >
                  Login here
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <img src={photo} alt="Login logo" height="55%" />
      </Stack>
    </Stack>
  );
}

export default RegisterPage;