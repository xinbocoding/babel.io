import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { SnippetListShape } from '../../data/shapes';
import './SnippetList.css';

class SnippetList extends React.Component {
  deleteSnippet(id) {
    document.getElementById(`snippet-${id}`).remove();
    this.props.onDelete(id);
  }

  render() {
    const { snippets } = this.props;

    return (
      <div className="container mt-5">
        <div className="container">
          <h1 className="snippets-title">Your Snippets</h1>
        </div>
        {snippets.map(m => (
          <div
            className="d-flex flex-column snippet-preview whitebox"
            key={m.id}
            id={`snippet-${m.id}`}
          >
            <div className="snippet-preview-title">
              <Link to={`/s/${m.id}`}>
                {m.title}
              </Link>
            </div>
            <div className="snippet-preview-note text-muted">{m.note}</div>
            <pre className="snippet-preview-code">
              <code>{m.code}</code>
            </pre>
            <div className="snippet-preview-actions text-right">
              <button
                className="btn"
                type="button"
                onClick={() => this.deleteSnippet(m.id)}
              >
                <i className="fal fa-trash-alt" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

SnippetList.propTypes = {
  snippets: SnippetListShape,
  onDelete: PropTypes.func.isRequired
};

SnippetList.defaultProps = {
  snippets: []
};

export default SnippetList;
