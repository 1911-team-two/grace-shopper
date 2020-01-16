import React from 'react'
import {Link} from 'react-router-dom'

const CartItem = props => {
  const item = props.item
  const product = props.item.product
  return (
    <div>
      <Link to={`/product/${product.id}`}>
        <img src={product.imageUrl} alt="" />
        <p>{product.name}</p>
      </Link>
      <p>Qty: {item.qty}</p>
      <p>Total: ${(product.price * item.qty) / 100}</p>
    </div>
  )
}

export default CartItem
