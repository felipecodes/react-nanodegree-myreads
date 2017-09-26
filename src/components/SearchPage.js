import React, { Component } from 'react'
import SearchBar from './SearchBar'
import BookList from './BookList'
import css from './SearchPage.css'
import * as BooksAPI from '../BooksAPI/'

class SearchPage extends Component {
  componentWillMount() {
    BooksAPI.getAll()
      .then(books => this.props.receiverBooks(books))
  }

  render() {
    const books = this.props.allIds.map(id => this.props.byId[id])

    return (
      <div id="search-page" className={css.searchPage}>
        <SearchBar searchBooks={this.props.searchBooks} />
        <BookList
          books={books}
          addTocurrentlyReading={this.props.addTocurrentlyReading}
          addTowantToRead={this.props.addTowantToRead}
          addToRead={this.props.addToRead}
          removeShelf={this.props.removeShelf}
          getShelf={this.props.getShelf} />
      </div>
    )  
  }
}

export default SearchPage
