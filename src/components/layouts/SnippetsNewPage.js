import React from 'react';
import { Container } from '@material-ui/core';
import SnippetForm from '../snippets/SnippetForm';
import NavBar from '../NavBar';

const SnippetsNewPage = () => (
  <Container>
    <NavBar />
    <SnippetForm
      mode="javascript"
      code={`this.codeDidChange = this.codeDidChange.bind(this);
this.onSelection = this.onSelection.bind(this);
this.onHighlight = this.onHighlight.bind(this);`}
      onSubmit={() => {}}
    />
  </Container>
);

export default SnippetsNewPage;
