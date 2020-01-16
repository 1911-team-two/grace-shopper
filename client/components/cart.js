import React, {Component} from 'react'
import {connect} from 'react-redux'

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
            {itemsInCart.map(product => {
              return (
                <li key={product.id}>
                  <img src={product.imageUrl} alt={product.name} />
                  <p>{product.name}</p>
                  <p>${product.price}</p>
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
