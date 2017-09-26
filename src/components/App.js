import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from './Header'
import HomePage from './HomePage'
import SearchPage from './SearchPage'
import * as BooksAPI from '../BooksAPI/'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: {
        byId: {},
        searchedById: {},
        searchedAllIds: [],
        currentlyReading: [],
        wantToRead: [],
        read: []
      }
    }  
  }

  /**
   * Used on the child components to set parent state
   * with books from the API
   * @param {Object} books The state object normalized
   */

  receiverBooks = books => {
    this.setState({
      books: Object.assign(this.state.books, books)
    })
  }

  /**
   * Used on the book component to change the shelf of the book
   * @param {Object} book The book object
   * @param {String} shelf The shelf name
   */

  setShelf = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf)
        .then(books => {
          const { byId, searchedById } = this.state.books
          const _book = byId[book.id] || searchedById[book.id]
          _book.shelf = shelf
          this.setState({
            books: Object.assign(this.state.books, books)
          })
        })
    }
  }

  /**
   * Used to gets the shelf of the book
   * @param {Object} book The book object
   * @return {String} The book shelf
   */
  
  getShelf = ({ id }) => {
    const { byId } = this.state.books
    return byId[id] ? byId[id].shelf : 'none'
  }

  /**
   * Used to remove the book from the shelf
   * @param {object} book the book object 
   */

  removeShelf = book => {
    if (book.shelf !== 'none') {
      BooksAPI.update(book, 'none')
        .then(books => {
          this.setState({
            books: Object.assign(this.state.books, books)
          })
        })
    }
  }

  /**
   * Used to search books
   * @param {String} query The string typed in the search bar
   */

  searchBooks = query => {
    BooksAPI.search(query, 50)
      .then(({ error, books }) => {
        if (error || books.error) {
          return this.setState({
            books: Object.assign(this.state.books, {
              searchedById: {},
              searchedAllIds: []
            })
          })
        }

        const searchedById = {}
        const searchedAllIds = []

        for (const book of books) {
          searchedById[book.id] = book
          searchedAllIds.push(book.id)
        }

        this.setState({
          books: Object.assign(this.state.books, { 
            searchedById,
            searchedAllIds
          })
        })
      })
  }

  render() {
    const { router: Router } = this.props

    const {
      byId,
      searchedById,
      searchedAllIds,
      currentlyReading,
      wantToRead,
      read
    } = this.state.books

    return (
      <Router>
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
                removeShelf={this.removeShelf}
                setShelf={this.setShelf} />
            </MuiThemeProvider>
          )}/>
          <Route exact path="/search" render={() => (
            <MuiThemeProvider>
              <SearchPage
                byId={searchedById}
                allIds={searchedAllIds}
                receiverBooks={this.receiverBooks}
                setShelf={this.setShelf}
                removeShelf={this.removeShelf}
                searchBooks={this.searchBooks}
                getShelf={this.getShelf} />
            </MuiThemeProvider>
          )}/>
        </div>
      </Router>
    )
  }
}

export default App
