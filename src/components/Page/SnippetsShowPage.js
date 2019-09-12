import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../Elements/Header';
import { loadSnippetByIdAction } from '../../store/actions/snippetShowPageActions';
import { MarkListShape, SnippetShape } from '../../data/shapes';
import '../Snippet/SnippetList.css';
import '../Snippet/SnippetForm.css';
import CodeViewer from '../Elements/CodeViewer';

class SnippetsShowPage extends React.Component {
  componentDidMount() {
    const { match, fetchSnippet } = this.props;
    fetchSnippet(match.params.id);
  }

  render() {
    const { snippet, marks, users } = this.props;
    if (snippet) {
      let userName = '';
      if (users[snippet.userId]) {
        userName = users[snippet.userId].displayName
      }
      return (
        <React.Fragment>
          <Header />
          <div className="container whitebox snippet">
            <div className="row snippet-header">
              <div className="col-md-8 align-self-center">
                <h1 className="snippet-title">{snippet.title}</h1>
              </div>
              <div className="col-md-4 snippet-head">{userName}</div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="snippet-code">
                  <CodeViewer code={snippet.code} marks={marks} />
                </div>
              </div>
              <div className="col-md-4 note-body">
                <div className="snippet-note">{snippet.note}</div>
                <section className="snippet-actions">
                  <Link className="btn" to={`/edit/${snippet.id}`}>
                    <i className="fal fa-edit" />
                  </Link>
                </section>
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
  marks: MarkListShape,
  fetchSnippet: PropTypes.func.isRequired,
  users: PropTypes.any
};

SnippetsShowPage.defaultProps = {
  snippet: null,
  marks: []
};

const mapStateToProps = state => {
  return {
    snippet: state.snippetShowPage.snippet,
    marks: state.snippetShowPage.marks,
    users: state.user
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
