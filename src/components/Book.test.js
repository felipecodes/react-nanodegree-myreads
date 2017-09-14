import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import Book from './Book'
import { books } from '../fixtures'

const [book] = books

describe('The Book component', () => {
  if (!process.env.CI) {
    it('Book render correctly', () => {
      const addTocurrentlyReading = jest.fn()
      const addToWantRead = jest.fn()
      const addToRead = jest.fn()

      const wrapper = shallow(
        <Book
          book={book}
          addTocurrentlyReading={addTocurrentlyReading}
          addToWantRead={addToWantRead}
          addToRead={addToRead} />
      )
      expect(wrapper).toMatchSnapshot()
    })
  }

  it('Book added in currently reading list', () =>  {
    const addTocurrentlyReading = jest.fn()
    const addToWantRead = jest.fn()
    const addToRead = jest.fn()

    const wrapper = mount(
      <Book
        book={book}
        addTocurrentlyReading={addTocurrentlyReading}
        addToWantRead={addToWantRead}
        addToRead={addToRead} />,
    )

    sinon.spy(Book.prototype, 'componentWillUpdate')
    wrapper.find('select').simulate('change', { target: { value: 'Currently Reading' } })
    expect(wrapper.state('list')).toEqual('Currently Reading')

    wrapper.update()
    expect(Book.prototype.componentWillUpdate.callCount).toEqual(2)
    expect(addTocurrentlyReading).toHaveBeenCalledTimes(1)
  })

  it('Book added in want to reading list', () => {
    const addTocurrentlyReading = jest.fn()
    const addToWantRead = jest.fn()
    const addToRead = jest.fn()

    const wrapper = mount(
      <Book
        book={book}
        addTocurrentlyReading={addTocurrentlyReading}
        addToWantRead={addToWantRead}
        addToRead={addToRead} />,
    )

    Book.prototype.componentWillUpdate.reset()
    wrapper.find('select').simulate('change', { target: { value: 'Want to Read' } })
    expect(wrapper.state('list')).toEqual('Want to Read')

    wrapper.update()
    expect(Book.prototype.componentWillUpdate.callCount).toEqual(2)
    expect(addToWantRead).toHaveBeenCalledTimes(1)
  })

  it('Book added in reading list', () => {
    const addTocurrentlyReading = jest.fn()
    const addToWantRead = jest.fn()
    const addToRead = jest.fn()

    const wrapper = mount(
      <Book
        book={book}
        addTocurrentlyReading={addTocurrentlyReading}
        addToWantRead={addToWantRead}
        addToRead={addToRead} />,
    )

    Book.prototype.componentWillUpdate.reset()
    wrapper.find('select').simulate('change', { target: { value: 'Read' } })
    expect(wrapper.state('list')).toEqual('Read')

    wrapper.update()
    expect(Book.prototype.componentWillUpdate.callCount).toEqual(2)
    expect(addToRead).toHaveBeenCalledTimes(1)
  })
})
