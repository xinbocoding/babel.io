import React from 'react';
import SignInButton from '../Auth/SignInButton';

const HomePage = () => (
  <div className="container">
    <nav className="navbar header justify-content-end">
      <ul className="nav">
        <div className="nav-item">
          <SignInButton />
        </div>
        <hr />
      </ul>
    </nav>
  </div>
);

export default HomePage;
