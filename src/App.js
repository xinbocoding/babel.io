import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import SnippetsIndexPage from './components/SnippetsIndexPage';
import SnippetsNewPage from './components/SnippetsNewPage';
import SnippetsDetailPage from './components/SnippetsDetailPage';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/snippets" component={SnippetsIndexPage} />
          <Route exact path="/snippets/new" component={SnippetsNewPage} />
          <Route path="/snippets/:id" component={SnippetsDetailPage} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
