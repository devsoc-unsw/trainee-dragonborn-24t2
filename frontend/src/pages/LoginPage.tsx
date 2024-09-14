import "../styles.css";
import { Button, Input, Stack, Typography } from "@mui/joy";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useAuth } from "reactfire";
import { Link, useLocation } from "wouter";
import photo from "../assets/images/login.png";
import LoginPasswordInput from "../components/LoginPasswordInput";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const auth = useAuth();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setLoading(false);

    const user = userCredential.user;
    if (user.uid) {
      setLocation("/home");
    }
  };

  if (auth.currentUser) {
    setLocation("/home");
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
              Login
            </Typography>
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
            <LoginPasswordInput
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Stack>

          <Stack width="70%" gap={1}>
            <Button
              sx={{
                width: "100%",
                backgroundColor: "var(--primary-color)",
                ":hover": { backgroundColor: "#f5623d" },
              }}
              loading={loading}
              onClick={handleLogin}
            >
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
                    color: "var(--primary-color)",
                    textDecoration: "none",
                    ":hover": { textDecoration: "underline" },
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
        <img src={photo} alt="Login logo" height="55%"/>
      </Stack>
    </Stack>
  );
};

export default LoginPage;