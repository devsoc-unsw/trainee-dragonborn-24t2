import viteLogo from "/vite.svg";
import "./App.css";
import { Button, CssBaseline, CssVarsProvider } from "@mui/joy";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";
import { FirestoreProvider, useFirebaseApp, } from "reactfire";
import { Route, Switch } from "wouter";
import reactLogo from "./assets/react.svg";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());
  return (
    <CssVarsProvider>
      <CssBaseline/>
      <FirestoreProvider sdk={firestoreInstance}>
        <Switch>
          <Route path="/" component={LandingPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/home" component={HomePage}/>
        </Switch>
      </FirestoreProvider>
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

export default App;
