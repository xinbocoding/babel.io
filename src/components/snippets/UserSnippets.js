import React from 'react';

class UserSnippets extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      snippets: props.snippets
    }
  }

  renderItems(items) {
    if (items) {
      return items.map((item) => {
        return <li key={item.id}>{item.code}</li>
      })
    }
  }

  render() {
    return <ul>{this.renderItems(this.props.snippets)}</ul>
  }
}




export default UserSnippets;
