import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import If from './If'

function BookList(props) {
  const {
    addTocurrentlyReading,
    addToWantRead,
    addToRead,
    books
  } = props

  return (
    <If test={books.length > 0}>
      <ul>
        {books.map(book => (
          <Book
            key={book.id}
            book={book}
            addTocurrentlyReading={addTocurrentlyReading}
            addToWantRead={addToWantRead}
            addToRead={addToRead} />
        ))}
      </ul>
    </If>
  )
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  addTocurrentlyReading: PropTypes.func.isRequired,
  addToWantRead: PropTypes.func.isRequired,
  addToRead: PropTypes.func.isRequired
}

export default BookList
