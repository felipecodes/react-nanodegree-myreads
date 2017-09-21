import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from './Header'
import HomePage from './HomePage'
import SearchPage from './SearchPage'
import * as BooksAPI from '../BooksAPI/'

class App extends Component {
  state = {
    books: {
      byId: {},
      allIds: [],
      searchedById: {},
      searchedAllIds: [],
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  bookInShelf = (id, shelf) => {
    const { byId, searchedById } = this.state.books
    return (byId[id] && byId[id].shelf === shelf) ||
           (searchedById[id] && searchedById[id].shelf === shelf)
  }

  receiverBooks = books => {
    this.setState({
      books: Object.assign(this.state.books, books)
    })
  }

  /**
   * Set the component state adding the book as currently reading
   * @param {Object} book The book object
   */

  addTocurrentlyReading = ({ id }) => {
    const SHELF = 'currentlyReading'
    // Does not change if already exists
    if (this.bookInShelf(id, SHELF)) {
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
    if (this.bookInShelf(id, SHELF)) {
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
    if (this.bookInShelf(id, SHELF)) {
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
      searchedById: {},
      searchedAllIds: []
    }
  })

  /**
   * Search books
   * @param {String} query The string typed in the search bar
   */

  searchBooks = query => {
    BooksAPI.search(query, 50)
      .then(books => {
        if (books) {
          this.setState({
            books: Object.assign(this.state.books, books)
          })
        }
      })
      .catch(err => console.error(err))
  }

  getList = ({ id }) => {
    const {
      currentlyReading,
      wantToRead,
      read
    } = this.state.books

    if (currentlyReading.indexOf(id) > -1) {
      return 'currentlyReading'
    }

    if (wantToRead.indexOf(id) > -1) {
      return 'wantToRead'
    }

    if (read.indexOf(id) > -1) {
      return 'read'
    }

    return 'none'
  }

  render() {
    const {
      router: Router,
      initialEntries,
      initialIndex
    } = this.props

    const {
      byId,
      searchedById,
      searchedAllIds,
      currentlyReading,
      wantToRead,
      read
    } = this.state.books

    const conditionalProps = initialEntries ? {
      initialEntries,
      initialIndex
    } : {}

    return (
      <Router {...conditionalProps} >
        <div>
          <MuiThemeProvider>
            <Header />
          </MuiThemeProvider>
          <Route exact path='/' render={({ history }) => (
            <MuiThemeProvider>
              <HomePage
                history={history}
                byId={byId}
                currentlyReading={currentlyReading}
                wantToRead={wantToRead}
                read={read}
                receiverBooks={this.receiverBooks}
                addTocurrentlyReading={this.addTocurrentlyReading}
                addTowantToRead={this.addTowantToRead}
                addToRead={this.addToRead} />
            </MuiThemeProvider>
          )}/>
          <Route exact path="/search" render={() => (
            <MuiThemeProvider>
              <SearchPage
                byId={searchedById}
                allIds={searchedAllIds}
                addTocurrentlyReading={this.addTocurrentlyReading}
                addTowantToRead={this.addTowantToRead}
                addToRead={this.addToRead}
                searchBooks={this.searchBooks}
                searchClean={this.searchClean}
                getList={this.getList} />
            </MuiThemeProvider>
          )}/>
        </div>
      </Router>
    )
  }
}

export default App
