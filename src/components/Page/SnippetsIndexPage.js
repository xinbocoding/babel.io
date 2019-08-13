import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../NavBar';
import { fetchSnippetsAction } from '../../store/actions/snippetIndexPageActions';
import SnippetList from '../Snippet/SnippetList';
import { AuthShape, SnippetShape } from '../../utils/shapes';
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
        <div>
          <div>
            <NavBar />
          </div>
          <div className="container">
            <button type="button" className="nav-btn btn-default">
              <Link className="badge-mystyle newSnippet" to="/snippets/new">New Snippet</Link>
            </button>
            <SnippetList snippets={snippets} />
          </div>
        </div>
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
