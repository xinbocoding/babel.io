import React, { Component } from 'react'
import './SearchBar.css';

export default class SearchBar extends Component {
  render() {
    return (
      <form className="search-bar">
        <input type="text" className="form-control" placeholder="search..." />
      </form>
    )
  }
}
