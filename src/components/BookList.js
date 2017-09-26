import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import If from './If'
import css from './BookList.css'

function BookList(props) {
  return (
    <If test={props.books.length > 0}>
      <ul className={css.list}>
        {props.books.map(book => (
          <Book
            key={book.id}
            list={props.getShelf(book)}
            book={book}
            addTocurrentlyReading={props.addTocurrentlyReading}
            addTowantToRead={props.addTowantToRead}
            addToRead={props.addToRead}
            removeShelf={props.removeShelf} />
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
