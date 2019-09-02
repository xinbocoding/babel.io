import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './components/Router/PrivateRoute';
import HomePage from './components/Page/HomePage';
import SnippetsIndexPage from './components/Page/SnippetsIndexPage';
import SnippetsNewPage from './components/Page/SnippetsNewPage';
import SnippetsEditPage from './components/Page/SnippetsEditPage';
import SnippetsShowPage from './components/Page/SnippetsShowPage';
import { AuthShape } from './data/shapes';

const App = ({ auth }) => (
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (auth.user ? <Redirect to="/snippets" /> : <HomePage />)}
      />
      <PrivateRoute exact path="/snippets" component={SnippetsIndexPage} />
      <PrivateRoute exact path="/new" component={SnippetsNewPage} />
      <PrivateRoute
        exact
        path="/edit/:id"
        component={SnippetsEditPage}
      />
      <Route path="/s/:id" component={SnippetsShowPage} />
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
