import React from 'react';
import { Container } from '@material-ui/core';
import SnippetForm from '../snippets/SnippetForm';
import NavBar from '../NavBar';

class SnippetsNewPage extends React.Component {
  render() {
    return (
      <Container>
        <NavBar />
        <SnippetForm />
      </Container>
    );
  }
}

export default SnippetsNewPage;
