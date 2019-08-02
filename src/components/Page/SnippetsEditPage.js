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
import { SnippetShape } from '../../utils/shapes';

class SnippetsEditPage extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    this.state = { id: match.params.id };
  }

  componentDidMount() {
    const { fetchSnippet } = this.props;
    const { id } = this.state;

    fetchSnippet(id);
  }

  render() {
    const { snippet, updateSnippet, history } = this.props;
    const { id } = this.state;

    if (snippet) {
      return (
        <Container>
          <NavBar />
          <SnippetForm
            snippet={snippet}
            onSubmit={data => updateSnippet(id, data, history)}
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
  snippet: SnippetShape
};

SnippetsEditPage.defaultProps = {
  snippet: null
};

const mapStateToProps = state => {
  return {
    snippet: state.snippetEditPage.snippet
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSnippet: id => dispatch(loadSnippetForEditAction(id)),
    updateSnippet: (id, data, history) =>
      dispatch(updateSnippetAction(id, data, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnippetsEditPage);
