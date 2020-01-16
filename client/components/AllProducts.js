import React from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store/products'
import Thumbnail from './Thumbnail'

export class AllProducts extends React.Component {
  render() {
    return (
      <div style={{display: 'flex'}} className="allProducts">
        {this.props.allProducts.map(product => {
          return <Thumbnail product={product} key={product.id} />
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allProducts: state.products
})

export default connect(mapStateToProps)(AllProducts)
