import React from 'react';
import { Link } from 'react-router-dom';
import { SnippetListShape } from '../../utils/shapes';
import './SnippetList.css';

const SnippetList = ({ snippets }) => {
  return (
    <div className="container mt-5">
      <div className="container">
        <h1 className="snippets-title">Your Snippets</h1>
      </div>
      {snippets.map(m => (
        <div className="d-flex flex-column snippet-preview whitebox" key={m.id}>
          <div className="snippet-preview-title">
            <Link className="edit" to={`/snippets/${m.id}`}>
              {m.title}
            </Link>
          </div>
          <div className="snippet-preview-note text-muted">{m.note}</div>
          <pre className="snippet-preview-code">
            <code>{m.code}</code>
          </pre>
        </div>
      ))}
    </div>
  );
};

SnippetList.propTypes = {
  snippets: SnippetListShape
};

SnippetList.defaultProps = {
  snippets: []
};

export default SnippetList;
