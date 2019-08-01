import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import {
  userSignInAction,
  userSignOutAction
} from '../../store/actions/authActions';
import { AuthShape } from '../../utils/shapes';

const SignInButton = ({ auth, signOut, signIn }) => {
  if (auth) {
    return (
      <React.Fragment>
        <Button edge="end" color="inherit">
          <b>{auth.name}</b>
        </Button>
        <Button color="inherit" onClick={signOut}>
          Sign Out
        </Button>
      </React.Fragment>
    );
  }

  return (
    <Button color="inherit" onClick={signIn}>
      Sign In
    </Button>
  );
};

SignInButton.propTypes = {
  auth: AuthShape,
  signOut: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired
};

SignInButton.defaultProps = {
  auth: null
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  signIn: () => dispatch(userSignInAction()),
  signOut: () => dispatch(userSignOutAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInButton);
