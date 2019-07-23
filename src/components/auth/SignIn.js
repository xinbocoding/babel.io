import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userSignInAction, userSignOutAction } from '../../actions/users';
import Button from '@material-ui/core/Button';

class SignIn extends Component {

  render() {
    if (this.props.user.isSignedIn === true) {
      return (
        <React.Fragment>
          <Button edge="end" color="inherit">{this.props.user.name}</Button>
          <Button color="inherit" onClick={this.props.signOut}>Sign Out</Button>
        </React.Fragment>
      );
    } else {
      return <Button color="inherit" onClick={this.props.signIn}>Sign In</Button>;
    }
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
