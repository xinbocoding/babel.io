import React from 'react';
import SnippetDetail from '../snippets/SnippetDetail';
import { Container } from '@material-ui/core';
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
