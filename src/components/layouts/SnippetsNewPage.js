import React from 'react';
import { Container } from '@material-ui/core';
import SnippetForm from '../snippets/SnippetForm';
import NavBar from '../NavBar';
import { connect } from 'react-redux';
import { createSnippetAction } from '../../actions/snippets';

class SnippetsNewPage extends React.Component {
  render() {
    return (
      <Container>
        <NavBar />
        <SnippetForm
          mode="javascript"
          code={`this.codeDidChange = this.codeDidChange.bind(this);
    this.onSelection = this.onSelection.bind(this);
    this.onHighlight = this.onHighlight.bind(this);`}
          onSubmit={(code, mode, annotations) => this.props.createSnippetAction(code, mode, annotations)}
        />
      </Container>
    )
  }
};

const mapStateToProps = () => {
  return {};
}

const mapDispatchToProps = () => ({
  createSnippetAction: (code, mode, annotations) => {
    createSnippetAction(code, mode, annotations)
    console.log(annotations)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SnippetsNewPage);
