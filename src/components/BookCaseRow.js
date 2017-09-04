import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import If from './If'

function BookCaseRow(props) {
  const {
    title,
    byId,
    booksIds,
    addTocurrentlyReading,
    addToWantRead,
    addToRead
  } = props

  return (
    <div>
      <h1>{title}</h1>
      <If test={booksIds && booksIds.length > 0}>
        <ul>
          {booksIds.map(id => (
            <Book
              key={id}
              book={byId[id]}
              addTocurrentlyReading={addTocurrentlyReading}
              addToWantRead={addToWantRead}
              addToRead={addToRead} />
          ))}
        </ul>
      </If>
    </div>
  )
}

BookCaseRow.propTypes = {
  title: PropTypes.string.isRequired,
  byId: PropTypes.object.isRequired,
  booksIds: PropTypes.array.isRequired,
  addTocurrentlyReading: PropTypes.func.isRequired,
  addToWantRead: PropTypes.func.isRequired,
  addToRead: PropTypes.func.isRequired
}

export default BookCaseRow
