import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

import {Navbar, Footer} from './components'
import Routes from './routes'
import {getProducts} from './store/products'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.getProducts()
  }

  render() {
    return (
      <Wrapper>
        <Routes />
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
