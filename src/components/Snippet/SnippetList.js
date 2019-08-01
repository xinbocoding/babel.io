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
    const { deleteSnippet } = this.props;
    if (items) {
      return items.map(item => (
        <li key={item.id}>
          <Link to={`/snippets/${item.id}`}>
            {item.id}
          </Link>
          <Link to={`/snippets/${item.id}/edit`}>edit</Link>
        </li>
      ));
    }
  }

  render() {
    return <ul>{this.renderItems(this.props.snippets)}</ul>;
  }
}

export default SnippetList;
