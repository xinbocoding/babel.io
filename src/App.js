import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './components/Router/PrivateRoute';
import HomePage from './components/Page/HomePage';
import SnippetsIndexPage from './components/Page/SnippetsIndexPage';
import SnippetsNewPage from './components/Page/SnippetsNewPage';
import SnippetsEditPage from './components/Page/SnippetsEditPage';
import SnippetsShowPage from './components/Page/SnippetsShowPage';
import { AuthShape } from './utils/shapes';

const App = ({ auth }) => (
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          auth.user ? <Redirect to="/snippets" /> : <HomePage />
        }
      />
      <PrivateRoute exact path="/snippets" component={SnippetsIndexPage} />
      <PrivateRoute exact path="/snippets/new" component={SnippetsNewPage} />
      <PrivateRoute
        exact
        path="/snippets/:id/edit"
        component={SnippetsEditPage}
      />
      <Route path="/snippets/:id" component={SnippetsShowPage} />
    </Switch>
  </Router>
);

App.propTypes = {
  auth: AuthShape.isRequired
};

export default connect(state => {
  return {
    auth: state.auth
  };
})(App);
