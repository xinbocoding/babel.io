import React from 'react';
import SignInButton from './Auth/SignInButton';

const NavBar = () => {
  return (
    <ul class="nav nav-pills">
      <li class="nav-item">
        <SignInButton />
      </li>
    </ul>
  );
};

export default NavBar;
