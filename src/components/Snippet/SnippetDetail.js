import React from 'react';
import { SnippetShape, MarkListShape } from '../../data/shapes';
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
  marks: MarkListShape.isRequired
};

export default SnippetDetail;
