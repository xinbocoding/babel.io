import React from 'react';
import { loadSnippetAction } from '../../actions/snippets';
import { connect } from 'react-redux';

class SnippetDetial extends React.Component {

  componentDidMount() {
    this.props.loadSnippet(this.props.snippetId);
  }

  render() {
    if (this.props.snippet) {
      return <div>
        <div>id: {this.props.snippet.id}</div>
        <div>lang: {this.props.snippet.lang}</div>
        <div>code: {this.props.snippet.code}</div>
      </div>
    } else {
      return <div>loading</div>;
    }

  }

}

// const mapDispatch
//  loadSnippet: action
const mapStateToProps = (store) => {
  return {
    snippet: store.snippetDetailPage.snippet
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
