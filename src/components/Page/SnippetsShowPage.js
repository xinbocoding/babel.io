import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SnippetDetail from '../Snippet/SnippetDetail';
import NavBar from '../NavBar';
import { loadSnippetByIdAction } from '../../store/actions/snippetShowPageActions';
import { SnippetShape, MarkListShap } from '../../utils/shapes';
// import './SnippetsShowPage.css';
import '../Snippet/SnippetList.css';

class SnippetsShowPage extends React.Component {
  componentDidMount() {
    const { match, fetchSnippet } = this.props;
    fetchSnippet(match.params.id);
  }

  render() {
    const { snippet, marks } = this.props;
    if (snippet) {
      return (
        <div className="container">
          <NavBar />
          <SnippetDetail snippet={snippet} marks={marks} />
          <div className="container">
            <div className="row justify-content-end">
              <div className="col-auto editlink showPageCol">
                <button type="button" className="btn-edit">
                  <Link className="edit showPageEdit" to={`/snippets/${snippet.id}/edit`}>Edit</Link>
                </button>
              </div>
              <div className="col-auto editlink showPageCol">
                <button className="btn-edit">
                  <Link className="edit showPageBack" to="/snippets">Back</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
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
