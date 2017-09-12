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
      currentlyReadingIds: [],
      wantReadIds: [],
      readIds: [],
      query: ''
    }
  }

  /**
   * Set the component state adding the book as currently reading
   * @param {Object} book The book object
   */

  addTocurrentlyReading = ({ id }) => {
    this.setState(prevState => {
      const {
        currentlyReadingIds,
        wantReadIds,
        readIds
      } = prevState.books

      // Does not change if already exists
      if (currentlyReadingIds.indexOf(id) > -1) {
        return prevState
      }

      // Remove the book of the "want to read" list
      let index = wantReadIds.indexOf(id)
      if (index > -1) {
        wantReadIds.splice(index, 1)
      }

      // Remove the book of the "read" list
      index = readIds.indexOf(id)
      if (index > -1) {
        readIds.splice(index, 1)
      }

      return {
        books: Object.assign(prevState.books, {
          currentlyReadingIds: [id, ...currentlyReadingIds],
          wantReadIds,
          readIds
        })
      }
    })
  }

  /**
   * @param {Object} book The book object
   */

  addToWantRead = ({ id }) => {
    this.setState(prevState => {
      const {
        currentlyReadingIds,
        wantReadIds,
        readIds
      } = prevState.books

      // Does not change if already exists
      if (wantReadIds.indexOf(id) > -1) {
        return prevState
      }

      // Remove the book of the "currently reading" list
      let index = currentlyReadingIds.indexOf(id)
      if (index > -1) {
        currentlyReadingIds.splice(index, 1)
      }

      // Remove the book of the "read" list
      index = readIds.indexOf(id)
      if (index > -1) {
        readIds.splice(index, 1)
      }

      return {
        books: Object.assign(prevState.books, {
          currentlyReadingIds,
          wantReadIds: [id, ...wantReadIds],
          readIds
        })
      }
    })
  }

  /**
   * @param {Object} book The book object
   */

  addToRead = ({ id }) => {
    this.setState(prevState => {
      const {
        currentlyReadingIds,
        wantReadIds,
        readIds
      } = prevState.books

      // Does not change if already exists
      if (readIds.indexOf(id) > -1) {
        return prevState
      }

      // Remove the book of the "currently reading" list
      let index = currentlyReadingIds.indexOf(id)
      if (index > -1) {
        currentlyReadingIds.splice(index, 1)
      }

      // Remove the book of the "want to read" list
      index = wantReadIds.indexOf(id)
      if (index > -1) {
        wantReadIds.splice(index, 1)
      }

      return {
        books: Object.assign(prevState.books, {
          currentlyReadingIds,
          wantReadIds,
          readIds: [id, ...readIds]
        })
      }
    })
  }

  /**
   * Search books
   * @param {String} query The string typed in the search bar
   */

  searchBooks = query => this.setState({ books: { query } })

  getSearchtedBooks = () => {
    const { byId, allIds, query } = this.state.books
    if (query === '') {
      return []
    }

    const match = new RegExp(escapeRegExp(query), 'i')
    const filtered = allIds.filter(id => match.test(byId[id].title))
    return filtered.map(id => byId[id])
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(res => res.json())
      .then(data => {
        const byId = {}
        const allIds = []

        for (const book of data.books) {
          byId[book.id] = book
          allIds.push(book.id)
        }

        this.setState({
          books: Object.assign(this.state.books,  { byId, allIds })
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
      currentlyReadingIds,
      wantReadIds,
      readIds
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
              currentlyReadingIds={currentlyReadingIds}
              wantReadIds={wantReadIds}
              readIds={readIds}
              addTocurrentlyReading={this.addTocurrentlyReading}
              addToWantRead={this.addToWantRead}
              addToRead={this.addToRead} />
          )}/>
          <Route exact path="/search" render={() => (
            <SearchPage
              byId={byId}
              allIds={allIds}
              addTocurrentlyReading={this.addTocurrentlyReading}
              addToWantRead={this.addToWantRead}
              addToRead={this.addToRead}
              getSearchtedBooks={this.getSearchtedBooks} />
          )}/>
        </div>
      </Router>
    )
  }
}

export default App
