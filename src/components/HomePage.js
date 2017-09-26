import React, { Component } from 'react'
import BookCase from './BookCase'
import SearchButtom from './SearchButtom'
import * as BooksAPI from '../BooksAPI'

class HomePage extends Component {
  handleClick = event => {
    event.preventDefault()
    this.props.history.push('/search')
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => this.props.receiverBooks(books))
  }

  render() {
    return (
      <div>
        <BookCase
          byId={this.props.byId}
          currentlyReading={this.props.currentlyReading}
          wantToRead={this.props.wantToRead}
          read={this.props.read}
          removeShelf={this.props.removeShelf}
          setShelf={this.props.setShelf} />
        <SearchButtom onClick={this.handleClick} />
      </div>
    )
  }
}

export default HomePage
