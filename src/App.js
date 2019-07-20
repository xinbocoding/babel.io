import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SignIn from './components/auth/SignIn';
import NewSnippet from './containers/snippets/NewSnippet';

function App() {
  return (
    <React.Fragment>
      <SignIn />
      <Router>
        <Route exact path="/snippets/new" component={NewSnippet} />
      </Router>
    </React.Fragment>
  );
}

export default App;
