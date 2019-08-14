import React from 'react';
import PropTypes from 'prop-types';
import CodeEditor from './CodeEditor';
import { SnippetShape, MarkListShap } from '../../utils/shapes';
import './SnippetForm.css';

class SnippetForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      snippet: props.snippet,
      marks: props.marks,
      removedMarks: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  handleMarksChange(marks) {
    this.setState({ marks });
  }

  handleMarkRemoved(markId) {
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
      <form>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label formTitle">Title</label>
          <input className="col-sm-9 inputboard"
            type="text"
            value={snippet.title}
            onChange={e => this.handleSnippetChange('title', e.target.value)}
          />
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label formNote">Note</label>
          <textarea className="col-sm-9 noteinput" row="5"
            value={snippet.note}
            onChange={e => this.handleSnippetChange('note', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="pr-2 text-bold text-gray">Edit mode:</label>
          <select className="form-select select-sm flex-auto">
            <option
              type="text"
              value={snippet.mode}
              onChange={v => this.handleSnippetChange('mode', v)}
            />
          </select>
        </div>
        <div className="form-group">
          <CodeEditor
            mode={snippet.mode}
            code={snippet.code || ''}
            marks={marks}
            onCodeChange={v => this.handleSnippetChange('code', v)}
            onMarksChange={v => this.handleMarksChange(v)}
            onMarkRemoved={v => this.handleMarkRemoved(v)}
          />
        </div>
        <button type="submit" className="flex-auto btn-submit btn-block" onClick={this.handleSubmit}>
          Save
        </button>
      </form>
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
