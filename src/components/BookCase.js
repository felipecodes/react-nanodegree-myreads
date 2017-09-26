import React from 'react'
import PropTypes from 'prop-types'
import BookCaseRow from './BookCaseRow'
import css from './BookCase.css'

function BookCase(props) {
  return (
    <div className={css.bookCase}>
      <BookCaseRow
        title="Currently Reading"
        shelf="currentlyReading"
        byId={props.byId}
        booksIds={props.currentlyReading}
        removeShelf={props.removeShelf}
        setShelf={props.setShelf} />
      <BookCaseRow
        title="Want to Read"
        shelf="wantToRead"
        byId={props.byId}
        booksIds={props.wantToRead}
        removeShelf={props.removeShelf}
        setShelf={props.setShelf} />
      <BookCaseRow
        title="Read"
        shelf="read"
        byId={props.byId}
        booksIds={props.read}
        removeShelf={props.removeShelf}
        setShelf={props.setShelf} />
    </div>
  )
}

BookCase.propTypes = {
  byId: PropTypes.object.isRequired,
  currentlyReading: PropTypes.array.isRequired,
  wantToRead: PropTypes.array.isRequired,
  read: PropTypes.array.isRequired,
  removeShelf: PropTypes.func.isRequired,
  setShelf: PropTypes.func.isRequired
}

export default BookCase
