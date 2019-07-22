import React from 'react';
import SignIn from './auth/SignIn';

class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Logo</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html">JavaScript</a></li>
            <li><SignIn /></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar;
