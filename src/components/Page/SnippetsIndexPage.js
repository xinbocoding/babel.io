import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Elements/Header';
import {
  loadSnippetPageAction,
  deleteSnippetAction
} from '../../store/actions/snippetIndexPageActions';
import SnippetList from '../Snippet/SnippetList';
import { AuthShape, SnippetShape } from '../../data/shapes';
import './SnippetsIndexPage.css';

class SnippetsIndexPage extends React.Component {
  constructor(props) {
    super(props);
    const { auth, loadPage } = this.props;
    loadPage(auth.user.id, 1);
  }

  previousPage() {
    const { currentPage } = this.state;
    const previousPage = currentPage - 1;

    this.setState({ currentPage: previousPage });
    window.scrollTo(0, 0);
  }

  nextPage() {
    const { auth, loadPage, snippetsByPage } = this.props;
    const { currentPage } = this.props;
    const nextPage = currentPage + 1;

    if (!snippetsByPage[nextPage]) {
      loadPage(auth.user.id, snippetsByPage[currentPage][-1]);
    }
    window.scrollTo(0, 0);
  }

  shouldPreviousPageDisabled() {
    return this.props.currentPage === 1;
  }

  shouldNextPageDisabled() {
    const { snippetsByPage, currentPage } = this.props;

    return snippetsByPage[currentPage].length < 10;
  }

  onSnippetDelete(id) {
    this.props.deleteSnippet(id);
  }

  render() {
    const { snippetsByPage, currentPage } = this.props;

    const snippets = snippetsByPage[currentPage];

    if (snippets) {
      return (
        <React.Fragment>
          <Header />
          <SnippetList
            snippets={snippets}
            onDelete={id => this.onSnippetDelete(id)}
          />
          <div className="container">
            <div className="row justify-content-center text-center">
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
        <Link to="/new">New Snippet</Link>
      </div>
    );
  }
}

SnippetsIndexPage.propTypes = {
  auth: AuthShape.isRequired,
  currentPage: PropTypes.number.isRequired,
  snippetsByPage: PropTypes.arrayOf(PropTypes.arrayOf(SnippetShape)).isRequired,
  loadPage: PropTypes.func.isRequired,
  deleteSnippet: PropTypes.func.isRequired
};

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
  loadPage: (userId, page, lastVisible) => {
    dispatch(loadSnippetPageAction(userId, page, lastVisible));
  },
  deleteSnippet: (id, currentPage) => {
    dispatch(deleteSnippetAction(id, currentPage));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnippetsIndexPage);
