import { useState } from 'react';
import './App.css';
import { Route, Switch } from 'wouter';
import { Box } from '@mui/joy';
import LoginPage from './pages/LoginPage.tsx';
import HomePage from './pages/HomePage.tsx';
import { CssBaseline, CssVarsProvider } from '@mui/joy';
import Navbar from './components/Navbar.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import TripOverviewPage from './pages/TripOverviewPage.tsx';

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Navbar />
      <Box sx={{ pt: '60px', minHeight: '100vh', overflowY: 'auto'}}>
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/overview" component={TripOverviewPage} />
        </Switch>
      </Box>
    </CssVarsProvider>
  );
}

const LandingPage = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR.
      </p>
    </>
  );
};

export default App;
