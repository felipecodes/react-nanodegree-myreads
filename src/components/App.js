import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import Header from './Header'
import HomePage from './HomePage'
import SearchPage from './SearchPage'
import * as BooksAPI from '../BooksAPI/'

class App extends Component {
  state = {
    books: {
      byId: {},
      allIds: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
      search: false
    }
  }

  /**
   * Set the component state adding the book as currently reading
   * @param {Object} book The book object
   */

  addTocurrentlyReading = ({ id }) => {
    const SHELF = 'currentlyReading'
    // Does not change if already exists
    if (this.state.books.byId[id].shelf === SHELF) {
      return
    }

    BooksAPI.update({ id }, SHELF)
      .then(books => {
        this.setState({
          books: Object.assign(this.state.books, books)
        })
      })
  }

  /**
   * @param {Object} book The book object
   */

  addTowantToRead = ({ id }) => {
    const SHELF = 'wantToRead'
    // Does not change if already exists
    if (this.state.books.byId[id].shelf === SHELF) {
      return
    }

    BooksAPI.update({ id }, SHELF)
      .then(books => {
        this.setState({
          books: Object.assign(this.state.books, books)
        })
      })
  }

  /**
   * @param {Object} book The book object
   */

  addToRead = ({ id }) => {
    const SHELF = 'read'
    // Does not change if already exists
    if (this.state.books.byId[id].shelf === SHELF) {
      return
    }

    BooksAPI.update({ id }, SHELF)
      .then(books => {
        this.setState({
          books: Object.assign(this.state.books, books)
        })
      })
  }

  /**
   * These is called to indicate that the user stoped searching
   */

  searchClean = () => this.setState({
    books: {
      byId: {},
      allIds: [],
      search: false
    }
  })

  /**
   * Search books
   * @param {String} query The string typed in the search bar
   */

  searchBooks = query => {
    BooksAPI.search(query, 50)
      .then(books => {
        this.setState({
          books: Object.assign(this.state.books, books, { search: true })
        })
      })
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({
          books: Object.assign(this.state.books,  books)
        })
      })
  }

  render() {
    const {
      router: Router,
      initialEntries,
      initialIndex
    } = this.props

    const {
      byId,
      allIds,
      currentlyReading,
      wantToRead,
      read,
      search
    } = this.state.books

    const conditionalProps = initialEntries ? {
      initialEntries,
      initialIndex
    } : {}

    return (
      <Router {...conditionalProps} >
        <div>
          <Header />
          <Route exact path='/' render={() => (
            <HomePage
              byId={byId}
              currentlyReading={currentlyReading}
              wantToRead={wantToRead}
              read={read}
              addTocurrentlyReading={this.addTocurrentlyReading}
              addTowantToRead={this.addTowantToRead}
              addToRead={this.addToRead} />
          )}/>
          <Route exact path="/search" render={() => (
            <SearchPage
              byId={byId}
              allIds={allIds}
              search={search}
              addTocurrentlyReading={this.addTocurrentlyReading}
              addTowantToRead={this.addTowantToRead}
              addToRead={this.addToRead}
              searchBooks={this.searchBooks}
              searchClean={this.searchClean} />
          )}/>
        </div>
      </Router>
    )
  }
}

export default App
