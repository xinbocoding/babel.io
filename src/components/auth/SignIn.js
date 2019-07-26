import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { userSignInAction, userSignOutAction } from '../../actions/users';

class SignIn extends Component {
  render() {
    if (this.props.user) {
      return (
        <React.Fragment>
          <Button edge="end" color="inherit">
            {this.props.user.name}
          </Button>
          <Button color="inherit" onClick={this.props.signOut}>
            Sign Out
          </Button>
        </React.Fragment>
      );
    }
    return (
      <Button color="inherit" onClick={this.props.signIn}>
        Sign In
      </Button>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = () => ({
  signIn: userSignInAction,
  signOut: userSignOutAction
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
