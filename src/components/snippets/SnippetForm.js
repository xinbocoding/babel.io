import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { createSnippetAction } from '../../actions/snippets';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

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

  onCodeChanged(editor, data, value) {
    this.setState({ code: value });
  }

  onSaveClicked() {
    this.props.create(this.state.lang, this.state.code);
  }

  render() {
    const { snippet } = this.props;
    const { code, lang } = this.state;

    if (snippet.id !== undefined) {
      return (
        <Redirect to={{ pathname: `/snippets/${snippet.id}` }} />
      );
    }

    return (
      <Container maxWidth="sm">
        <h1>{snippet.id}</h1>
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
          <CodeMirror
            value={code}
            options={{
              lineNumbers: true,
            }}
            onBeforeChange={this.onCodeChanged}
          />
        </FormControl>
        <FormControl fullWidth>
          <Button variant="contained" onClick={this.onSaveClicked}>
            Save
          </Button>
        </FormControl>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  snippet: state.lastCreatedSnippet,
});

const mapDispatchToProps = dispatch => ({
  create: (lang, code) => {
    dispatch(createSnippetAction(lang, code));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SnippetForm);
