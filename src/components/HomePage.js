import React from 'react'
import { Link } from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
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
      <FloatingActionButton
        iconStyle={{color: '#fff'}}>
        <Link to="/search" id="search-button">
          <ContentAdd />
        </Link>
      </FloatingActionButton>
    </div>
  )
}

export default HomePage
