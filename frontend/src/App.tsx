import { useState } from 'react'
import './App.css'
import { Route, Switch } from 'wouter';
import LoginPage from './pages/LoginPage.tsx';
import HomePage from './pages/HomePage.tsx';
import { Button, CssBaseline, CssVarsProvider } from '@mui/joy';
import Navbar from './components/Navbar.tsx';
import ProfilePage from './pages/ProfilePage.tsx';

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Navbar />
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/profile" component={ProfilePage} />
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
