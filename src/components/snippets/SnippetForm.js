import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import CodeEditor from './CodeEditor';

class SnippetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.props.onSubmit(this.state.code, this.state.mode, this.state.annotations);
  }

  render() {
    const { code, mode } = this.props;
    return (
      <Container maxWidth="sm">
        <FormControl fullWidth>
          <TextField
            id="lang"
            label="Language"
            margin="normal"
            variant="outlined"
            onChange={this.onLangChanged}
            value={mode}
          />
        </FormControl>
        <FormControl fullWidth>
          <CodeEditor
            mode={mode}
            code={code}
            codeDidChange={changed => this.setState({ code: changed })}
            annotationDidChange={changed => this.setState({ annotations: changed })}
          />
        </FormControl>
        <FormControl fullWidth>
          <Button variant="contained" onClick={this.onSubmit}>
            Save
          </Button>
        </FormControl>
      </Container>
    );
  }
}

SnippetForm.propTypes = {
  code: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SnippetForm;
