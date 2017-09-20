import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/action/home'

function Header() {
  return (
    <AppBar
      title="My Reads"
      iconElementLeft={<IconButton><Link to="/"><ActionHome style={{color: '#fff'}} /></Link></IconButton>}
      iconClassNameRight="muidocs-icon-navigation-expand-more" />
  )
}

export default Header
