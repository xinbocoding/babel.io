import React from 'react';
import { SnippetShape, MarkListShap } from '../../utils/shapes';
import './SnippetDetail.css';

const SnippetDetail = ({ snippet, marks }) => {
  return (
    <div className="snippet">
      <h1 className="snippet-title">{snippet.title}</h1>
      <div className="snippet-note">{snippet.note}</div>
      <div className="snippet-code">
        <pre className="codeEdit">
          <code>{snippet.code}</code>
        </pre>
      </div>
    </div>
  );
};

SnippetDetail.propTypes = {
  snippet: SnippetShape.isRequired,
  marks: MarkListShap.isRequired
};

export default SnippetDetail;
