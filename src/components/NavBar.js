import React from 'react';
import SignInButton from './Auth/SignInButton';

const NavBar = () => {
  return (
    <ul className="nav navbar-expand-md navbar-dark bg-primary">
      <li className="nav-item">
        <SignInButton />
      </li>
    </ul>
  );
};

export default NavBar;
