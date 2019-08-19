import React from 'react';
import { SnippetShape, MarkListShap } from '../../utils/shapes';
import './SnippetDetail.css';

const SnippetDetail = ({ snippet, marks }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-2 modeChoice">{`${snippet.mode}`}</div>
        <h2 className="col-4 breadcrumb flex-auto min-width-0 text-normal flex-md-self-center ml-md-2 mr-md-3 my-2 my-md-0 titleShow">{`${snippet.title}`}</h2>
      </div>
      <pre className="codeEdit">
        <code>{snippet.code}</code>
      </pre>
      <div className="my-4">
        <label className="d-block mb-2 jaws">Marks</label>
        <div className="marks">{JSON.stringify(marks)}</div>
      </div>
    </div>
  );
};

SnippetDetail.propTypes = {
  snippet: SnippetShape.isRequired,
  marks: MarkListShap.isRequired
};

export default SnippetDetail;
