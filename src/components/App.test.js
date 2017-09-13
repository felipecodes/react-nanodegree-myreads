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
      expect(wrapper.state('books').byId).toHaveProperty('jAUODAAAQBAJ')
      expect(wrapper.state('books').allIds.indexOf('jAUODAAAQBAJ') > -1).toEqual(true)
    })
  })

  it('adding book in currently reading list', () => {
    wrapper.node.addTocurrentlyReading({ id: 'jAUODAAAQBAJ' })
    expect(wrapper.state('books').currentlyReadingIds.indexOf('jAUODAAAQBAJ') > -1)
      .toEqual(true)
    expect(wrapper.state('books').wantReadIds.indexOf('jAUODAAAQBAJ') > -1)
      .toEqual(false)
    expect(wrapper.state('books').readIds.indexOf('jAUODAAAQBAJ') > -1)
      .toEqual(false)
  })

  it('adding book in want to read list', () => {
    wrapper.node.addToWantRead({ id: 'jAUODAAAQBAJ' })
    expect(wrapper.state('books').wantReadIds.indexOf('jAUODAAAQBAJ') > -1)
      .toEqual(true)
    expect(wrapper.state('books').currentlyReadingIds.indexOf('jAUODAAAQBAJ') > -1)
      .toEqual(false)
    expect(wrapper.state('books').readIds.indexOf('jAUODAAAQBAJ') > -1)
      .toEqual(false)
  })

  it('adding book in read list', () => {
    wrapper.node.addToRead({ id: 'jAUODAAAQBAJ' })
    expect(wrapper.state('books').readIds.indexOf('jAUODAAAQBAJ') > -1)
      .toEqual(true)
    expect(wrapper.state('books').currentlyReadingIds.indexOf('jAUODAAAQBAJ') > -1)
      .toEqual(false)
    expect(wrapper.state('books').wantReadIds.indexOf('jAUODAAAQBAJ') > -1)
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
