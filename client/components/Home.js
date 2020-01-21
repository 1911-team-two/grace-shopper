import React from 'react'
import styled from 'styled-components'

import AllProducts from './AllProducts'
import FeaturedProducts from './FeaturedProducts'

// NOTE: all css is temporary, will replace with better CSS after design is finalized

export class Home extends React.Component {
  render() {
    return (
      <div>
        <Header>Back in Stock</Header>
        <FeaturedProducts />
        <Header>All products</Header>
        <AllProducts />
      </div>
    )
  }
}

export default Home

export const Header = styled.h2`
  font-size: 2rem;
  color: pink;
  font-weight: 300;
`
