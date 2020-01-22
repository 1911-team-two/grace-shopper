import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {logout} from '../store'
import CartModal from './CartModal'

class Navbar extends React.Component {
  constructor() {
    super()

    this.state = {
      cartOpen: false
    }

    this.handleOpenCart = this.handleOpenCart.bind(this)
  }

  handleOpenCart(e) {
    if (this.state.cartOpen === false) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'initial'
    }

    this.setState({
      cartOpen: !this.state.cartOpen
    })
  }

  render() {
    return (
      <Wrapper>
        <Link to="/">
          <Logo>
            <span>name</span>
            <span>pending</span>
          </Logo>
        </Link>

        <CartModal
          handleOpenCart={this.handleOpenCart}
          isOpen={this.state.cartOpen}
        />

        {/* <Link to="/">Home</Link> */}
        {this.props.isLoggedIn ? (
          <Nav>
            {/* The navbar will show these links after you log in */}
            <NavLink to="/profile">My Account</NavLink>
            <NavLink to="#" onClick={this.handleOpenCart}>
              Cart
            </NavLink>
            <NavLinkAnchor to="/" href="#" onClick={this.props.handleClick}>
              Logout
            </NavLinkAnchor>
          </Nav>
        ) : (
          <Nav>
            {/* The navbar will show these Navlinks before you log in */}
            <NavLink to="/login">
              <Icon>
                <img src="/account.svg" />
              </Icon>
              My Account
            </NavLink>
            <NavLink to="/cart">
              <Icon>
                <img src="/cart.svg" />
              </Icon>
              Cart
            </NavLink>
          </Nav>
        )}
      </Wrapper>
    )
  }
}
// STYLES
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Logo = styled.h1`
  font-family: 'Quattrocento';
  color: ${props => props.theme.pink};
  font-size: 2rem;

  span {
    display: block;
    line-height: 1.6rem;
  }
`

const Nav = styled.nav`
  display: flex;
  min-width: 20vw;
  justify-content: space-between;
`

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  :hover {
    color: ${props => props.theme.pink};
  }
`
const NavLinkAnchor = styled(NavLink)``

const NavButton = styled.button``
const Icon = styled.div`
  display: inline-block;
  height: 1.6em;
  margin-right: 1rem;

  img {
    width: 100%;
    height: 100%;
  }
`

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
