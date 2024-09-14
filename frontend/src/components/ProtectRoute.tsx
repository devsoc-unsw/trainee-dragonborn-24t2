import { CircularProgress, Stack } from "@mui/joy";
import React from "react";
import { useUser } from "reactfire";
import { Redirect } from "wouter";
import Navbar from "./Navbar.tsx";


const ProtectRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { status, data: authUser } = useUser();

  if (status !== "success") {
    return <Stack width="100%" height="100%" alignItems="center" justifyContent="center">
      <CircularProgress size="lg"/>
    </Stack>
  }

  return authUser ? <>
    <Navbar/>
    {children}
  </> : <Redirect to="/login"/>;
}

export default ProtectRoute;