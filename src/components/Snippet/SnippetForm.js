import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import CodeEditor from './CodeEditor';
import { SnippetShape } from '../../utils/shapes';
import ModeSelect from './ModeSelect';

class SnippetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { snippet: props.snippet };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { onSubmit } = this.props;
    const { snippet } = this.state;
    onSubmit(snippet);
  }

  handleChange(name) {
    return e => {
      const { snippet } = this.state;
      if (e.target) {
        e.preventDefault();
        this.setState({ snippet: { ...snippet, [name]: e.target.value } });
      } else {
        this.setState({ snippet: { ...snippet, [name]: e } });
      }
    };
  }

  render() {
    const { snippet } = this.state;
    return (
      <Container maxWidth="sm">
        <FormControl fullWidth>
          <TextField
            label="Title"
            value={snippet.title}
            margin="normal"
            onChange={this.handleChange('title')}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            multiline
            label="Description"
            value={snippet.description}
            margin="normal"
            onChange={this.handleChange('description')}
          />
        </FormControl>
        <FormControl fullWidth>
          <ModeSelect
            value={snippet.mode}
            onChange={this.handleChange('mode')}
          />
        </FormControl>
        <FormControl fullWidth>
          <CodeEditor
            mode={snippet.mode}
            code={snippet.code || ''}
            marks={snippet.marks}
            onCodeChange={this.handleChange('code')}
            onMarksChange={this.handleChange('marks')}
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
    title: '',
    description: '',
    mode: 'javascript',
    code: '',
    marks: []
  }
};

export default SnippetForm;
