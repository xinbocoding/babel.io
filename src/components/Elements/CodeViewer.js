import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import PropTypes from 'prop-types';
import { MarkListShape } from '../../data/shapes';

const CodeViewer = ({ code, marks }) => {
  return (
    <div>
      <CodeMirror
        options={{
          readOnly: true,
          lineNumbers: true
        }}
        value={code}
        editorDidMount={editor => {
          console.log(marks);
          marks.forEach(m => {
            editor.markText(m.from, m.to, {
              className: `code-mark-${m.type}`,
              attributes: {
                id: m.id,
                type: m.type
              }
            });
          });
        }}
      />
    </div>
  );
};

CodeViewer.propTypes = {
  code: PropTypes.string.isRequired,
  marks: MarkListShape.isRequired
};

export default CodeViewer;
