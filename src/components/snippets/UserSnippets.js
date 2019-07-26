import React from 'react';
import { Link } from 'react-router-dom';

class UserSnippets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snippets: props.snippets
    };
  }

  renderItems(items) {
    if (items) {
      return items.map(item => (
        <li>
          <Link to={`/snippets/${item.id}`} key={item.id}>
            {item.id}
          </Link>
        </li>
      ));
    }
  }

  render() {
    return <ul>{this.renderItems(this.props.snippets)}</ul>;
  }
}

export default UserSnippets;
