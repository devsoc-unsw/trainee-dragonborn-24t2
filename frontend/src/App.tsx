import { useState } from 'react'
import './App.css'
import { Route, Switch, useLocation } from 'wouter';
import LoginPage from './pages/LoginPage.tsx';
import HomePage from './pages/HomePage.tsx';
import { Button, CssBaseline, CssVarsProvider } from '@mui/joy';
import RegisterPage from './pages/RegisterPage.tsx';
import Navbar from './components/Navbar.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import NewTripPage from './pages/NewTripPage.tsx';
import TripOverviewPage from './pages/TripOverviewPage.tsx';
import PackingListPage from './pages/PackingListPage.tsx';
import ItineraryPage from './pages/Itinerarypage.tsx';

function App() {
  const [location] = useLocation();
  return (
    <CssVarsProvider>
      <CssBaseline />
      {location !== '/login' && location !== '/register' && location !== '/newtrip' && <Navbar />}
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/newtrip" component={NewTripPage} />
        <Route path="/tripoverview" component={TripOverviewPage} />
        <Route path="/packinglist" component={PackingListPage} />
        <Route path="/itinerary" component={ItineraryPage} />
      </Switch>
    </CssVarsProvider>
  );
}

const LandingPage = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button variant="solid">Click for travel site :O</Button>
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
  )
}

export default App
