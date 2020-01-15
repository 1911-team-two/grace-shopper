import React, {Component} from 'react'
import {connect} from 'react-redux'
import Thumbnail from './Thumbnail'

class Cart extends Component {
  render() {
    const itemsInCart = this.props.itemsInCart
    const isCartEmpty = this.props.itemsInCart.length === 0
    return (
      <div>
        {isCartEmpty ? (
          <h2>Your cart is empty</h2>
        ) : (
          <ul>
            {itemsInCart.map(product => {
              return (
                <li key={product.id}>
                  {' '}
                  <Thumbnail product={product} />
                  <p>size: {product.size}</p>
                  <p>qty: {product.amt}</p>
                </li>
              )
            })}
          </ul>
        )}
        <div>
          <button type="submit">proceed to checkout</button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    itemsInCart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Cart)
