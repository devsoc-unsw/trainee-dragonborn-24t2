import { Stack, Typography, Input, Button } from '@mui/joy';
import '../styles.css';
import { Link, useLocation } from 'wouter';
import React, { useState } from 'react';
import photo from "../assets/images/login.png";
import { createUser } from '../firebase';
import { useFirestore } from 'reactfire';
import { useLocalStorage } from 'usehooks-ts';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import RegisterPasswordInput from '../components/RegisterPasswordInput';



const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authUser, setAuthUser] = useLocalStorage("auth-user", "");
  const [, setLocation] = useLocation();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const firestore = useFirestore();
  const auth = getAuth();
  const handleRegister = async () => {
    // create firebase auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // create User docu
    if (user.email && user.uid) { // ensures actual created
      await createUser(firestore, {
        email: user.email,
        name,
      }, user.uid);
    }
    setAuthUser(user.uid);
    setLocation('/home');
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
            <RegisterPasswordInput
              placeholder="Password"
              value={password}
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
                onClick={handleRegister}
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
                  href="/login"
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