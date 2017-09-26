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
            shelf={props.getShelf(book)}
            book={book}
            setShelf={props.setShelf}
            removeShelf={props.removeShelf} />
        ))}
      </ul>
    </If>
  )
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  setShelf: PropTypes.func.isRequired,
  getShelf: PropTypes.func.isRequired,
  removeShelf: PropTypes.func.isRequired
}

export default BookList
