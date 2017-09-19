import React, { Component } from 'react'
import { Debounce } from 'react-throttle';

class SearchBar extends Component {
  handleChange = event => {
    if (event.target.value === '') {
      this.props.searchClean()
    } else {
      this.props.searchBooks(event.target.value)
    }
  }

  render() {
    return (
      <Debounce time="100" handler="onChange">
        <input
          id="search-input"
          type="search"
          name="search"
          placeholder="Search a book..."
          onChange={this.handleChange} />
      </Debounce>
    )
  }
}

export default SearchBar
