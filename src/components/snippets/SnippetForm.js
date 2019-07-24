import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createSnippetAction } from '../../actions/snippets';

class SnippetForm extends React.Component {
  constructor(props) {
    super(props); // this.state = null
    this.state = {
      lang: 'javascript',
      code: '',
    };
    this.onLangChanged = this.onLangChanged.bind(this);
    this.onCodeChanged = this.onCodeChanged.bind(this);
    this.onSaveClicked = this.onSaveClicked.bind(this);
  }

  onLangChanged(event) {
    this.setState({ lang: event.target.value });
  }

  onCodeChanged(event) {
    this.setState({ code: event.target.value });
  }

  onSaveClicked() {
    this.props.create(this.state.lang, this.state.code);
  }

  render() {
    if (this.props.snippet.id !== undefined) {
      return <Redirect to={{ pathname: `/snippets/${this.props.snippet.id}` }} />;
    }

    return (
      <Container maxWidth="sm">
        <h1>{this.props.snippet.id}</h1>
        <FormControl fullWidth>
          <TextField
            id="lang"
            label="Language"
            margin="normal"
            variant="outlined"
            onChange={this.onLangChanged}
            value={lang}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            multiline
            id="code"
            label="Code"
            rows="20"
            rowsMax="20"
            margin="normal"
            variant="outlined"
            onChange={this.onCodeChanged}
            value={code}
          />
        </FormControl>
        <FormControl fullWidth>
          <Button variant="contained" onClick={this.onSaveClicked}>Save</Button>
        </FormControl>
      </Container>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    snippet: state.lastCreatedSnippet,
  };
};

const mapDispatchToProps = dispatch => ({
  create: (lang, code) => {
    dispatch(createSnippetAction(lang, code));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SnippetForm);
