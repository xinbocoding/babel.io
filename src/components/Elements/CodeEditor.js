import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import PropTypes from 'prop-types';
import './CodeEditor.css';
import { Controlled as CodeMirror } from 'react-codemirror2';
import CodeToolbar from './CodeEditor/CodeToolbar';
import { MarkListShap } from '../../utils/shapes';

const Actions = {
  REMOVE_HIGHLIGHT: 'remove-highlight',
  CREATE_HIGHLIGHT: 'create-highlight'
};

const Buttons = [
  {
    action: Actions.REMOVE_HIGHLIGHT,
    icon: 'eraser'
  },
  {
    action: Actions.CREATE_HIGHLIGHT,
    icon: 'highlighter'
  }
];

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editor: undefined,
      code: props.code,
      mode: props.mode
    };
  }

  getAllFormattedMarks() {
    return this.state.editor
      .getAllMarks()
      .filter(m => m.attributes.type !== undefined)
      .map(m => {
        const range = m.find();
        return {
          id: m.attributes.id,
          type: m.attributes.type,
          from: CodeEditor.formatPos(range.from),
          to: CodeEditor.formatPos(range.to)
        };
      });
  }

  codeMirrorDidMount(editor) {
    this.setState({ editor }, () => {
      const { marks } = this.props;
      marks.forEach(m => {
        this.codeMirrorMarkText(m.id, m.from, m.to, m.type);
      });
    });
  }

  codeMirrorCodeChanged(code) {
    this.setState({ code });
    this.props.onCodeChange(code);
    this.props.onMarksChange(this.getAllFormattedMarks(), []);
  }

  codeMirrorCodeSelected(data) {
    this.setState({ selection: this.formatSelectionData(data) });
  }

  doAction(action) {
    switch (action) {
      case Actions.CREATE_HIGHLIGHT:
        this.createMark('highlight');
        break;
      case Actions.REMOVE_HIGHLIGHT:
        this.deleteMark('highlight');
        break;
      default:
        console.error(`Unknown action ${action}`);
    }
  }

  findMarksInRange(from, to, type) {
    const { editor } = this.state;
    return editor
      .findMarks(from, to)
      .filter(m => m !== undefined)
      .filter(m => m.attributes.type === type);
  }

  createMark(type) {
    const { from, to } = this.state.selection;

    const merged = this.mergeMarkRanges(from, to, type);

    this.codeMirrorMarkText(null, merged.from, merged.to, type);

    const deleted = merged.marks
      .filter(m => m.attributes.id !== null)
      .map(m => {
        const { id } = m.attributes;
        m.clear();
        return id;
      });

    this.props.onMarksChange(this.getAllFormattedMarks(), deleted);
  }

  codeMirrorMarkText(id, from, to, type) {
    this.state.editor.markText(from, to, {
      className: `code-mark-${type}`,
      attributes: {
        id,
        type
      }
    });
  }

  deleteMark(type) {
    const { from, to } = this.state.selection;
    const deleted = this.findMarksInRange(from, to, type)
      .map(m => {
        const { id } = m.attributes;
        m.clear();
        return id;
      })
      .filter(id => id !== null);

    this.props.onMarksChange(this.getAllFormattedMarks(), deleted);
  }

  mergeMarkRanges(from, to, type) {
    const { editor } = this.state;
    const marks = this.findMarksInRange(from, to, type);

    if (marks.length === 0) {
      return { from, to, marks };
    }

    // a helper for expand the boundary
    const findBoundary = (compareFunc, valueFunc, initialPos) => {
      const reducer = (acc, cur) =>
        compareFunc(acc, editor.indexFromPos(valueFunc(cur.find())));
      const initialIndex = editor.indexFromPos(initialPos);
      return editor.posFromIndex(marks.reduce(reducer, initialIndex));
    };

    // a helper for expand original FROM and TO
    return {
      from: findBoundary(Math.min, v => v.from, from),
      to: findBoundary(Math.max, v => v.to, to),
      marks
    };
  }

  static formatPos(pos) {
    return {
      ch: pos.ch,
      line: pos.line
    };
  }

  formatSelectionData(data) {
    const { editor } = this.state;
    const { anchor, head } = data.ranges[0];

    const ordered = [anchor, head]
      .map(pos => CodeEditor.formatPos(pos))
      .sort((a, b) => editor.indexFromPos(a) - editor.indexFromPos(b));

    return {
      from: ordered[0],
      to: ordered[1],
      length: editor.getRange(ordered[0], ordered[1]).length
    };
  }

  render() {
    const { code, mode } = this.state;

    return (
      <div className="code-editor">
        <CodeToolbar
          buttons={Buttons}
          onAction={action => this.doAction(action)}
        />
        <CodeMirror
          value={code}
          options={{
            mode,
            lineNumbers: true
          }}
          editorDidMount={editor => this.codeMirrorDidMount(editor)}
          onBeforeChange={(editor, data, changedCode) =>
            this.codeMirrorCodeChanged(changedCode)
          }
          onSelection={(editor, data) => this.codeMirrorCodeSelected(data)}
        />
      </div>
    );
  }
}

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  marks: MarkListShap.isRequired,
  onMarksChange: PropTypes.func.isRequired,
  onCodeChange: PropTypes.func.isRequired
};

export default CodeEditor;
