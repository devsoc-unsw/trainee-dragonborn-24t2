import viteLogo from "/vite.svg";
import "./App.css";
import { Box, Button, CssBaseline, CssVarsProvider } from "@mui/joy";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";
import { FirestoreProvider, useFirebaseApp, } from "reactfire";
import { Route, Switch } from "wouter";
import reactLogo from "./assets/react.svg";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage.tsx";
import TripOverviewPage from "./pages/TripOverviewPage.tsx";

function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());
  return (
    <CssVarsProvider>
      <CssBaseline/>
      <Navbar />
      <Box sx={{ pt: '60px', minHeight: '100vh', overflowY: 'auto'}}>
        <FirestoreProvider sdk={firestoreInstance}>
        <Switch>
            <Route path="/" component={LandingPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/home" component={HomePage}/>
          <Route path="/profile" component={ProfilePage} />
          <Route path="/overview" component={TripOverviewPage} />
          </Switch>
        </FirestoreProvider>
      </Box>
    </CssVarsProvider>
  );
}

const LandingPage = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button variant="solid">Hello world</Button>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo"/>
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo"/>
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;;
