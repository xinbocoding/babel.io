import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  userSignInAction,
  userSignOutAction
} from '../../store/actions/authActions';
import { AuthShape } from '../../data/shapes';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.error("TODO");
}

const UserSignInOut = ({ auth, signOut, signIn }) => {
  if (auth.user) {
    return (
      <ul className="navbar-nav">
        <Link to="/new" className="btn btn-primary mr-3">
          New Snippet
        </Link>
        <span className="navbar-text">{auth.user.name}</span>
        <li className="nav-item">
          <button type="button" className="btn" onClick={signOut}>
            Sign Out
          </button>
        </li>
      </ul>
    );
  }
  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={({ tokenId }) => signIn(tokenId)}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
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
  signIn: (token) => dispatch(userSignInAction(token)),
  signOut: () => dispatch(userSignOutAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSignInOut);
