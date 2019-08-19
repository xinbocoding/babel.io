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
    const { auth, fetchSnippetsByUserId } = this.props;
    fetchSnippetsByUserId(auth.user.id);
  }

  render() {
    const { snippets } = this.props;
    if (snippets.length > 0) {
      return (
        <React.Fragment>
          <Header />
          <div className="container">
            <div className="d-flex flex-row whitebox index-toolbar">
              <div className="col-md-9">
                <SearchBar />
              </div>
              <div className="col-md-3 text-right">
                <Link to="/snippets/new" className="btn btn-primary">New Snippet</Link>
              </div>
            </div>
          </div>
          <SnippetList snippets={snippets} />
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
  fetchSnippetsByUserId: PropTypes.func.isRequired,
  snippets: PropTypes.arrayOf(SnippetShape)
};

SnippetsIndexPage.defaultProps = {
  snippets: []
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    snippets: state.snippetIndexPage.snippets
  };
};

const mapDispatchToProps = dispatch => ({
  fetchSnippetsByUserId: userId => {
    dispatch(fetchSnippetsAction(userId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnippetsIndexPage);
