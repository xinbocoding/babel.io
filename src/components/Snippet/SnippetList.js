import React from 'react';
import { SnippetListShape } from '../../utils/shapes';
import { Link } from 'react-router-dom';
import './SnippetList.css';

const SnippetList = ({ snippets }) => {
  return (
    <div>
      {snippets.map(m => (
        <div key={m.id}>
          <div className="card">
            <div className="tab-card">
              <div className="row card-body">
                <div className="col-auto mr-auto">
                  <h5 className="title">{`${m.title}`}</h5>
                </div>
                <div className="col-auto">
                  <h6 className="mode">{`${m.mode}`}</h6>
                </div>
              </div>
            </div>

            <pre className="codePart">
              <code>{m.code}</code>
            </pre>
            <div className="row justify-content-end">
              <div className="col-auto editlink">
                <button type="button" className="btn-edit">
                  <Link className="edit" to={`/snippets/${m.id}`}>Edit</Link>
                </button>
              </div>
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
