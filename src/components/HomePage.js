import React from 'react'
import { Link } from 'react-router-dom'
import BookCase from './BookCase'

function HomePage(props) {
  const {
    byId,
    currentlyReadingIds,
    wantReadIds,
    readIds,
    addTocurrentlyReading,
    addToWantRead,
    addToRead,
  } = props

  return (
    <div>
      <BookCase
        byId={byId}
        currentlyReadingIds={currentlyReadingIds}
        wantReadIds={wantReadIds}
        readIds={readIds}
        addTocurrentlyReading={addTocurrentlyReading}
        addToWantRead={addToWantRead}
        addToRead={addToRead} />
      <Link to="/search" id="search-button">Search</Link>
    </div>
  )
}

export default HomePage
