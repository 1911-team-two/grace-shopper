import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Wrapper>
      {error && error.response && <Alert>{error.response.data} </Alert>}

      <form onSubmit={handleSubmit} name={name}>
        <label htmlFor="email">
          <small>Email</small>
        </label>
        <input name="email" type="text" placeholder="Email" />
        <label htmlFor="password">
          <small>Password</small>
        </label>
        <input name="password" type="password" placeholder="Password" />

        <ButtonContainer>
          <button type="submit">{displayName}</button>
          <a href="/auth/google">
            <button type="button">{displayName} with Google</button>
          </a>
        </ButtonContainer>
      </form>
    </Wrapper>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;

  form {
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-bottom: 2rem;
  }

  label {
    opacity: 0;
    height: 0;
  }

  input {
    margin: 0.1rem;
    padding: 0.6rem 0.8rem;
    box-sizing: border-box;
    border: 1px solid pink;
    font-size: 0.9rem;
    border-radius: 2px;
    caret-color: ${props => props.theme.pink};

    :focus {
      box-shadow: 0px 0px 3px 0px pink;
    }
  }

  button {
    margin-top: 0.4rem;
    padding: 0.4rem 0.6rem;
    background: transparent;
    border: 1px solid ${props => props.theme.pink};
    border-radius: 2px;
    box-sizing: border-box;
    font-size: 0.8rem;
    color: ${props => props.theme.pink};
    transition: all 0.2s ease;

    :hover {
      background: ${props => props.theme.pink};
      color: white;
    }
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.4rem;
`

const Alert = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.pink};
`
