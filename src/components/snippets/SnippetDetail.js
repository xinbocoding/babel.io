import React from 'react';
import { connect } from 'react-redux';
import { loadSnippetAction } from '../../actions/snippets';

class SnippetDetial extends React.Component {
  componentDidMount() {
    this.props.loadSnippet(this.props.snippetId);
  }

  render() {
    if (this.props.snippet) {
      return (
        <div>
          <div>
id:
            {this.props.snippet.id}
          </div>
          <div>
lang:
            {this.props.snippet.lang}
          </div>
          <div>
code:
            {this.props.snippet.code}
          </div>
        </div>
      );
    }
    return <div>loading</div>;
  }
}

// const mapDispatch
//  loadSnippet: action
const mapStateToProps = store => ({
  snippet: store.snippetDetailPage.snippet,
});

const mapDispatchToProps = dispatch => ({
  loadSnippet: (id) => {
    dispatch(loadSnippetAction(id));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(SnippetDetial);
