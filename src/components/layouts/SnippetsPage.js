import React from 'react';
import NavBar from '../NavBar';
import { connect } from 'react-redux';
import { loadUserSnippetsAction } from '../../actions/snippets';
import UserSnippets from '../snippets/UserSnippets';
import { Link } from 'react-router-dom';

class SnippetsPage extends React.Component {

  componentDidMount() {
    if (this.props.user) {
      this.props.loadSnippets(this.props.user.id);
    }
  }

  render() {
    if (!this.props.user) {
      return <div>N/A</div>;
    }

    return (
      <div>
        <div><NavBar/></div>
        <div>
          <Link to="/snippets/new">New Snippet</Link>
          <UserSnippets snippets={this.props.snippets}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    snippets: state.userSnippets.items
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSnippets: (userId) => {
      dispatch(loadUserSnippetsAction(userId))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SnippetsPage);
