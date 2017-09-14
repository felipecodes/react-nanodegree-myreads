import React from 'react'
import SearchBar from './SearchBar'
import BookList from './BookList'

function SearchPage(props) {
  const {
    byId,
    allIds,
    addTocurrentlyReading,
    addToWantRead,
    addToRead,
    searchBooks
  } = props

  const books = allIds.map(id => byId[id])

  return (
    <div id="search-page">
      <SearchBar searchBooks={searchBooks} />
      <BookList
        books={books}
        addTocurrentlyReading={addTocurrentlyReading}
        addToWantRead={addToWantRead}
        addToRead={addToRead} />
    </div>
  )
}

export default SearchPage
