import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class SnippetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snippets: props.snippets
    };
  }

  renderItems(items) {
    if (items) {
      return items.map(item => (
        <li key={item.id}>
          <p>{item.userId}</p>
          <p>
            <Link to={`/snippets/${item.id}`}>{item.id}</Link>
          </p>
          <p>
            <Link to={`/snippets/${item.id}/edit`}>edit</Link>
          </p>
        </li>
      ));
    }
  }

  render() {
    return <ul>{this.renderItems(this.props.snippets)}</ul>;
  }
}

export default SnippetList;
