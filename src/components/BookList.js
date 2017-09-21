import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import If from './If'
import css from './BookList.css'

function BookList(props) {
  const {
    addTocurrentlyReading,
    addTowantToRead,
    addToRead,
    getList,
    books
  } = props

  return (
    <If test={books.length > 0}>
      <ul className={css.list}>
        {books.map(book => (
          <Book
            key={book.id}
            list={getList(book)}
            book={book}
            addTocurrentlyReading={addTocurrentlyReading}
            addTowantToRead={addTowantToRead}
            addToRead={addToRead} />
        ))}
      </ul>
    </If>
  )
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  addTocurrentlyReading: PropTypes.func.isRequired,
  addTowantToRead: PropTypes.func.isRequired,
  addToRead: PropTypes.func.isRequired
}

export default BookList
