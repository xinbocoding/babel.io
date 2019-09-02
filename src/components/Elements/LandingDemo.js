import React, { Component } from 'react';

export default class LandingDemo extends Component {
  render() {
    return (
      <div className="text-muted">
        <div className="alert alert-danger" role="alert">
          This site is in beta. In the meantime, please report bugs
{' '}
          <a href="https://github.com/xinbocoding/babel.io/issues">here</a>
.
</div>
      </div>
    );
  }
}
