import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Box from '@material-ui/core/Box';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import { Button, ButtonGroup } from '@material-ui/core';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import * as utils from '../../utils/codeEditorUtils';


class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    const { code, mode } = props;
    this.state = {
      selection: null,
      mode,
      code,
    };

    this.editor = null;

    this.codeDidChange = this.codeDidChange.bind(this);
    this.onSelection = this.onSelection.bind(this);

    this.codeMirrorDidMount = this.codeMirrorDidMount.bind(this);
  }

  codeMirrorDidMount(editor) {
    this.editor = editor;
  }

  onSelection(editor, data) {
    const { from, to } = utils.orderRange(data.ranges[0]);
    this.setState({
      selection: {
        from,
        to
      },
    });
  }

  codeDidChange(editor, data, value) {
    this.setState({ code: value });
    this.props.codeDidChange(value);
  }

  findHighlights(from, to) {
    return this.editor.findMarks(from, to)
      .filter(m => m.attributes.type === 'highlight')
      .filter(m => m !== undefined);
  }

  addHighlight() {
    const { from, to } = this.state.selection;

    // find all marks that overlap with current selection
    const marks = this.findHighlights(from, to);

    // a helper for expand the boundary
    const findBoundary = (compareFunc, valueFunc, initial) => {
      let reducer = (acc, cur) => compareFunc(acc, this.editor.indexFromPos(valueFunc(cur.find())));
      let acc = this.editor.indexFromPos(initial);
      return this.editor.posFromIndex(marks.reduce(reducer, acc));
    };

    // a helper for expand original FROM and TO
    const expandRange = (from, to) => ({
      expandFrom: findBoundary(Math.min, (v) => v.from, from),
      expandTo: findBoundary(Math.max, (v) => v.to, to),
    })

    const { expandFrom, expandTo } = expandRange(from, to);

    // set a new mark
    this.editor.markText(expandFrom, expandTo, {
      css: 'background-color: rgb(255, 255, 0, 0.4);',
      attributes: {
        type: 'highlight',
      },
    });

    // remove all overlap marks
    marks.forEach((m) => m.clear());
  }

  removeHighlight() {
    const { selection } = this.state;
    if (selection) {
      const { from, to} = selection;
      this.findHighlights(from, to).forEach(m => m.clear());
    }
  }

  renderHighlightButton() {
    const { selection } = this.state;

    let disableRemoveHighlight = true, disableAddHighlight = true;


    // no selection
    if (selection) {
      // selection length is 0 (click)
      const { from, to } = selection;
      const textLength = this.editor.getRange(from, to).length;
      const indexOf = this.editor.indexFromPos.bind(this.editor);
      const otherMarks = this.findHighlights(from, to);
      const isInsideOtherMark = otherMarks.some((m) => {
        let other = m.find();
        return indexOf(other.from) <= indexOf(from) && indexOf(to) <= indexOf(other.to);
      });

      // disable "REMOVE HIGHLIGHT" if the current selection has no marks
      disableRemoveHighlight = otherMarks.length == 0;

      // disable "ADD HIGHLIGHT" if the potential highlight is inside another mark
      disableAddHighlight = textLength == 0 || isInsideOtherMark;
    }

    return (
      <ButtonGroup variant="contained" size="large" aria-label="Full-width contained primary button group">
        <Button
          disabled={disableRemoveHighlight}
          onClick={() => this.removeHighlight()}
        >
          <i className="fal fa-eraser"></i>
        </Button>
        <Button
          disabled={disableAddHighlight}
          onClick={() => this.addHighlight()}
        >
          <i className="fal fa-highlighter"></i>
        </Button>
      </ButtonGroup>
    );

  }

  renderToolbar() {
    return (
      <Box mb={1}>
        {this.renderHighlightButton()}
      </Box>
    );
  }

  onBlur(editor, event) {
    //this.setState({ selection: null });
  }

  renderCodeMirror() {
    const { code, mode } = this.state;
    return (
      <Box mb={1}>
        <CodeMirror
          editorDidMount={this.codeMirrorDidMount}
          value={code}
          options={{
            mode,
            lineNumbers: true,
          }}
          onBlur={(editor, event) => this.onBlur(editor, event)}
          onBeforeChange={(_editor, _data, value) => this.setState({ code: value })}
          onSelection={this.onSelection}
          onChange={this.codeDidChange}
        />
      </Box>
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
  codeDidChange: PropTypes.func.isRequired,
};

export default CodeEditor;
