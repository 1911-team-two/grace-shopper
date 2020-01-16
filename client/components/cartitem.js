import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {rmFromCart, changeQty} from '../store/cart'

class CartItem extends React.Component {
  handleQtyChange(e) {
    console.log('here')
    this.props.changeQty(this.props.item, e.target.value)
  }

  render() {
    const item = this.props.item
    const product = this.props.item.product
    return (
      <div>
        <Link to={`/product/${product.id}`}>
          <img src={product.imageUrl} alt="" />
          <p>{product.name}</p>
        </Link>
        <div>
          <label htmlFor="quantity">Qty: </label>
          <input
            type="number"
            defaultValue={item.qty}
            min="1"
            name="quantity"
            onChange={this.handleQtyChange}
          />
        </div>

        <p>Total: ${(product.price * item.qty) / 100}</p>
        <button type="button" onClick={() => this.props.rmFromCart(item)}>
          Remove
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  rmFromCart: item => dispatch(rmFromCart(item)),
  changeQty: (item, qty) => dispatch(changeQty(item, qty))
})

export default connect(null, mapDispatch)(CartItem)
