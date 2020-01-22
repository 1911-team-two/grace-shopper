import React from 'react'
import {Link} from 'react-router-dom'
import styled, {css} from 'styled-components'

const Thumbnail = props => {
  const product = props.product
  const imageUrl = props.featured ? product.imageUrl[0] : product.imageUrl[1]
  return (
    <Wrapper featured={props.featured}>
      <Link to={`/product/${product.id}`}>
        <Image src={imageUrl} alt={product.name} />
        <p>{product.name}</p>
        <p>${product.price / 100}</p>
      </Link>
    </Wrapper>
  )
}

export default Thumbnail

const Wrapper = styled.div`
  ${props =>
    props.featured ? 'flex: 1 0 29%;' : 'flex: 0 0 calc(25% - .4rem);'}
  ${props =>
    props.featured ? 'margin-right: 0.8rem;' : ''}
  margin-bottom: 1rem;

  p {
    margin: 0.4rem 0;
  }
`

const Image = styled.img`
  width: 100%;
  margin-bottom: 0.8rem;
`
