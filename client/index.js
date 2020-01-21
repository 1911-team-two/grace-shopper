import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import history from './history'
import store from './store'
import App from './app'
import {GlobalStyles} from './utils/GlobalStyles'
// import 'typeface-work-sans'

// establishes socket connection
import './socket'

// theme
const theme = {
  pink: '#FB81BB',
  black: '#39337B'
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
