import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import BookCase from './BookCase'
import * as BooksAPI from '../BooksAPI'

class HomePage extends Component {
  handleClick = event => {
    event.preventDefault()
    this.props.history.push('/search')
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => this.props.receiverBooks(books))
  }

  render() {
    return (
      <div>
        <BookCase
          byId={this.props.byId}
          currentlyReading={this.props.currentlyReading}
          wantToRead={this.props.wantToRead}
          read={this.props.read}
          addTocurrentlyReading={this.props.addTocurrentlyReading}
          addTowantToRead={this.props.addTowantToRead}
          addToRead={this.props.addToRead}
          removeShelf={this.props.removeShelf} />
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <FloatingActionButton
              style={{marginRight: '2em', marginBottom: '2em'}}
              iconStyle={{color: '#fff'}}
              onClick={this.handleClick}>
                <ContentAdd />
            </FloatingActionButton>
          </div>
      </div>
    )
  }
}

export default HomePage
