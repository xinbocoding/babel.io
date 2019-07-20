import React from 'react';
import { connect } from 'react-redux'

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
    this.props.create(this.state.code);
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
const mapStateToProps = (state /*, ownProps*/) => {
  return {

  }
}

// mapping actions(methods/functions) to component props
const mapDispatchToProps = (dispatch) => {
  return {
    create: (code) => {
      dispatch({
        type: 'CREATE_SNIPPET',
        payload: { code }
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSnippet);
