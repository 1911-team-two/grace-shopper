import React from 'react'
import {connect} from 'react-redux'

import {Navbar} from './components'
import Routes from './routes'
import {getProducts} from './store/products'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.getProducts()
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts())
})

export default connect(null, mapDispatchToProps)(App)
