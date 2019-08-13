import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  userSignInAction,
  userSignOutAction
} from '../../store/actions/authActions';
import { AuthShape } from '../../utils/shapes';

const SignInButton = ({ auth, signOut, signIn }) => {
  if (auth.user) {
    return (
      <div className="btn-group" role="group">
        <button type="button" className="nav-btn btn-primary">
          <b>{auth.user.name}</b>
        </button>
        <button type="button" className="nav-btn btn-primary" onClick={signOut}>
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <button type="button" className="nav-btn btn-primary" onClick={signIn}>
      Sign In
    </button>
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

// need to change actions here
const mapDispatchToProps = dispatch => ({
  signIn: () => dispatch(userSignInAction()),
  signOut: () => dispatch(userSignOutAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInButton);
