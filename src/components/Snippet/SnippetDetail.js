import React from 'react';
import { SnippetShape, MarkListShap } from '../../utils/shapes';

const SnippetDetail = ({ snippet, marks }) => {
  return (
    <div>
      <div>
        id:
        {snippet.id}
      </div>
      <div>
        mode:
        {snippet.mode}
      </div>
      <div>
        code:
        {snippet.code}
      </div>
      <div>
        marks:
        {JSON.stringify(marks)}
      </div>
    </div>
  );
};

SnippetDetail.propTypes = {
  snippet: SnippetShape.isRequired,
  marks: MarkListShap.isRequired
};

export default SnippetDetail;
