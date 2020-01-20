import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {GlobalStyles} from './utils/GlobalStyles'
// import 'typeface-work-sans'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <GlobalStyles />
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
