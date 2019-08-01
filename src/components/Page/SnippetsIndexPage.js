import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../NavBar';
import { fetchSnippetsAction } from '../../store/actions/snippetIndexPageActions';
import SnippetList from '../Snippet/SnippetList';
import { AuthShape } from '../../utils/shapes';

class SnippetsIndexPage extends React.Component {
  componentDidMount() {
    const { auth, fetchSnippetsByUserId } = this.props;
    fetchSnippetsByUserId(auth.id);
  }

  render() {
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <div>
          <Link to="/snippets/new">New Snippet</Link>
          <SnippetList snippets={[]} />
        </div>
      </div>
    );
  }
}

SnippetsIndexPage.propTypes = {
  auth: AuthShape.isRequired,
  fetchSnippetsByUserId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  fetchSnippetsByUserId: userId => {
    dispatch(fetchSnippetsAction(userId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnippetsIndexPage);
