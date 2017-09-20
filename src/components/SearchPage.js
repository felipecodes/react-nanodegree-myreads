import React from 'react'
import SearchBar from './SearchBar'
import BookList from './BookList'
import css from './SearchPage.css'

function SearchPage(props) {
  const {
    byId,
    allIds,
    search,
    addTocurrentlyReading,
    addTowantToRead,
    addToRead,
    searchBooks,
    searchClean
  } = props

  const books = search ? allIds.map(id => byId[id]) : []

  return (
    <div id="search-page" className={css.searchPage}>
      <SearchBar searchBooks={searchBooks} searchClean={searchClean} />
      <BookList
        books={books}
        addTocurrentlyReading={addTocurrentlyReading}
        addTowantToRead={addTowantToRead}
        addToRead={addToRead} />
    </div>
  )
}

export default SearchPage
