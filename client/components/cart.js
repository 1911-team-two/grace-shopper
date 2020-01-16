import React, {Component} from 'react'
import {connect} from 'react-redux'
// import Thumbnail from './Thumbnail'
import CartItem from './cartitem'

class Cart extends Component {
  render() {
    console.log(this.props.itemsInCart)
    const itemsInCart = this.props.itemsInCart
    const isCartEmpty = this.props.itemsInCart.length === 0
    return (
      <div>
        {isCartEmpty ? (
          <h2>Your cart is empty</h2>
        ) : (
          <ul>
            {itemsInCart.map(cartItem => {
              const product = cartItem.product
              return (
                <li key={product.id}>
                  <CartItem item={cartItem} />
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

export default connect(mapState)(Cart)
