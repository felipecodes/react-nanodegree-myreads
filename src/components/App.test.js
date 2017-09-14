import React, { Component } from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import App from './App'
import fixtures from '../fixtures'

describe('App component', () => {
  const promise = Promise.resolve({
    json() {
      return fixtures
    }
  })

  sinon.stub(global, 'fetch').callsFake(() => promise)

  // Mount using the default location: { pathname: "/" }
  const wrapper = mount(<App router={MemoryRouter} />)

  if (!process.env.CI) {
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
  }

  it('data fetch in componentDidMount', () => {
    promise.then(() => {
      const BOOK = 'jAUODAAAQBAJ'
      const { byId, allIds} = wrapper.state('books')
      expect(byId).toHaveProperty(BOOK)
      expect(allIds.indexOf(BOOK) > -1).toEqual(true)
    })
  })

  it('adding book in currently list', () => {
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

  it('adding book in want list', () => {
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

  it('adding book in read list', () => {
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

  it('adding the book from currently list to currently list', () => {
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

  it('Searching a book', () => {
    const wrapper = mount(
      <App
        router={MemoryRouter}
        initialEntries={[ '/search' ]}
        initialIndex={0} />
    )
    const input = wrapper.find('#search-input')
    input.simulate('input', { target: { value: 'Linux' } })
    expect(wrapper.state('books').query).toEqual('Linux')
  })
})
