import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import PropTypes from 'prop-types';
import * as utils from '../../utils/codeEditorUtils';

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: null,
      code: props.code
    };

    this.codeMirrorDidMount = this.codeMirrorDidMount.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onMarksChange = this.onMarksChange.bind(this);
    this.onMarkRemoved = this.onMarkRemoved.bind(this);

    this.onSelection = this.onSelection.bind(this);
  }

  codeMirrorDidMount(editor) {
    this.editor = editor;
    this.setIntialMarks(editor, this.props.marks);
  }

  onCodeChange(_e, _d, code) {
    this.setState({ code });
    this.props.onCodeChange(code);
  }

  onMarksChange() {
    this.props.onMarksChange(this.getAllMarks());
  }

  onMarkRemoved(markId) {
    this.props.onMarkRemoved(markId);
  }

  onSelection(_editor, data) {
    const { from, to } = utils.orderRange(data.ranges[0]);
    this.setState({
      selection: {
        from,
        to
      }
    });
  }

  _findHighlights(from, to) {
    return this.editor
      .findMarks(from, to)
      .filter(m => m.attributes.type === 'highlight')
      .filter(m => m !== undefined);
  }

  _addHighlight() {
    const { from, to } = this.state.selection;
    this._addHighlightRange(null, from, to);
  }

  _addHighlightRange(markId, from, to) {
    // find all marks that overlap with current selection
    const marks = this._findHighlights(from, to);

    // a helper for expand the boundary
    const findBoundary = (compareFunc, valueFunc, initial) => {
      const reducer = (acc, cur) =>
        compareFunc(acc, this.editor.indexFromPos(valueFunc(cur.find())));
      const acc = this.editor.indexFromPos(initial);
      return this.editor.posFromIndex(marks.reduce(reducer, acc));
    };

    // a helper for expand original FROM and TO
    const expandRange = (from, to) => ({
      expandFrom: findBoundary(Math.min, v => v.from, from),
      expandTo: findBoundary(Math.max, v => v.to, to)
    });

    const { expandFrom, expandTo } = expandRange(from, to);

    // set a new mark
    this.editor.markText(expandFrom, expandTo, {
      css: 'background-color: rgb(255, 255, 0, 0.4);',
      attributes: {
        id: markId,
        type: 'highlight'
      }
    });

    // remove all overlap marks
    marks.forEach(m => this.clearMark(m));

    // save updated marks
    this.onMarksChange();
  }

  clearMark(mark) {
    const {
      attributes: { id }
    } = mark;
    if (id) {
      this.onMarkRemoved(id);
    }
    mark.clear();
  }

  getAllMarks() {
    return this.editor
      .getAllMarks()
      .filter(m => m.attributes.type !== undefined)
      .map(m => {
        const range = m.find();
        return {
          id: m.attributes.id,
          type: m.attributes.type,
          from: this.editor.indexFromPos(range.from),
          to: this.editor.indexFromPos(range.to)
        };
      });
  }

  setIntialMarks(editor, marks) {
    marks.forEach(m => {
      switch (m.type) {
        case 'highlight':
          this._addHighlightRange(
            m.id,
            editor.posFromIndex(m.from),
            editor.posFromIndex(m.to)
          );
          break;
        default:
          console.error('Unkown mark type', m.type);
      }
    });
  }

  _removeHighlight() {
    const { selection } = this.state;

    if (selection) {
      const { from, to } = selection;
      this._findHighlights(from, to).forEach(m => this.clearMark(m));
      // save updated marks
      this.onMarksChange();
    }
  }

  renderToolbar() {
    return <div mb={1}>{this.renderHighlightButton()}</div>;
  }

  renderHighlightButton() {
    const { selection } = this.state;

    let disableRemoveHighlight = true;
    let disableAddHighlight = true;

    // no selection
    if (selection) {
      // selection length is 0 (click)
      const { from, to } = selection;
      const textLength = this.editor.getRange(from, to).length;
      const indexOf = this.editor.indexFromPos.bind(this.editor);
      const otherMarks = this._findHighlights(from, to);
      const isInsideOtherMark = otherMarks.some(m => {
        const other = m.find();
        return (
          indexOf(other.from) <= indexOf(from) &&
          indexOf(to) <= indexOf(other.to)
        );
      });

      // disable "REMOVE HIGHLIGHT" if the current selection has no marks
      disableRemoveHighlight = otherMarks.length === 0;

      // disable "ADD HIGHLIGHT" if the potential highlight is inside another mark
      disableAddHighlight = textLength === 0 || isInsideOtherMark;
    }

    return (
      <div class="btn-group" role="group"
        variant="contained"
        size="large"
        aria-label="Full-width contained primary button group"
      >
        <button type="button" class="btn btn-secondary"
          disabled={disableRemoveHighlight}
          onClick={() => this._removeHighlight()}
        >
          <i className="fal fa-eraser" />
        </button>
        <button type="button" class="btn btn-secondary"
          disabled={disableAddHighlight}
          onClick={() => this._addHighlight()}
        >
          <i className="fal fa-highlighter" />
        </button>
      </div>
    );
  }

  renderCodeMirror() {
    const { code, mode } = this.state;
    return (
      <div mb={1}>
        <CodeMirror
          editorDidMount={this.codeMirrorDidMount}
          value={code}
          options={{
            mode,
            lineNumbers: true
          }}
          onBeforeChange={this.onCodeChange}
          onSelection={this.onSelection}
        />
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderToolbar()}
        {this.renderCodeMirror()}
      </React.Fragment>
    );
  }
}

CodeEditor.propTypes = {
  mode: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func.isRequired,
  onMarksChange: PropTypes.func.isRequired
};

export default CodeEditor;
