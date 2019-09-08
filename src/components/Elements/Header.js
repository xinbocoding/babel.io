import React from 'react';
import UserSignInOut from './UserSignInOut';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light mb-5 top-nav">
      <Link to="/" className="navbar-brand">
        babel.io
      </Link>
      <form className="search-form mx-auto">
        {/* <input type="text" className="form-control" placeholder="search..." /> */}
      </form>
      <UserSignInOut />
    </header>
  );
};

export default Header;
