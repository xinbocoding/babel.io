import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Elements/Header';
import { fetchSnippetsAction } from '../../store/actions/snippetIndexPageActions';
import SnippetList from '../Snippet/SnippetList';
import { AuthShape, SnippetShape } from '../../utils/shapes';
import SearchBar from '../Elements/SearchBar';
import './SnippetsIndexPage.css';

class SnippetsIndexPage extends React.Component {
  constructor(props) {
    super(props);

    const { auth, snippetsByPage, fetchSnippets } = this.props;

    // load the first page if not loaded yet
    if (snippetsByPage.length === 0) {
      fetchSnippets(auth.user.id);
    }

    this.state = {
      currentPage: 1
    };
  }

  previousPage() {
    const { currentPage } = this.state;
    const previousPage = currentPage - 1;

    this.setState({ currentPage: previousPage });
    window.scrollTo(0, 0);
  }

  nextPage() {
    const {
      auth,
      fetchSnippets,
      snippetsByPage,
      lastVisibleByPage
    } = this.props;
    const { currentPage } = this.state;
    const nextPage = currentPage + 1;

    this.setState({ currentPage: nextPage });

    if (!snippetsByPage[nextPage - 1]) {
      fetchSnippets(auth.user.id, lastVisibleByPage[currentPage - 1]);
    }
    window.scrollTo(0, 0);
  }

  shouldPreviousPageDisabled() {
    const { currentPage } = this.state;
    return currentPage === 1;
  }

  shouldNextPageDisabled() {
    const { currentPage } = this.state;
    const { snippetsByPage } = this.props;

    return snippetsByPage[currentPage - 1].length < 10;
  }

  render() {
    const { snippetsByPage } = this.props;
    const { currentPage } = this.state;

    const snippets = snippetsByPage[currentPage - 1];

    if (snippets) {
      return (
        <React.Fragment>
          <Header />
          <div className="container">
            <div className="d-flex flex-row whitebox index-toolbar">
              <div className="col-md-10">{/* <SearchBar /> */}</div>
              <div className="col-md-2 text-right">
                <Link to="/snippets/new" className="btn btn-primary btn-block">
                  New Snippet
                </Link>
              </div>
            </div>
          </div>
          <SnippetList snippets={snippets} />
          <div className="container">
            <div className="row text-center">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={this.shouldPreviousPageDisabled()}
                  onClick={() => this.previousPage()}
                >
                  Newer
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={this.shouldNextPageDisabled()}
                  onClick={() => this.nextPage()}
                >
                  Older
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return (
      <div>
        <Link to="/snippets/new">New Snippet</Link>
      </div>
    );
  }
}

SnippetsIndexPage.propTypes = {
  auth: AuthShape.isRequired,
  snippetsByPage: PropTypes.arrayOf(PropTypes.arrayOf(SnippetShape)).isRequired,
  lastVisibleByPage: PropTypes.arrayOf(SnippetShape).isRequired,
  fetchSnippets: PropTypes.func.isRequired
};

SnippetsIndexPage.defaultProps = {};

const mapStateToProps = state => {
  const {
    snippetsByPage,
    currentPage,
    lastVisibleByPage
  } = state.snippetIndexPage;
  return {
    auth: state.auth,
    snippetsByPage,
    currentPage,
    lastVisibleByPage
  };
};

const mapDispatchToProps = dispatch => ({
  fetchSnippets: (userId, startAfter) => {
    dispatch(fetchSnippetsAction(userId, startAfter));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnippetsIndexPage);
