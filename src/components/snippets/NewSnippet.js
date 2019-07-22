import React from 'react';
import { connect } from 'react-redux'
import { createSnippetAction } from '../../actions/snippets';

class NewSnippet extends React.Component {

  constructor(props) {
    super(props);
    this.state = { code: "" };

    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCodeChange(event) {
    this.setState({ code: event.target.value });
  }

  handleSubmit() {
    this.props.reduxDispatch({type: 'SUCCESS'})
    this.props.create(this.state.code, "text");
  }

  render() {
    return (
      <React.Fragment>
        <input type="text" value={this.state.code} onChange={this.handleCodeChange} />
        <button onClick={this.handleSubmit}>Create</button>
      </React.Fragment>
    );
  }
}

//define reference rules
function mapStateToProps(state) {
  return {
    newSnippet: state.sinppet
  }
}

// mapping actions(methods/functions) to component props
function mapDispatchToProps(dispatch) {
  return {
    create: function(code, lang) {
      dispatch(createSnippetAction(code, lang));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSnippet);
