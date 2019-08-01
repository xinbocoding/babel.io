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
        lang:
        {snippet.lang}
      </div>
      <div>
        code:
        {snippet.code}
      </div>
    </div>
  );
};

SnippetDetail.propTypes = {
  snippet: SnippetShape.isRequired
};

export default SnippetDetail;
