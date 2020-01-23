/* eslint-disable react/button-has-type */
import React, {Component} from 'react'
import styled, {css} from 'styled-components'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCart} from '../store/cart'
import CartItem from './CartItem'
import {closeModal} from '../store'

class CartModal extends Component {
  constructor() {
    super()

    this.handleClose = this.handleClose.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
  }

  handleClose() {
    this.props.closeModal()
    document.body.style.overflow = 'initial'
  }

  render() {
    console.log(this.props.isOpen)
    let totalPrice = 0
    this.props.cart.forEach(item => {
      totalPrice += item.product.price * item.qty
    })
    totalPrice = totalPrice / 100

    const numOfItems = this.props.cart.length
    console.log('numOfItems:', numOfItems)
    return (
      <Wrapper isOpen={this.props.isOpen}>
        <Drawer isOpen={this.props.isOpen}>
          <TopBar>
            <div>
              <CloseButton onClick={this.handleClose}>+</CloseButton>
              <Title>Cart ({numOfItems})</Title>
            </div>
            <FullLink onClick={this.handleClose} to="/cart">
              View full
            </FullLink>
          </TopBar>
          <div>
            {this.props.cart.map((item, i) => {
              console.log('item:', item)
              return <Item item={item} />
            })}
          </div>

          <Subtotal>
            <p>Subtotal </p>
            <p>${totalPrice}</p>
          </Subtotal>
          <Link to="/checkout">
            <CheckoutButton>Checkout</CheckoutButton>
          </Link>
        </Drawer>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  isOpen: state.isOpen
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartModal)
const Wrapper = styled.div`
  color: black;

  .divider {
    background-color: black;
    height: 1px;
    width: 80%;
    margin: 4vh 0 3vh 0;
  }
`

const Drawer = styled.div`
  width: 30vw;
  min-height: 100vh;
  z-index: 20000;
  background-color: #f2dad4;
  position: absolute;
  top: 0;
  right: ${props => (props.isOpen ? '0%' : '-100%')};
  transition: right 0.25s ease-in-out;
  padding-left: 40px;
  padding-top: 6vh;
  padding-right: 30px;
`

const Title = styled.h3`
  font-size: 35px;
  font-weight: 400;
  margin: 0 0 6px 0;
`

const FullLink = styled(Link)`
  font-size: 11px;
  text-decoration: underline;
  margin-left: 2px;
  display: block;
`

const Thumbnail = styled.img`
  height: 200px;
  width: auto;
  margin-right: 25px;
`
// const CartItem = styled.div`
//   display: flex;
//   align-items: flex-end;
//   margin-bottom: 30px;
//   font-weight: 200;

//   .name {
//     font-size: 22px;
//     margin: 0;
//     font-weight: 200;
//   }

//   .price {
//     font-size: 22px;
//     margin: 0;
//     padding-bottom: 15px;
//   }
// `

const Item = styled(CartItem)`
  padding-right: 30px;
`

const CloseButton = styled.button`
  display: inline-block;
  border: none;
  padding: 10px 10px;
  padding-left: 0;
  margin: 0;
  text-decoration: none;
  background: none;
  color: black;
  font-size: 50px;
  font-weight: 200;
  cursor: pointer;
  text-align: center;
  transform: rotate(45deg);
  margin-right: 5px;
`

const Subtotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
  font-weight: 400;
`
const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 40px;

  div {
    display: flex;
    align-items: center;
  }
`

const CheckoutButton = styled.button`
  display: inline-block;
  border: none;
  padding: 10px 10px;
  padding-left: 0;
  margin: 0;
  text-decoration: none;
  background: none;
  color: white;
  width: 100%;
  font-size: 30px;
  background: black;
  font-weight: 100;
  height: 70px;
  cursor: pointer;
  text-align: center;
  margin-right: 5px;
  border-radius: 5px;

  :hover {
    background-color: #2c2c2c;
  }
`
