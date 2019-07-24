import React from 'react';
import { Container } from '@material-ui/core';
import SnippetForm from '../snippets/SnippetForm';
import NavBar from '../NavBar';

const SnippetsNewPage = () => (
  <Container>
    <NavBar />
    <SnippetForm />
  </Container>
);


export default SnippetsNewPage;
