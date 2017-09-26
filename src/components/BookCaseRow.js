import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import If from './If'
import css from './BookCaseRow.css'

function BookCaseRow(props) {
  return (
    <div className={css.bookCaseRow}>
      <If test={props.booksIds && props.booksIds.length > 0}>
        <div>
          <h1>{props.title}</h1>
          <ul className={css.list}>
            {props.booksIds.map(id => (
              props.byId[id] ? <Book
                key={id}
                shelf={props.shelf}
                book={props.byId[id]}
                removeShelf={props.removeShelf}
                setShelf={props.setShelf} /> : null
            ))}
          </ul>
        </div>
      </If>
    </div>
  )
}

BookCaseRow.propTypes = {
  title: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  byId: PropTypes.object.isRequired,
  booksIds: PropTypes.array.isRequired,
  removeShelf: PropTypes.func.isRequired,
  setShelf: PropTypes.func.isRequired
}

export default BookCaseRow
