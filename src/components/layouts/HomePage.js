import React from 'react';
import SignIn from '../auth/SignIn';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

class HomePage extends React.Component {

  render() {
    if (this.props.user && this.props.user.isSignedIn) {
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

export default connect(mapStateToProps)(HomePage);
