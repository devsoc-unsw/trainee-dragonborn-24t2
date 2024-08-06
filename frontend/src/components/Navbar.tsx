import { Link } from 'wouter';
import './Navbar.css';

// import * as React from 'react';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import IconButton from '@mui/joy/IconButton';
import Notifications from '@mui/icons-material/Notifications';
import Person from '@mui/icons-material/Person';
import Home from '@mui/icons-material/Home';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">TravelSite(logo)</Link>
        <ul className="navbar-menu">
          <li>
            <Link href="/home" className="navbar-item">
              <IconButton>
                <Home className="navbar-icon" />
              </IconButton>
            </Link>
          </li>
          <li>
            <Link href="/friends" className="navbar-item">
              <IconButton>
                <Person className="navbar-icon" />
              </IconButton>
            </Link>
          </li>
          <li className="navbar-item">
            <IconButton>
              <Notifications className="navbar-icon" />
            </IconButton>
            <div className="navbar-dropdown-menu">
              <Menu>
                <MenuItem>No notifications yet</MenuItem>
              </Menu>
            </div>
          </li>
          <li className="navbar-item">
            <IconButton>
              <Person className="navbar-icon"/>
            </IconButton>
            <div className="navbar-dropdown-menu">
              <Menu>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
              </Menu>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
