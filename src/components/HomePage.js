import React from 'react'
import { Link } from 'react-router-dom'
import BookCase from './BookCase'

function HomePage(props) {
  const {
    byId,
    currentlyReading,
    wantToRead,
    read,
    addTocurrentlyReading,
    addTowantToRead,
    addToRead,
  } = props

  return (
    <div>
      <BookCase
        byId={byId}
        currentlyReading={currentlyReading}
        wantToRead={wantToRead}
        read={read}
        addTocurrentlyReading={addTocurrentlyReading}
        addTowantToRead={addTowantToRead}
        addToRead={addToRead} />
      <Link to="/search" id="search-button">Search</Link>
    </div>
  )
}

export default HomePage
