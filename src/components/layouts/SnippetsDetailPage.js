import React from 'react';
import { Container } from '@material-ui/core';
import SnippetDetail from '../snippets/SnippetDetail';
import NavBar from '../NavBar';

class SnippetsDetailPage extends React.Component {
  render() {
    return (
      <Container>
        <NavBar />
        <SnippetDetail snippetId={this.props.match.params.id} />
      </Container>
    );
  }
}

export default SnippetsDetailPage;
