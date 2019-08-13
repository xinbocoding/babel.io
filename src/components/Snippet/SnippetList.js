import React from 'react';
import { SnippetListShape } from '../../utils/shapes';
import { Link } from 'react-router-dom';

const SnippetList = ({ snippets }) => {
  return (
    <div>
      <div>Fix snippet list show</div>
      {snippets.map(m => (
        <div key={m.id}>
          <div>
            <div>{`${m.title} (${m.mode})`}</div>
            <pre>
              <code>{m.code}</code>
            </pre>
            <div>
              <Link to={`/snippets/${m.id}`}>Edit</Link>
            </div>
          </div>
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
