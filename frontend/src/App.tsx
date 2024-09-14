import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'wouter';
import { CssBaseline, CssVarsProvider } from '@mui/joy';
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
import PackingListPage from './pages/PackingListPage';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [location] = useLocation();
  const firestoreInstance = getFirestore(useFirebaseApp());

  useEffect(() => { // check auth user for every routing/page
    const auth = getAuth();
    onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });
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
          <Route path="/packinglist/:tripId">
            {user ? <PackingListPage /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </FirestoreProvider>
    </CssVarsProvider>
  );
}

export default App;