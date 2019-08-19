import React, { Component } from 'react';
import './LandingSlogan.css';

export default class LandingSlogan extends Component {
  render() {
    return (
      <div className="landing-slogan">
        <h1>Annotate Your Code Snippets</h1>
        <div className="text-muted">collect, organize, and annotate<br /> valuable code snippets</div>
      </div>
    )
  }
}
