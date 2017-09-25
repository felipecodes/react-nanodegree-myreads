import React, { Component } from 'react'
import SearchBar from './SearchBar'
import BookList from './BookList'
import css from './SearchPage.css'

class SearchPage extends Component {
  render() {
    const {
      byId,
      allIds,
      addTocurrentlyReading,
      addTowantToRead,
      addToRead,
      searchBooks,
      searchClean,
      getList,
      removeShelf
    } = this.props

    const books = allIds.map(id => byId[id])

    return (
      <div id="search-page" className={css.searchPage}>
        <SearchBar searchBooks={searchBooks} searchClean={searchClean} />
        <BookList
          books={books}
          addTocurrentlyReading={addTocurrentlyReading}
          addTowantToRead={addTowantToRead}
          addToRead={addToRead}
          removeShelf={removeShelf}
          getList={getList} />
      </div>
    )
  }
}

export default SearchPage
