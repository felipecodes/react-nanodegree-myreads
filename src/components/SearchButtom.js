import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import css from './SearchButtom.css'

function SearchButtom(props) {
  return (
    <div className={css.container}>
      <FloatingActionButton className={css.buttom} onClick={props.onClick}>
          <ContentAdd />
      </FloatingActionButton>
    </div>
  )
}

export default SearchButtom