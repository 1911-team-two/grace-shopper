import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import {getProducts} from '../store/products'

import Thumbnail from './Thumbnail'

// NOTE: all css is temporary, will replace with better CSS after design is finalized

export class Home extends React.Component {
  componentDidMount() {
    // this.props.getProducts()
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h2>All products</h2>

        <div style={{display: 'flex'}}>
          {/* {this.props.allProducts.map(product => {
            return <Thumbnail product={product} key={product.id} />
          })} */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allProducts: state.products
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
