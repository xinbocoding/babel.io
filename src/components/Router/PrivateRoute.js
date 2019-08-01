import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { AuthShape } from '../../utils/shapes';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth === null ? (
        <Redirect to={{ pathname: '/' }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

// PrivateRoute.propTypes = {
//   component: PropTypes.oneOf([
//     PropTypes.func,
//     PropTypes.objectOf(React.Component)
//   ]).isRequired,
//   auth: AuthShape
// };

// PrivateRoute.defaultProps = {
//   auth: null
// };

export default PrivateRoute;
