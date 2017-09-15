import React, { Component } from 'react'
import { Debounce } from 'react-throttle';

class SearchBar extends Component {
  handleChange = event => {
    event.preventDefault()
    if (event.target.value === '') {
      this.props.searchClean()
    } else {
      this.props.searchBooks(event.target.value)
    }
  }

  render() {
    return (
      <form>
        <Debounce time="400" handler="onChange">
          <input
            id="search-input"
            type="search"
            name="search"
            onChange={this.handleChange} />
        </Debounce>
      </form>
    )
  }
}

export default SearchBar
