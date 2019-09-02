import React from 'react';
import Header from '../Elements/Header';
import LandingSlogan from '../Elements/LandingSlogan';
import LandingDemo from '../Elements/LandingDemo';

const HomePage = () => (
  <React.Fragment>
    <Header />
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <LandingSlogan />
        </div>
        <div className="col-md-8 col-sm-12">
          <LandingDemo />
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default HomePage;
