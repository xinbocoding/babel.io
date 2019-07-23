import React from 'react';
import SnippetForm from './snippets/SnippetForm';
import NavBar from './NavBar';

class SnippetsNewPage extends React.Component {
  render() {
    return <div>
      <NavBar />
      <SnippetForm />
    </div>
  }
}

export default SnippetsNewPage;
