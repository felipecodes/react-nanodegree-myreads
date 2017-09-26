import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import css from './Book.css'

class Book extends Component {
  constructor(props) {
    super(props)
    this.state = { shelf: null }
  }

  handleChange = (event, index, value) => {
    this.setState({ shelf: value })
    this.props.setShelf(this.props.book, value)
  }

  getStyles = () => {
    const backgroundURL = this.props.book.imageLinks ?
    (this.props.book.imageLinks.thumbnail || null) : null
    return backgroundURL ? { backgroundImage: `url(${backgroundURL})` } : null
  }

  render() {
    return (
      <li className={css.book}>
        <Paper style={{width: '128px', margin: '0 auto'}} zDepth={1}>
          <div className={css.thumbnail} style={this.getStyles()} />
        </Paper>
        <header className={css.header}>
          <h2 className={css.title}>{this.props.book.title}</h2>
          <DropDownMenu
            className={css.menu}
            value={this.state.shelf || this.props.shelf}
            onChange={this.handleChange}>
            <MenuItem value="none" primaryText="None" />
            <MenuItem value="currentlyReading" primaryText="Currently reading" />
            <MenuItem value="wantToRead" primaryText="Want to read" />
            <MenuItem value="read" primaryText="Read" />
          </DropDownMenu>
        </header>
      </li>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelf: PropTypes.string.isRequired
}

export default Book
