import React, { Component } from 'react'


class SearchBar extends Component {
  handleInput = event => {
    event.preventDefault()
    this.props.searchBooks(event.target.value)
  }

  render() {
    return (
      <div>
        <input
          id="search-input"
          type="search"
          name="search"
          onInput={this.handleInput} />
      </div>
    )
  }
}

export default SearchBar
