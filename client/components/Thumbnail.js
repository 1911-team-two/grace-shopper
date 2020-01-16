import React from 'react'
import {Link} from 'react-router-dom'

const Thumbnail = props => {
  const product = props.product
  return (
    <div>
      <Link to={`/product/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} />
        <p>{product.name}</p>
        {props.inCart ? '' : <p>${product.price}</p>}
      </Link>
    </div>
  )
}

export default Thumbnail
