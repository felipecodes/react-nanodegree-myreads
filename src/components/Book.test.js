import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import Book from './Book'
import { books as fixtures } from '../fixtures'

const [book] = fixtures.books

if (!process.env.CI) {
  describe('', () => {
    it('Book render correctly', () => {
      const addTocurrentlyReading = jest.fn()
      const addTowantToRead = jest.fn()
      const addToRead = jest.fn()

      const wrapper = shallow(
        <Book
          book={book}
          addTocurrentlyReading={addTocurrentlyReading}
          addTowantToRead={addTowantToRead}
          addToRead={addToRead} />
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
}

describe('The Book component', () => {
  it('Book added in currently reading list', () =>  {
    const addTocurrentlyReading = jest.fn()
    const addTowantToRead = jest.fn()
    const addToRead = jest.fn()

    const wrapper = mount(
      <Book
        book={book}
        addTocurrentlyReading={addTocurrentlyReading}
        addTowantToRead={addTowantToRead}
        addToRead={addToRead} />,
    )

    wrapper.find('select').simulate('change', { target: { value: 'Currently Reading' } })
    expect(addTocurrentlyReading).toHaveBeenCalledTimes(1)
  })

  it('Book added in want to reading list', () => {
    const addTocurrentlyReading = jest.fn()
    const addTowantToRead = jest.fn()
    const addToRead = jest.fn()

    const wrapper = mount(
      <Book
        book={book}
        addTocurrentlyReading={addTocurrentlyReading}
        addTowantToRead={addTowantToRead}
        addToRead={addToRead} />,
    )

    wrapper.find('select').simulate('change', { target: { value: 'Want to Read' } })
    expect(addTowantToRead).toHaveBeenCalledTimes(1)
  })

  it('Book added in reading list', () => {
    const addTocurrentlyReading = jest.fn()
    const addTowantToRead = jest.fn()
    const addToRead = jest.fn()

    const wrapper = mount(
      <Book
        book={book}
        addTocurrentlyReading={addTocurrentlyReading}
        addTowantToRead={addTowantToRead}
        addToRead={addToRead} />,
    )

    wrapper.find('select').simulate('change', { target: { value: 'Read' } })
    expect(addToRead).toHaveBeenCalledTimes(1)
  })

  it('Book added in unknown list', () => {
    const addTocurrentlyReading = jest.fn()
    const addTowantToRead = jest.fn()
    const addToRead = jest.fn()

    const wrapper = mount(
      <Book
        book={book}
        addTocurrentlyReading={addTocurrentlyReading}
        addTowantToRead={addTowantToRead}
        addToRead={addToRead} />,
    )

    wrapper.find('select').simulate('change', { target: { value: 'Unknown' } })
    expect(addTocurrentlyReading).toHaveBeenCalledTimes(0)
    expect(addTowantToRead).toHaveBeenCalledTimes(0)
    expect(addToRead).toHaveBeenCalledTimes(0)
  })

})
