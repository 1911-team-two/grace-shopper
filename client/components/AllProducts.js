import React from 'react'
import {connect} from 'react-redux'
import Thumbnail from './Thumbnail'

export class AllProducts extends React.Component {
  render() {
    return (
      <div style={{display: 'flex'}} className="allProducts">
        {this.props.allProducts.splice(2).map(product => {
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
