import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './components/layouts/HomePage';
import SnippetsPage from './components/layouts/SnippetsPage';
import SnippetsNewPage from './components/layouts/SnippetsNewPage';
import SnippetsDetailPage from './components/layouts/SnippetsDetailPage';
import SnippetsEditPage from './components/layouts/SnippetsEditPage';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/snippets" component={SnippetsPage} />
          <Route exact path="/snippets/new" component={SnippetsNewPage} />
          <Route exact path="/snippets/:id/edit" component={SnippetsEditPage} />>
          <Route path="/snippets/:id" component={SnippetsDetailPage} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
