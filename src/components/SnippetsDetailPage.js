import React from 'react';
import SnippetDetail from './snippets/SnippetDetail';

class SnippetsDetailPage extends React.Component {

  render() {
    return <div>
      <SnippetDetail snippetId={this.props.match.params.id} />
    </div>
  }
}

export default SnippetsDetailPage;
