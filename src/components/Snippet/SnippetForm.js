import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CodeEditor from '../Elements/CodeEditor';
import { SnippetShape, MarkListShap } from '../../data/shapes';
import './SnippetForm.css';
import './SnippetList.css';

class SnippetForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      snippet: props.snippet,
      marks: props.marks,
      deletedMarks: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  handleMarksChange(marks, deleted) {
    this.setState(state => ({
      marks,
      deletedMarks:
        deleted.length > 0
          ? state.deletedMarks.concat(deleted)
          : state.deletedMarks
    }));
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
        <div className="form-group">
          <label>Title</label>
          <input
            id="snippet-title"
            className="form-control"
            type="text"
            value={snippet.title}
            onChange={e => this.handleSnippetChange('title', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Note</label>
          <textarea
            className="form-control"
            row="5"
            value={snippet.note}
            onChange={e => this.handleSnippetChange('note', e.target.value)}
          />
        </div>
        <CodeEditor
          lang={snippet.lang}
          code={snippet.code}
          marks={marks}
          onCodeChange={v => this.handleSnippetChange('code', v)}
          onMarksChange={(marksUpdated, deleted) =>
            this.handleMarksChange(marksUpdated, deleted)
          }
          onLangChange={lang => this.handleSnippetChange('lang', lang)}
        />
        <div className="form-group text-center">
          <Link className="btn" to="/snippets/">
            Back
          </Link>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleSubmit}
          >
            Save
          </button>
        </div>
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
    lang: 'javascript',
    code: ''
  },
  marks: []
};

export default SnippetForm;
