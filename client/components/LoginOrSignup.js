import React from 'react'
import styled from 'styled-components'

import {Login, Signup} from './AuthForm'

const LoginOrSignup = () => {
  return (
    <Wrapper>
      <Form>
        <Header>Log In</Header>
        <Login />
      </Form>
      <Spacer>
        <p>OR</p>
      </Spacer>
      <Form>
        <Header>Sign Up</Header>
        <Signup />
      </Form>
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
  color: ${props => props.theme.black};
`

const Spacer = styled.div`
  display: flex;
  justify-content: center;
  border: 0.5px solid ${props => props.theme.black};
  box-sizing: border-box;
  width: 0;
  height: 100%;
  margin: 5rem;

  p {
    background: ${props => props.theme.background};
    padding: 1rem;
  }
`

const Form = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`
