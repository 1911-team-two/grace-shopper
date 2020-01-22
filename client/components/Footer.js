import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <Wrapper className="footer">
      <Logo>name pending</Logo>
      <p>
        Come swing by <Accent>@</Accent>
      </p>
      <p>222 Spring Street</p>
      <p>New York, NY 12401</p>
    </Wrapper>
  )
}

export default Footer

const Wrapper = styled.div`
  border-top: 1px solid black;
  font-size: 1rem;
  margin-top: 3rem;
  margin-bottom: 4rem;
  padding-top: 3rem;

  p {
    margin: 0;
  }
`

const Logo = styled.h2`
  font-family: 'Quattrocento';
  color: ${props => props.theme.pink};
  font-size: 1.2rem;
`

const Accent = styled.span`
  color: ${props => props.theme.pink};
`
