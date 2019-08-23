import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SnippetDetail from '../Snippet/SnippetDetail';
import Header from '../Elements/Header';
import { loadSnippetByIdAction } from '../../store/actions/snippetShowPageActions';
import { SnippetShape, MarkListShap } from '../../utils/shapes';
import '../Snippet/SnippetList.css';
import '../Snippet/SnippetForm.css';

class SnippetsShowPage extends React.Component {
  componentDidMount() {
    const { match, fetchSnippet } = this.props;
    fetchSnippet(match.params.id);
  }

  render() {
    const { snippet, marks } = this.props;
    if (snippet) {
      return (
        <React.Fragment>
          <Header />
          <div className="container">
            <div className="d-flex flex-column whitebox p-4">
              <SnippetDetail snippet={snippet} marks={marks} />
              <div className="form-group text-center">
                <Link className="btn" to="/snippets">Back</Link>
                <Link className="btn btn-primary" to={`/snippets/${snippet.id}/edit`}>Edit</Link>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return <b>loading</b>;
  }
}

SnippetsShowPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  snippet: SnippetShape,
  marks: MarkListShap,
  fetchSnippet: PropTypes.func.isRequired
};

SnippetsShowPage.defaultProps = {
  snippet: null,
  marks: []
};

const mapStateToProps = state => {
  return {
    snippet: state.snippetShowPage.snippet,
    marks: state.snippetShowPage.marks
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
