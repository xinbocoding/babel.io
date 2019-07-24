import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './components/Router/PrivateRoute';
import HomePage from './components/layouts/HomePage';
import SnippetsPage from './components/layouts/SnippetsPage';
import SnippetsNewPage from './components/layouts/SnippetsNewPage';
import SnippetsEditPage from './components/layouts/SnippetsEditPage';
import SnippetsDetailPage from './components/layouts/SnippetsDetailPage';
import { connect } from 'react-redux';
import firebase from 'firebase/app';

class App extends React.Component {

  constructor(props) {
    super(props);
    firebase.auth().onAuthStateChanged((user) => {

      let data = user ? ({
        user: {
          name: user.displayName,
          id: user.uid
        }
      }) : ({
        user: null
      });

      props.dispatch({ type: 'AUTH_STATE_CHANGED', data });
      localStorage.setItem("APP_AUTH", JSON.stringify(data));
    });
  }

  render() {
    const isSignedIn = this.props.user != null;
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" render={() => {
              return isSignedIn ? (
                <Redirect to="/snippets" />
              ) : (
                  <HomePage />
                )
            }} />
            <PrivateRoute exact path="/snippets" component={SnippetsPage} user={this.props.user} />
            <Route exact path="/snippets/new" component={SnippetsNewPage} />
            <Route exact path="/snippets/:id/edit" component={SnippetsEditPage} />
            <Route path="/snippets/:id" component={SnippetsDetailPage} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
