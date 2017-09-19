import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import If from './If'
import css from './BookCaseRow.css'

function BookCaseRow(props) {
  const {
    title,
    list,
    byId,
    booksIds,
    addTocurrentlyReading,
    addTowantToRead,
    addToRead
  } = props

  return (
    <div className={css.bookCaseRow}>
      <If test={booksIds && booksIds.length > 0}>
        <div>
          <h1>{title}</h1>
          <ul className={css.list}>
            {booksIds.map(id => (
              <Book
                key={id}
                list={list}
                book={byId[id]}
                addTocurrentlyReading={addTocurrentlyReading}
                addTowantToRead={addTowantToRead}
                addToRead={addToRead} />
            ))}
          </ul>
        </div>
      </If>
    </div>
  )
}

BookCaseRow.propTypes = {
  title: PropTypes.string.isRequired,
  byId: PropTypes.object.isRequired,
  booksIds: PropTypes.array.isRequired,
  addTocurrentlyReading: PropTypes.func.isRequired,
  addTowantToRead: PropTypes.func.isRequired,
  addToRead: PropTypes.func.isRequired
}

export default BookCaseRow
