import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getCart} from '../store/cart'
import CartItem from './CartItem'

class Cart extends Component {
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    const itemsInCart = this.props.itemsInCart
    const isCartEmpty = this.props.itemsInCart.length === 0
    return (
      <div>
        {isCartEmpty ? (
          <h2>Your cart is empty</h2>
        ) : (
          <ul>
            {itemsInCart.map(cartItem => {
              console.log(cartItem)
              return (
                <li key={cartItem.id}>
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

const mapDispatch = dispatch => {
  return {
    getCart: () => dispatch(getCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)
