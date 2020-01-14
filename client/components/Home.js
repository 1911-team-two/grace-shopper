import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import {getProducts} from '../store/products'

import Thumbnail from './Thumbnail'

// NOTE: all css is temporary, will replace with better CSS after design is finalized

class Home extends React.Component {
  componentDidMount() {
    this.props.getProducts()
    console.log(this.props)
  }

  render() {
    return (
      <div>
        <h2>All products</h2>

        <div style={{display: 'flex'}}>
          <Thumbnail />
          <Thumbnail />
          <Thumbnail />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allProducts: state
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
