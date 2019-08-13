import React from 'react';
import SignInButton from './Auth/SignInButton';
import './Navbar.css';

const NavBar = () => {
  return (
    <div className="container">
      <nav className="navbar header justify-content-end">
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <SignInButton />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
