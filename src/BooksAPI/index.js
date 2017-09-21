const api = "https://reactnd-books-api.udacity.com"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

function normalizr({ books }) {
  const state = {
    byId: {},
    allIds: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  for (const book of books) {
    state.byId[book.id] = book
    state.allIds.push(book.id)
    if (state[book.shelf]) {
      state[book.shelf].push(book.id)
    }
  }

  return state
}

export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data =>{
      if (!data.error && data.books && data.books.length > 0) {
        return normalizr(data)
      }
    })

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  })
    .then(res => res.json())

export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.error && data.books && data.books.length > 0) {
        const { books } = data
        const searchedById = {}
        const searchedAllIds = []

        for (const book of books) {
          searchedById[book.id] = book
          searchedAllIds.push(book.id)
        }

        return {
          searchedById,
          searchedAllIds
        }
      }
    })
    .catch(err => console.debug(err))
