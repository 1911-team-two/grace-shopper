import React from 'react'
import styled from 'styled-components'

import {Login, Signup} from './AuthForm'

const LoginOrSignup = () => {
  return (
    <Wrapper>
      {/* <Header>Log In</Header> */}
      <Login />
      <Spacer>
        <p>OR</p>
      </Spacer>
      {/* <Header>Sign Up</Header> */}
      <Signup />
    </Wrapper>
  )
}

export default LoginOrSignup

const Wrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  border: ${props => props.theme.black};
  padding: 1rem;
`

const Header = styled.h2`
  font-family: 'Quattrocento';
  font-size: 1.2rem;
  color: pink;
`

const Spacer = styled.div`
  border: 1px solid ${props => props.theme.black};
`
