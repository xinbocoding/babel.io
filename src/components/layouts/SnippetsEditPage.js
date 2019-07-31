import React from 'react';
import { Container } from '@material-ui/core';
import SnippetForm from '../snippets/SnippetForm';
import NavBar from '../NavBar';
import { connect } from 'react-redux';
import { loadSnippetAction } from '../../actions/snippets';

class SnippetsEditPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
    };
  }

  componentWillMount() {
    const { snapshots } = this.props;
    if (snapshots[this.state.id] === undefined) {
      this.props.loadSnippet(this.state.id);
    }
  }

  render() {
    const { snapshots } = this.props;
    const snippet = snapshots[this.state.id];

    if (snippet) {
      return (
        <Container>
          <NavBar />
          <SnippetForm
            mode={snippet.mode}
            code={snippet.code}
            annotations={snippet.annotations}
            onSubmit={() => { }}
          />
        </Container>
      );
    } else {
      return <div>loading</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    snapshots: state.snippetSnapshots
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSnippet: (id) => dispatch(loadSnippetAction(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippetsEditPage);
