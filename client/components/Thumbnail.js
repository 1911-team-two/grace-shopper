import React from 'react'
import {Link} from 'react-router-dom'

const Thumbnail = props => {
  const product = props.product
  return (
    <div>
      <Link to={`/product/${product.id}`}>
        <img src={product.imageUrl[0]} alt={product.name} />
        <p>{product.name}</p>
        <p>${product.price / 100}</p>
      </Link>
    </div>
  )
}

export default Thumbnail
