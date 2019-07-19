import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignIn from './components/auth/SignIn';

import NewSnippet from './containers/snippets/NewSnippet';

function App() {
  return (
    <React.Fragment>
      {/* <header className="App-header">
          {firebase => <SignIn firebase={firebase} />}

      </header> */}
      <Router>
        <Route exact path="/snippets/new" component={NewSnippet}/>
      </Router>
    </React.Fragment>
  );
}

export default App;
