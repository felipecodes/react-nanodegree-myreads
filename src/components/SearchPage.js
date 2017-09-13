import React from 'react'
import SearchBar from './SearchBar'
import BookList from './BookList'

function SearchPage(props) {
  const {
    byId,
    addTocurrentlyReading,
    addToWantRead,
    addToRead,
    getSearchtedBooks,
    searchBooks
  } = props

  return (
    <div id="search-page">
      <SearchBar searchBooks={searchBooks} />
      <BookList
        books={getSearchtedBooks()}
        addTocurrentlyReading={addTocurrentlyReading}
        addToWantRead={addToWantRead}
        addToRead={addToRead} />
    </div>
  )
}

export default SearchPage
