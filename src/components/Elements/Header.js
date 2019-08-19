import React from 'react';
import UserSignInOut from './UserSignInOut';
import Logo from './Logo';
import './Header.css';

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light mb-5 top-nav">
      <a className="navbar-brand mr-auto" href="/">babel.io</a>
      <UserSignInOut />
    </header>
  );
};

export default Header;
