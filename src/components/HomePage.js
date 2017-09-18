import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import BookCase from './BookCase'

class HomePage extends Component {
  handleClick = event => {
    event.preventDefault()
    this.props.history.push('/search')
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
          addToRead={this.props.addToRead} />
        <FloatingActionButton
          iconStyle={{color: '#fff'}}
          onClick={this.handleClick}>
            <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

export default HomePage
