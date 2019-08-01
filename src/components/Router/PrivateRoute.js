import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { AuthShape } from '../../utils/shapes';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.user === null ? (
        <Redirect to={{ pathname: '/' }} />
      ) : (
          <Component {...props} />
        )
    }
  />
);

export default PrivateRoute;
