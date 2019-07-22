import React from 'react';
import SignIn from './auth/SignIn';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom'

class LandingPage extends React.Component {

  render() {
    if (this.props.user && this.props.user.isSignedIn == true) {
      return <Redirect to={{ pathname: '/snippets' }} />
    } else {
      return <SignIn />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser
  }
}

export default connect(mapStateToProps)(LandingPage);
