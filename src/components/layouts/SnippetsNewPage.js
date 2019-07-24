import React from 'react';
import SnippetForm from '../snippets/SnippetForm';
import NavBar from '../NavBar';
import { Container } from '@material-ui/core';

class SnippetsNewPage extends React.Component {
  render() {
    return (
      <Container>
        <NavBar/>
        <SnippetForm/>
      </Container>
    );
  }
}

export default SnippetsNewPage;
