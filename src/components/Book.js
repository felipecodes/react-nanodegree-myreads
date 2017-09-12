import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  state = { list: '' }

  componentWillUpdate() {
    switch (this.state.list) {
      case 'Currently Reading':
        this.props.addTocurrentlyReading(this.props.book)
        break
      case 'Want to Read':
        this.props.addToWantRead(this.props.book)
        break
      case 'Read':
        this.props.addToRead(this.props.book)
        break
      default:
    }
  }

  handleChange = event => {
    event.preventDefault()
    this.setState({ list: event.target.value })
  }

  render() {
    const { book } = this.props
    return (
      <li>
        <h1>{book.title}</h1>
        <h2>{book.subtitle}</h2>

        <select onChange={this.handleChange}>
          <option></option>
          <option>Currently Reading</option>
          <option>Want Read</option>
          <option>Read</option>
        </select>
      </li>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  addTocurrentlyReading: PropTypes.func.isRequired,
  addToWantRead: PropTypes.func.isRequired,
  addToRead: PropTypes.func.isRequired
}

export default Book
