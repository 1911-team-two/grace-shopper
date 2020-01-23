import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

import {Navbar, Footer} from './components'
import Routes from './routes'
import {getProducts} from './store/products'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cartIsOpen: false
    }
    this.props.getProducts()
  }

  render() {
    return (
      <Wrapper>
        <Routes cartIsOpen={this.state.cartIsOpen} />
        <Footer />
      </Wrapper>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts())
})

export default connect(null, mapDispatchToProps)(App)

const Wrapper = styled.div`
  padding: 5vh 4vw;
`
