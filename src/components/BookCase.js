import React from 'react'
import PropTypes from 'prop-types'
import BookCaseRow from './BookCaseRow'

function BookCase(props) {
  const {
    byId,
    currentlyReading,
    wantToRead,
    read,
    addTocurrentlyReading,
    addTowantToRead,
    addToRead
  } = props

  return (
    <div>
      <BookCaseRow
        title="Currently Reading"
        list="currentlyReading"
        byId={byId}
        booksIds={currentlyReading}
        addTocurrentlyReading={addTocurrentlyReading}
        addTowantToRead={addTowantToRead}
        addToRead={addToRead} />
      <BookCaseRow
        title="Want to Read"
        list="wantToRead"
        byId={byId}
        booksIds={wantToRead}
        addTocurrentlyReading={addTocurrentlyReading}
        addTowantToRead={addTowantToRead}
        addToRead={addToRead} />
      <BookCaseRow
        title="Read"
        list="read"
        byId={byId}
        booksIds={read}
        addTocurrentlyReading={addTocurrentlyReading}
        addTowantToRead={addTowantToRead}
        addToRead={addToRead} />
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
