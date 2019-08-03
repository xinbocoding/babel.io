import React from 'react';
import Paper from '@material-ui/core/Paper';
import { SnippetShape, MarkListShap } from '../../utils/shapes';

const SnippetDetail = ({ snippet, marks }) => {
  return (
    <Paper>
      <div>{`${snippet.title} (${snippet.mode})`}</div>
      <pre>
        <code>{snippet.code}</code>
      </pre>
      <div>{JSON.stringify(marks)}</div>
    </Paper>
  );
};

SnippetDetail.propTypes = {
  snippet: SnippetShape.isRequired,
  marks: MarkListShap.isRequired
};

export default SnippetDetail;
