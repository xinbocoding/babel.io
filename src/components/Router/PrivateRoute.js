import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AuthShape } from '../../data/shapes';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth.user ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

PrivateRoute.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  auth: AuthShape.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
