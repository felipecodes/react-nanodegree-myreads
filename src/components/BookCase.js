import React from 'react'
import PropTypes from 'prop-types'
import BookCaseRow from './BookCaseRow'

function BookCase(props) {
  const {
    byId,
    currentlyReadingIds,
    wantReadIds,
    readIds,
    addTocurrentlyReading,
    addToWantRead,
    addToRead
  } = props

  return (
    <div>
      <BookCaseRow
        title="Currently Reading"
        byId={byId}
        booksIds={currentlyReadingIds}
        addTocurrentlyReading={addTocurrentlyReading}
        addToWantRead={addToWantRead}
        addToRead={addToRead} />
      <BookCaseRow
        title="Want to Read"
        byId={byId}
        booksIds={wantReadIds}
        addTocurrentlyReading={addTocurrentlyReading}
        addToWantRead={addToWantRead}
        addToRead={addToRead} />
      <BookCaseRow
        title="Read"
        byId={byId}
        booksIds={readIds}
        addTocurrentlyReading={addTocurrentlyReading}
        addToWantRead={addToWantRead}
        addToRead={addToRead} />
    </div>
  )
}

BookCase.propTypes = {
  byId: PropTypes.object.isRequired,
  currentlyReadingIds: PropTypes.array.isRequired,
  wantReadIds: PropTypes.array.isRequired,
  readIds: PropTypes.array.isRequired,
  addTocurrentlyReading: PropTypes.func.isRequired,
  addToWantRead: PropTypes.func.isRequired,
  addToRead: PropTypes.func.isRequired
}

export default BookCase
