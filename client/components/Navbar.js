import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import styled from 'styled-components'

const Navbar = ({handleClick, isLoggedIn}) => (
  <Wrapper>
    <Link to="/">
      <Logo>
        <span>name</span>
        <span>pending</span>
      </Logo>
    </Link>

    {/* <Link to="/">Home</Link> */}
    {isLoggedIn ? (
      <Nav>
        {/* The navbar will show these links after you log in */}
        <NavLink to="/profile">My Account</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLinkAnchor to="/" href="#" onClick={handleClick}>
          Logout
        </NavLinkAnchor>
      </Nav>
    ) : (
      <Nav>
        {/* The navbar will show these Navlinks before you log in */}
        <NavLink to="/login">My Account</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </Nav>
    )}
  </Wrapper>
)

// STYLES
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.h1`
  font-family: 'Quattrocento';
  color: ${props => props.theme.pink};
  font-size: 2rem;

  span {
    display: block;
  }
`

const Nav = styled.nav`
  display: flex;
  min-width: 20vw;
  justify-content: space-around;
`

const NavLink = styled(Link)`
  font-size: 0.9rem;

  :hover {
    color: ${props => props.theme.pink};
  }
`
const NavLinkAnchor = styled(NavLink)``

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
