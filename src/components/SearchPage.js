import React, { Component } from 'react'
import SearchBar from './SearchBar'
import BookList from './BookList'
import css from './SearchPage.css'
import * as BooksAPI from '../BooksAPI/'

class SearchPage extends Component {
  render() {
    const {
      byId,
      allIds,
      search,
      addTocurrentlyReading,
      addTowantToRead,
      addToRead,
      searchBooks,
      searchClean,
      getList
    } = this.props

    const books = search ? allIds.map(id => byId[id]) : []

    return (
      <div id="search-page" className={css.searchPage}>
        <SearchBar searchBooks={searchBooks} searchClean={searchClean} />
        <BookList
          books={books}
          addTocurrentlyReading={addTocurrentlyReading}
          addTowantToRead={addTowantToRead}
          addToRead={addToRead}
          getList={getList} />
      </div>
    )
  }
}

export default SearchPage
