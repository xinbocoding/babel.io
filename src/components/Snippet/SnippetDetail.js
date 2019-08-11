import React from 'react';
import { SnippetShape, MarkListShap } from '../../utils/shapes';

const SnippetDetail = ({ snippet, marks }) => {
  return (
    <div clss="container">
      <div>{`${snippet.title} (${snippet.mode})`}</div>
      <pre>
        <code>{snippet.code}</code>
      </pre>
      <div>{JSON.stringify(marks)}</div>
    </div>
  );
};

SnippetDetail.propTypes = {
  snippet: SnippetShape.isRequired,
  marks: MarkListShap.isRequired
};

export default SnippetDetail;
