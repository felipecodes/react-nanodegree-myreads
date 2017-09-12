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
    getSearchtedBooks
  } = props

  return (
    <div id="search-page">
      <SearchBar byId={byId} allIds={allIds}/>
      <BookList
        books={getSearchtedBooks()}
        addTocurrentlyReading={addTocurrentlyReading}
        addToWantRead={addToWantRead}
        addToRead={addToRead} />
    </div>
  )
}

export default SearchPage
