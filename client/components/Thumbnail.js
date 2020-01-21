import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Thumbnail = props => {
  const product = props.product
  return (
    <Wrapper>
      <Image src={product.imageUrl[0]} alt={product.name} />
      <Link to={`/product/${product.id}`}>
        <p>{product.name}</p>
        <p>${product.price / 100}</p>
      </Link>
    </Wrapper>
  )
}

export default Thumbnail

const Wrapper = styled.div``

const Image = styled.img`
  max-height: 60vh;
`
