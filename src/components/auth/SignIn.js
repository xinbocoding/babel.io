import React, { Component } from 'react';
import { auth } from 'firebase';
import { connect } from 'react-redux';
import { userSignInAction, userSignOutAction } from '../../actions/users';

class SignIn extends Component {

  render() {
    if (this.props.user.isSignedIn === true) {
      return (
        <React.Fragment>
          <a href="#" onClick={this.props.signOut}>Sign Out</a>
        </React.Fragment>
      );
    }

    return <a href="#" onClick={this.props.signIn}>Sign In</a>;
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: () => dispatch(userSignInAction()),
    signOut: () => dispatch(userSignOutAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
