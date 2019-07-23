import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './components/layouts/HomePage';
import SnippetsIndexPage from './components/layouts/SnippetsIndexPage';
import SnippetsNewPage from './components/layouts/SnippetsNewPage';
import SnippetsDetailPage from './components/layouts/SnippetsDetailPage';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/snippets" component={SnippetsIndexPage} />
          <Route exact path="/snippets/new" component={SnippetsNewPage} />
          <Route path="/snippets/:id" component={SnippetsDetailPage} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
