import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import CodeEditor from './CodeEditor';
import { SnippetShape, MarkListShap } from '../../utils/shapes';
import ModeSelect from './ModeSelect';

class SnippetForm extends React.Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    this.state = { snippet: props.snippet };
    this.onSubmit = this.onSubmit.bind(this);
=======

    this.state = {
      snippet: props.snippet,
      marks: props.marks,
      removedMarks: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
>>>>>>> 83289ccd082cf226e02e886e2b634f346d8c16dd
  }

  handleSubmit() {
    this.props.onSubmit(this.state);
  }

  handleMarksChange(marks) {
    this.setState({ marks });
  }

  handleMarkRemoved(markId) {
    console.log(markId);
    this.setState({ removedMarks: [...this.state.removedMarks, markId] });
  }

  handleSnippetChange(field, value) {
    const { snippet } = this.state;
    snippet[field] = value;
    this.setState({ snippet });
  }

  render() {
    const { snippet, marks } = this.state;

    return (
      <Container maxWidth="sm">
        <FormControl fullWidth>
          <TextField
            label="Title"
            value={snippet.title}
            margin="normal"
            onChange={e => this.handleSnippetChange('title', e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            multiline
            label="Note"
            value={snippet.note}
            margin="normal"
            onChange={e => this.handleSnippetChange('note', e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <ModeSelect
            value={snippet.mode}
            onChange={v => this.handleSnippetChange('mode', v)}
          />
        </FormControl>
        <FormControl fullWidth>
          <CodeEditor
            mode={snippet.mode}
            code={snippet.code || ''}
            marks={marks}
            onCodeChange={v => this.handleSnippetChange('code', v)}
            onMarksChange={v => this.handleMarksChange(v)}
            onMarkRemoved={v => this.handleMarkRemoved(v)}
          />
        </FormControl>
        <FormControl fullWidth>
          <Button variant="contained" onClick={this.handleSubmit}>
            Save
          </Button>
        </FormControl>
      </Container>
    );
  }
}

SnippetForm.propTypes = {
  snippet: SnippetShape,
  marks: MarkListShap,
  onSubmit: PropTypes.func.isRequired
};

SnippetForm.defaultProps = {
  snippet: {
    title: '',
    note: '',
    mode: 'javascript',
    code: ''
  },
  marks: []
};

export default SnippetForm;
