import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Thumbnail = props => {
  const product = props.product
  return (
    <Wrapper>
      <Link to={`/product/${product.id}`}>
        <Image src={product.imageUrl} />
        <p>{product.name}</p>
        <p>${product.price / 100}</p>
      </Link>
    </Wrapper>
  )
}

export default Thumbnail

const Wrapper = styled.div`
  padding-right: 30px;
`

const Image = styled.div`
  background-image: url(${props => props.src});
  min-height: 30vw;
  min-width: 30vw;
`
