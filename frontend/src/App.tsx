import { useState } from 'react'
import './App.css'
import { Link, Route, Switch, useLocation } from 'wouter';
import LoginPage from './pages/LoginPage.tsx';
import HomePage from './pages/HomePage.tsx';
import { Button, CssBaseline, CssVarsProvider } from '@mui/joy';
import RegisterPage from './pages/RegisterPage.tsx';
import Navbar from './components/Navbar.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import NewTripPage from './pages/NewTripPage.tsx';
import TripOverviewPage from './pages/TripOverviewPage.tsx';
import EditProfilePage from './pages/EditProfilePage.tsx';
import { getFirestore } from 'firebase/firestore';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';


function App() {
  const [location] = useLocation();
  const firestoreInstance = getFirestore(useFirebaseApp());

  return (
    <CssVarsProvider>
      <CssBaseline/>
        <FirestoreProvider sdk={firestoreInstance}>
          {location !== '/login' && location !== '/register' && <Navbar />}
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/editprofile" component={EditProfilePage} />
            <Route path="/newtrip" component={NewTripPage} />
            <Route path="/tripoverview/:tripId" component={TripOverviewPage} />
          </Switch>
        </FirestoreProvider>
    </CssVarsProvider>
  );
}

const LandingPage = () => {
  const [count, setCount] = useState(0);

  return (
    <>
    <Link href='/login'>
      <Button variant="solid">Click for travel site :O</Button>
    </Link>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
};

export default App;