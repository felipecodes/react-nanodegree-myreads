import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import css from './Book.css'

class Book extends Component {
  handleChange = (event, index, value) => {
    event.preventDefault()
    switch (value) {
      case 'currentlyReading':
        this.props.addTocurrentlyReading(this.props.book)
        break
      case 'wantToRead':
        this.props.addTowantToRead(this.props.book)
        break
      case 'read':
        this.props.addToRead(this.props.book)
        break
      default:
    }
  }

  render() {
    const { book } = this.props
    return (
      <li className={css.book}>
        <Paper style={{height: '350px'}}>
          <header className={css.header}>
            <h2 className={css.title}>{book.title}</h2>
            <DropDownMenu
              className={css.menu}
              value={this.props.list}
              onChange={this.handleChange}>
              <MenuItem value="none" primaryText="None" />
              <MenuItem value="currentlyReading" primaryText="Currently reading" />
              <MenuItem value="wantToRead" primaryText="Want to read" />
              <MenuItem value="read" primaryText="Read" />
            </DropDownMenu>
          </header>
        </Paper>
      </li>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  addTocurrentlyReading: PropTypes.func.isRequired,
  addTowantToRead: PropTypes.func.isRequired,
  addToRead: PropTypes.func.isRequired
}

export default Book
