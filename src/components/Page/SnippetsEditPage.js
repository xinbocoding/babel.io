import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import SnippetForm from '../Snippet/SnippetForm';
import NavBar from '../NavBar';
import {
  loadSnippetForEditAction,
  updateSnippetAction
} from '../../store/actions/snippetEditPageActions';
import { SnippetShape, MarkListShap } from '../../utils/shapes';

class SnippetsEditPage extends Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    const { match } = props;
    this.state = { id: match.params.id };
=======

    this.state = {
      id: props.match.params.id
    };
>>>>>>> 83289ccd082cf226e02e886e2b634f346d8c16dd
  }

  componentDidMount() {
    this.props.fetchSnippet(this.state.id);
  }

  render() {
    const { snippet, marks, updateSnippet, history } = this.props;
    const { id } = this.state;

    if (snippet) {
      return (
        <Container>
          <NavBar />
          <SnippetForm
            snippet={snippet}
            marks={marks}
            onSubmit={({ snippet, marks, removedMarks }) =>
              updateSnippet(id, snippet, marks, removedMarks, history)
            }
          />
          <Link to={`/snippets/${snippet.id}`}>Back</Link>
        </Container>
      );
    }
    return <div>loading</div>;
  }
}

SnippetsEditPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  fetchSnippet: PropTypes.func.isRequired,
  updateSnippet: PropTypes.func.isRequired,
  snippet: SnippetShape,
  marks: MarkListShap
};

SnippetsEditPage.defaultProps = {
  snippet: null,
  marks: []
};

const mapStateToProps = state => {
  return {
    snippet: state.snippetEditPage.snippet,
    marks: state.snippetEditPage.marks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSnippet: id => dispatch(loadSnippetForEditAction(id)),
    updateSnippet: (id, snippet, marks, removedMarks, history) =>
      dispatch(updateSnippetAction(id, snippet, marks, removedMarks, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnippetsEditPage);
