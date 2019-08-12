import React from 'react';
import SignInButton from '../Auth/SignInButton';

const HomePage = () => (
  <div className="nav navbar-expand-md navbar-dark bg-primary sticky-top">
    <div className="nav-item ">
      <SignInButton />
    </div>
  </div>
);

export default HomePage;
