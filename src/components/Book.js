import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  handleChange = event => {
    event.preventDefault()

    switch (event.target.value) {
      case 'currentlyReading':
        this.props.addTocurrentlyReading(this.props.book)
        break
      case 'wantToRead':
        this.props.addTowantToRead(this.props.book)
        break
      case 'read':
        this.props.addToRead(this.props.book)
        break
      default:
    }
  }

  render() {
    const { book } = this.props
    return (
      <li>
        <h1>{book.title}</h1>
        <h2>{book.subtitle}</h2>

        <select value={this.props.list} onChange={this.handleChange}>
          <option value="none">None</option>
          <option value="currentlyReading">Currently reading</option>
          <option value="wantToRead">Want to read</option>
          <option value="read">Read</option>
        </select>
      </li>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  addTocurrentlyReading: PropTypes.func.isRequired,
  addTowantToRead: PropTypes.func.isRequired,
  addToRead: PropTypes.func.isRequired
}

export default Book
