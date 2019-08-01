import React from 'react';
import { SnippetShape } from '../../utils/shapes';

const SnippetDetail = ({ snippet }) => {
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
        {JSON.stringify(snippet.marks)}
      </div>
    </div>
  );
};

SnippetDetail.propTypes = {
  snippet: SnippetShape.isRequired
};

export default SnippetDetail;
