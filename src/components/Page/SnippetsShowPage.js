import React from 'react';
import { Container } from '@material-ui/core';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SnippetDetail from '../Snippet/SnippetDetail';
import NavBar from '../NavBar';
import { loadSnippetByIdAction } from '../../store/actions/snippetShowPageActions';
import { SnippetShape } from '../../utils/shapes';

class SnippetsShowPage extends React.Component {
  componentDidMount() {
    const { match, fetchSnippet } = this.props;
    fetchSnippet(match.params.id);
  }

  render() {
    const { snippet } = this.props;
    if (snippet) {
      return (
        <Container>
          <NavBar />
          <SnippetDetail snippet={snippet} />
          <Link to={`/snippets/${snippet.id}/edit`}>Edit</Link>
          <Link to="/snippets">Back</Link>
        </Container>
      );
    }
    return <b>loading</b>;
  }
}

SnippetsShowPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  snippet: SnippetShape,
  fetchSnippet: PropTypes.func.isRequired
};

SnippetsShowPage.defaultProps = {
  snippet: null
};

const mapStateToProps = state => {
  return {
    snippet: state.snippetShowPage.snippet
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSnippet: id => dispatch(loadSnippetByIdAction(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnippetsShowPage);
