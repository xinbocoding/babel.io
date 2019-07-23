import React from 'react';
import { loadSnippetAction } from '../../actions/snippets';
import { connect } from 'react-redux';

class SnippetDetial extends React.Component {

  componentDidMount() {
    // loadSnippetAction
  }

  render() {
    return <div>Code details: {this.props.snippetId}</div>
  }
}

// const mapDispatch
//  loadSnippet: action
const mapStateToProps = (store) => {
  return {
    detailSnippet: store.snippetDetailPage.snippet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSnippet: (id) => {
      dispatch(loadSnippetAction(id))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SnippetDetial);
