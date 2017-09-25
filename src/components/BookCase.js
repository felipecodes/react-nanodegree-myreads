import React from 'react'
import PropTypes from 'prop-types'
import BookCaseRow from './BookCaseRow'
import css from './BookCase.css'

function BookCase(props) {
  const {
    byId,
    currentlyReading,
    wantToRead,
    read,
    addTocurrentlyReading,
    addTowantToRead,
    addToRead,
    removeShelf
  } = props

  return (
    <div className={css.bookCase}>
      <BookCaseRow
        title="Currently Reading"
        list="currentlyReading"
        byId={byId}
        booksIds={currentlyReading}
        addTocurrentlyReading={addTocurrentlyReading}
        addTowantToRead={addTowantToRead}
        addToRead={addToRead}
        removeShelf={removeShelf} />
      <BookCaseRow
        title="Want to Read"
        list="wantToRead"
        byId={byId}
        booksIds={wantToRead}
        addTocurrentlyReading={addTocurrentlyReading}
        addTowantToRead={addTowantToRead}
        addToRead={addToRead}
        removeShelf={removeShelf} />
      <BookCaseRow
        title="Read"
        list="read"
        byId={byId}
        booksIds={read}
        addTocurrentlyReading={addTocurrentlyReading}
        addTowantToRead={addTowantToRead}
        addToRead={addToRead}
        removeShelf={removeShelf} />
    </div>
  )
}

BookCase.propTypes = {
  byId: PropTypes.object.isRequired,
  currentlyReading: PropTypes.array.isRequired,
  wantToRead: PropTypes.array.isRequired,
  read: PropTypes.array.isRequired,
  addTocurrentlyReading: PropTypes.func.isRequired,
  addTowantToRead: PropTypes.func.isRequired,
  addToRead: PropTypes.func.isRequired
}

export default BookCase
