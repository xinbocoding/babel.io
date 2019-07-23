import React from 'react';
import NavBar from '../NavBar';
import { connect } from 'react-redux';
import { loadUserSnippetsAction } from '../../actions/snippets';
import UserSnippets from '../snippets/UserSnippets';

class SnippetsIndexPage extends React.Component {

  componentWillReceiveProps() {
    if (this.props.user.id) {
      this.props.loadSnippets(this.props.user.id);
    }
  }

  render() {
    return <div>
      <div><NavBar /></div>
      <div>
        <UserSnippets snippets={this.props.snippets} />
      </div>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
    snippets: state.userSnippets.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSnippets: (userId) => {
      dispatch(loadUserSnippetsAction(userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippetsIndexPage);
