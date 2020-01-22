import React from 'react'
import styled from 'styled-components'

import AllProducts from './AllProducts'
import FeaturedProducts from './FeaturedProducts'

// NOTE: all css is temporary, will replace with better CSS after design is finalized

export class Home extends React.Component {
  render() {
    return (
      <div>
        <Header>Featured products</Header>
        <FeaturedProducts />
        <Header>All products</Header>
        <AllProducts />
      </div>
    )
  }
}

export default Home

const Header = styled.h2`
  font-size: 1.4rem;
  letter-spacing: 0.1rem;
  color: pink;
  font-weight: 300;
  text-transform: uppercase;
  margin-top: 4rem;
`
