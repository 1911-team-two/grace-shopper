import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

import {getCart} from '../store/cart'
import CartItem from './CartItem'

class Cart extends Component {
  componentDidMount() {
    this.props.getCart()
  }

  getTotal() {
    let total = 0
    this.props.itemsInCart.forEach(item => {
      total += item.product.price * item.qty
    })
    return total
  }

  render() {
    const itemsInCart = this.props.itemsInCart
    const isCartEmpty = this.props.itemsInCart.length === 0
    return (
      <Wrapper>
        <CartList>
          {isCartEmpty ? (
            <CartHeader>Your cart is empty.</CartHeader>
          ) : (
            <ul>
              {itemsInCart.map(cartItem => {
                return (
                  <li key={cartItem.product.id}>
                    <CartItem item={cartItem} />
                  </li>
                )
              })}
            </ul>
          )}
        </CartList>
        <OrderInfo>
          <p>Subtotal</p>
          <p>${this.getTotal() / 100}</p>
          <Link to="/checkout">
            <button type="submit">Checkout</button>
          </Link>
        </OrderInfo>
      </Wrapper>
    )
  }
}

/** STYLES **/

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`

const CartHeader = styled.h1`
  font-family: 'Quattrocento';
  font-size: 1.6rem;
`

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  ul {
    list-style: none;
  }

  li {
    margin: 2rem 0;
  }
`

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 30%;
  margin: 0 2rem;
  padding: 2rem;
  background-color: pink;
  color: white;

  p:nth-child(1) {
    font-size: 1.4rem;
    margin: 1rem 0;
    text-transform: uppercase;
  }

  p:nth-child(2) {
    margin: 0;
    padding: 1rem 0;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid white;
    text-align: right;
  }

  a {
    width: 100%;
  }

  button {
    width: 100%;
    margin-top: 2rem;
    padding: 0.4rem 0.6rem;
    background: transparent;
    border: 1px solid ${props => props.theme.pink};
    border-radius: 2px;
    box-sizing: border-box;
    font-size: 1rem;
    color: ${props => props.theme.pink};
    transition: all 0.2s ease;

    :hover {
      background: ${props => props.theme.pink};
      color: white;
    }
  }
`

/** REDUX **/

const mapState = state => {
  return {
    itemsInCart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: () => dispatch(getCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)
