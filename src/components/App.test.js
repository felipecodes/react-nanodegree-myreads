import React, { Component } from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import App from './App'
import fixtures from '../fixtures'

// These tests do not run in the CI environment
if (!process.env.CI) {
  describe('Snapshots tests of the App component', () => {
    it('App renders correctly in home page', () => {
      const test = shallow(
        <App
          router={MemoryRouter}
          initialEntries={[ '/' ]}
          initialIndex={0} />
      )
      expect(test).toMatchSnapshot('Home page')
    })

    it('App renders correctly in search page', () => {
      const test = shallow(
        <App
          router={MemoryRouter}
          initialEntries={[ '/search' ]}
          initialIndex={0} />
      )
      expect(test).toMatchSnapshot('Search page')
    })
  })
}

describe('Moving the books between the shelves', () => {
  // These promise is returned by the fetch global function
  const promise = Promise.resolve({ json: () => fixtures })
  sinon.stub(global, 'fetch').callsFake(() => promise)

  // Mount app wrapper using the default location: { pathname: "/" }
  const wrapper = mount(<App router={MemoryRouter} />)

  it('Data fetch in componentDidMount', () => {
    promise.then(() => {
      const BOOK = 'jAUODAAAQBAJ'
      const { byId, allIds } = wrapper.state('books')
      expect(byId).toHaveProperty(BOOK)
      expect(allIds.indexOf(BOOK) > -1).toEqual(true)
    })
  })

  it('Adding book in currently list', () => {
    const BOOK = 'jAUODAAAQBAJ'
    wrapper.node.addTocurrentlyReading({ id: BOOK })
    const {
      currentlyReadingIds,
      wantReadIds,
      readIds
    } = wrapper.state('books')
    expect(currentlyReadingIds.indexOf(BOOK) > -1)
      .toEqual(true)
    expect(wantReadIds.indexOf(BOOK) > -1)
      .toEqual(false)
    expect(readIds.indexOf(BOOK) > -1)
      .toEqual(false)
  })

  it('Adding book in want list', () => {
    const BOOK = 'sJf1vQAACAAJ'
    wrapper.node.addToWantRead({ id: BOOK })
    const {
      currentlyReadingIds,
      wantReadIds,
      readIds
    } = wrapper.state('books')
    expect(wantReadIds.indexOf(BOOK) > -1)
      .toEqual(true)
    expect(currentlyReadingIds.indexOf(BOOK) > -1)
      .toEqual(false)
    expect(readIds.indexOf(BOOK) > -1)
      .toEqual(false)
  })

  it('Adding book in read list', () => {
    const BOOK = 'nggnmAEACAAJ'
    wrapper.node.addToRead({ id: BOOK })
    const {
      currentlyReadingIds,
      wantReadIds,
      readIds
    } = wrapper.state('books')
    expect(readIds.indexOf(BOOK) > -1)
      .toEqual(true)
    expect(currentlyReadingIds.indexOf(BOOK) > -1)
      .toEqual(false)
    expect(wantReadIds.indexOf(BOOK) > -1)
      .toEqual(false)
  })

  it('Try move book that is already on the currently list to the currently list', () => {
    const BOOK = 'jAUODAAAQBAJ'

    wrapper.node.addTocurrentlyReading({ id: BOOK })

    const {
      currentlyReadingIds,
      wantReadIds,
      readIds
    } = wrapper.state('books')
    const isBookInWantList = wantReadIds.indexOf(BOOK) > -1
    const isBookInReadList = readIds.indexOf(BOOK) > -1
    const booksInCurrently = currentlyReadingIds.filter(id => id === BOOK)
    const [book] = booksInCurrently

    expect(booksInCurrently.length === 1 && book === BOOK)
      .toEqual(true)
    expect(isBookInWantList)
      .toEqual(false)
    expect(isBookInReadList)
      .toEqual(false)
  })

  it('Move book that is on the want list to the currently list', () => {
    const BOOK = 'IOejDAAAQBAJ'

    wrapper.node.addToWantRead({ id: BOOK })
    wrapper.node.addTocurrentlyReading({ id: BOOK })

    const {
      currentlyReadingIds,
      wantReadIds,
      readIds
    } = wrapper.state('books')
    const isBookInWantList = wantReadIds.indexOf(BOOK) > -1
    const isBookInReadList = readIds.indexOf(BOOK) > -1
    const booksInCurrently = currentlyReadingIds.filter(id => id === BOOK)
    const [book] = booksInCurrently

    expect(booksInCurrently.length === 1 && book === BOOK)
      .toEqual(true)
    expect(isBookInWantList)
      .toEqual(false)
    expect(isBookInReadList)
      .toEqual(false)
  })

  it('adding the book from want list to currently list', () => {
    const BOOK = 'IOejDAAAQBAJ'

    wrapper.node.addToWantRead({ id: BOOK })
    wrapper.node.addTocurrentlyReading({ id: BOOK })

    const {
      currentlyReadingIds,
      wantReadIds,
      readIds
    } = wrapper.state('books')
    const isBookInWantList = wantReadIds.indexOf(BOOK) > -1
    const isBookInReadList = readIds.indexOf(BOOK) > -1
    const booksInCurrently = currentlyReadingIds.filter(id => id === BOOK)
    const [book] = booksInCurrently

    expect(booksInCurrently.length === 1 && book === BOOK)
      .toEqual(true)
    expect(isBookInWantList)
      .toEqual(false)
    expect(isBookInReadList)
      .toEqual(false)
  })

  it('adding the book from read list to currently list', () => {
    const BOOK = 'IOejDAAAQBAJ'

    wrapper.node.addToRead({ id: BOOK })
    wrapper.node.addTocurrentlyReading({ id: BOOK })

    const {
      currentlyReadingIds,
      wantReadIds,
      readIds
    } = wrapper.state('books')
    const isBookInWantList = wantReadIds.indexOf(BOOK) > -1
    const isBookInReadList = readIds.indexOf(BOOK) > -1
    const booksInCurrently = currentlyReadingIds.filter(id => id === BOOK)
    const [book] = booksInCurrently

    expect(booksInCurrently.length === 1 && book === BOOK)
      .toEqual(true)
    expect(isBookInWantList)
      .toEqual(false)
    expect(isBookInReadList)
      .toEqual(false)
  })

  it('adding the book from want list to want list', () => {
    const BOOK = 'sJf1vQAACAAJ'
    wrapper.node.addToWantRead({ id: BOOK })

    const {
      currentlyReadingIds,
      wantReadIds,
      readIds
    } = wrapper.state('books')

    const isBookInCurrently = currentlyReadingIds.indexOf(BOOK) > -1
    const isBookInReadList = readIds.indexOf(BOOK) > -1
    const booksInWantList = wantReadIds.filter(id => id === BOOK)
    const [book] = booksInWantList

    expect(booksInWantList.length === 1 && book === BOOK)
      .toEqual(true)
    expect(isBookInCurrently)
      .toEqual(false)
    expect(isBookInReadList)
      .toEqual(false)
  })

  it('adding the book from read list to want list', () => {
    const BOOK = 'sJf1vQAACAAJ'
    wrapper.node.addToRead({ id: BOOK })
    wrapper.node.addToWantRead({ id: BOOK })

    const {
      currentlyReadingIds,
      wantReadIds,
      readIds
    } = wrapper.state('books')

    const isBookInCurrently = currentlyReadingIds.indexOf(BOOK) > -1
    const isBookInReadList = readIds.indexOf(BOOK) > -1
    const booksInWantList = wantReadIds.filter(id => id === BOOK)
    const [book] = booksInWantList

    expect(booksInWantList.length === 1 && book === BOOK)
      .toEqual(true)
    expect(isBookInCurrently)
      .toEqual(false)
    expect(isBookInReadList)
      .toEqual(false)
  })

  it('adding the book from read list to read list', () => {
    const BOOK = 'nggnmAEACAAJ'
    wrapper.node.addToRead({ id: BOOK })

    const {
      currentlyReadingIds,
      wantReadIds,
      readIds
    } = wrapper.state('books')

    const isBookInCurrently = currentlyReadingIds.indexOf(BOOK) > -1
    const isBookInWantList = wantReadIds.indexOf(BOOK) > -1
    const booksInReadList = readIds.filter(id => id === BOOK)
    const [book] = booksInReadList

    expect(booksInReadList.length === 1 && book === BOOK)
      .toEqual(true)
    expect(isBookInCurrently)
      .toEqual(false)
    expect(isBookInWantList)
      .toEqual(false)
  })

  it('Searching a book', () => {
    const wrapper = mount(
      <App
        router={MemoryRouter}
        initialEntries={[ '/search' ]}
        initialIndex={0} />
    )
    const input = wrapper.find('#search-input')
    input.simulate('input', { target: { value: 'Linux' } })
    console.log(wrapper.state('books').allIds.length)
    expect(wrapper.state('books').allIds.length).toEqual(0)
  })
})
