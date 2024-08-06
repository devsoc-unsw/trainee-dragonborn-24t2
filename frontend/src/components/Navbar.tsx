import './Navbar.css';
import { Link } from 'wouter';

import * as React from 'react';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import IconButton from '@mui/joy/IconButton';
import Notifications from '@mui/icons-material/Notifications';
import Person from '@mui/icons-material/Person';
import Home from '@mui/icons-material/Home';

const Navbar = () => {
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-item">TravelSite(logo)</Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link href="/home">
              <IconButton>
                <Home className="navbar-icon" />
              </IconButton>
            </Link>
          </li>
          <li className="navbar-item">
            <Link href="/friends">
              <IconButton>
                <Person className="navbar-icon" />
              </IconButton>
            </Link>
          </li>
          <li className="navbar-item">
            <IconButton
              onMouseEnter={() => setNotificationOpen(true)}
              onMouseLeave={() => setNotificationOpen(false)}
            >
              <Notifications className="navbar-icon" />
            </IconButton>
            <div className='navbar-dropdown-menu'>
              <Menu open={notificationOpen}>
                <MenuItem>No notifications yet</MenuItem>
              </Menu>
            </div>
          </li>
          <li className="navbar-item">
            <IconButton
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <Person className="navbar-icon" />
            </IconButton>
            <div className='navbar-dropdown-menu'>
              <Menu open={profileOpen}>
                <MenuItem>Edit Profile</MenuItem>
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
