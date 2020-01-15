import React from 'react'
import {Link} from 'react-router-dom'

const CartItem = props => {
  console.log(props)
  return (
    <div>
      <Link to={`/product/${props.item.product.id}`}>
        <img src="https://via.placeholder.com/250" alt="" />
        <p>{props.item.product.name}</p>
        <p>${props.item.product.price}</p>
        <p>Qty: {props.item.amt}</p>
      </Link>
    </div>
  )
}

export default CartItem
