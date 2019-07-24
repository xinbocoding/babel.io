import React from 'react';
import { Container } from '@material-ui/core';
import SnippetForm from '../snippets/SnippetForm';
import NavBar from '../NavBar';

class SnippetsEditPage extends React.Component {
  render() {
    return (
      <Container>
        <NavBar />
        <SnippetForm />
      </Container>
    );
  }
}

export default SnippetsEditPage;
