import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  userSignInAction,
  userSignOutAction
} from '../../store/actions/authActions';
import { AuthShape } from '../../utils/shapes';

const UserSignInOut = ({ auth, signOut, signIn }) => {
  if (auth.user) {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">{auth.user.name}</a>
        </li>
        <li className="nav-item">
          <button type="button" className="btn" onClick={signOut}>
            Sign Out
        </button>
        </li>
      </ul>
    );
  }
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <button type="button" className="btn btn-primary sign-in-button" onClick={signIn}>
          Sign In with Github
        </button>
      </li>
    </ul>
  );
};

UserSignInOut.propTypes = {
  auth: AuthShape,
  signOut: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired
};

UserSignInOut.defaultProps = {
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
)(UserSignInOut);
