import React from 'react'
import styled from 'styled-components'

import AllProducts from './AllProducts'

// NOTE: all css is temporary, will replace with better CSS after design is finalized

export class Home extends React.Component {
  render() {
    return (
      <div>
        <Header>All products</Header>
        <AllProducts />
      </div>
    )
  }
}

export default Home

const Header = styled.h2`
  font-size: 2rem;
  color: pink;
  font-weight: 300;
`
