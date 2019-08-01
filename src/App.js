import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PrivateRoute from './components/Router/PrivateRoute';
import HomePage from './components/Page/HomePage';
import SnippetsIndexPage from './components/Page/SnippetsIndexPage';
import SnippetsNewPage from './components/Page/SnippetsNewPage';
import SnippetsEditPage from './components/Page/SnippetsEditPage';
import SnippetsShowPage from './components/Page/SnippetsShowPage';
import { observeAuthAction } from './store/actions/authActions';
import { AuthShape } from './utils/shapes';

class App extends React.Component {
  constructor({ setupAuthObserver }) {
    super();
    setupAuthObserver();
  }

  render() {
    const { auth } = this.props;
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                auth.user !== null ? <Redirect to="/snippets" /> : <HomePage />
              }
            />
            <PrivateRoute
              exact
              path="/snippets"
              component={SnippetsIndexPage}
              auth={auth}
            />
            <PrivateRoute
              exact
              path="/snippets/new"
              component={SnippetsNewPage}
              auth={auth}
            />
            <PrivateRoute
              exact
              path="/snippets/:id/edit"
              component={SnippetsEditPage}
              auth={auth}
            />
            <Route path="/snippets/:id" component={SnippetsShowPage} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  setupAuthObserver: () => dispatch(observeAuthAction())
});

App.propTypes = {
  auth: AuthShape,
  setupAuthObserver: PropTypes.func.isRequired
};

App.defaultProps = {
  auth: null
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
