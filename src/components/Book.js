import React from 'react'
import PropTypes from 'prop-types'

function Book(props) {
  const {
    book,
    addTocurrentlyReading,
    addToWantRead,
    addToRead
  } = props

  return (
    <li>
      {book.title}
    </li>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  addTocurrentlyReading: PropTypes.func.isRequired,
  addToWantRead: PropTypes.func.isRequired,
  addToRead: PropTypes.func.isRequired
}

export default Book
