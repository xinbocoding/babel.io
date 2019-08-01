import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import CodeEditor from './CodeEditor';
import { SnippetShape } from '../../utils/shapes';

class SnippetForm extends React.Component {
  constructor(props) {
    super(props);
    const { code, mode, marks } = props.snippet;
    this.state = { code, mode, marks };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { onSubmit } = this.props;
    const { code, mode, marks } = this.state;

    onSubmit({ code, mode, marks });
  }

  render() {
    const { code, mode, marks } = this.state;
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
            marks={marks}
            codeDidChange={changed => this.setState({ code: changed })}
            marksDidChange={changed => this.setState({ marks: changed })}
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
  snippet: SnippetShape,
  onSubmit: PropTypes.func.isRequired
};

SnippetForm.defaultProps = {
  snippet: {
    mode: 'javascript',
    code: '',
    marks: []
  }
};

export default SnippetForm;
