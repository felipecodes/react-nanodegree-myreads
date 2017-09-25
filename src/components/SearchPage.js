import React from 'react'
import SearchBar from './SearchBar'
import BookList from './BookList'
import css from './SearchPage.css'

function SearchPage(props) {
  const {
    byId,
    allIds,
    addTocurrentlyReading,
    addTowantToRead,
    addToRead,
    searchBooks,
    removeShelf
  } = props

  const books = allIds.map(id => byId[id])

  return (
    <div id="search-page" className={css.searchPage}>
      <SearchBar searchBooks={searchBooks} />
      <BookList
        books={books}
        addTocurrentlyReading={addTocurrentlyReading}
        addTowantToRead={addTowantToRead}
        addToRead={addToRead}
        removeShelf={removeShelf} />
    </div>
  )
}

export default SearchPage
