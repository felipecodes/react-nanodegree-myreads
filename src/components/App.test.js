import React from 'react'
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

  const wrapper = mount(<App />)

  it('App renders correctly', () => {
    expect(shallow(<App />)).toMatchSnapshot()
  })

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
})
