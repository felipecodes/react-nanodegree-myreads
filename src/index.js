import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(<App router={BrowserRouter} />, document.getElementById('root'))
