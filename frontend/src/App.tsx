import './App.css'
import { useState, useEffect } from 'react';
import { Link, Route, Switch, Redirect, useLocation } from 'wouter';
import { Button, CssBaseline, CssVarsProvider } from '@mui/joy';
import { getFirestore } from 'firebase/firestore';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import NewTripPage from './pages/NewTripPage';
import TripOverviewPage from './pages/TripOverviewPage';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [location] = useLocation();
  const firestoreInstance = getFirestore(useFirebaseApp());

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    }) // subscribe to auth statge changed
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Page coming right up :P</div>;
  }

  return (
    <CssVarsProvider>
      <CssBaseline />
      <FirestoreProvider sdk={firestoreInstance}>
        {location !== '/login' && location !== '/register' && location !== '/newtrip' && <Navbar />}
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/home">
            {user ? <HomePage /> : <Redirect to="/login" />}
          </Route>
          <Route path="/profile">
            {user ? <ProfilePage /> : <Redirect to="/login" />}
          </Route>
          <Route path="/editprofile">
            {user ? <EditProfilePage /> : <Redirect to="/login" />}
          </Route>
          <Route path="/newtrip">
            {user ? <NewTripPage /> : <Redirect to="/login" />}
          </Route>
          <Route path="/tripoverview/:tripId">
            {user ? <TripOverviewPage /> : <Redirect to="/login" />}
          </Route>
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