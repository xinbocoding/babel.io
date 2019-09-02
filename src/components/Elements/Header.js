import React from 'react';
import UserSignInOut from './UserSignInOut';
import './Header.css';

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light mb-5 top-nav">
      <a className="navbar-brand" href="/">
        babel.io
      </a>
      <form className="search-form mx-auto">
        <input type="text" className="form-control" placeholder="search..." />
      </form>
      <UserSignInOut />
    </header>
  );
};

export default Header;
