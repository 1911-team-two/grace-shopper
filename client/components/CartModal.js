/* eslint-disable react/button-has-type */
import React, {Component} from 'react'
import styled, {css} from 'styled-components'
import {connect} from 'react-redux'
import {getCart} from '../store/cart'
import {closeModal} from '../store'

class CartModal extends Component {
  // componentDidMount() {
  //   this.props.getCart()
  // }

  render() {
    console.log(this.props.isOpen)
    let totalPrice = 0
    this.props.cart.forEach(item => {
      totalPrice += item.product.price * item.qty
    })
    totalPrice = totalPrice / 100
    return (
      <Wrapper isOpen={this.props.isOpen}>
        <Drawer isOpen={this.props.isOpen}>
          <button onClick={this.props.closeModal}>X</button>
          <h3>Cart</h3>
          <span>View full</span>
          <div>
            {this.props.cart.map((item, i) => {
              return (
                <CartItem key={i}>
                  <Thumbnail src={item.product.imageUrl[1]} />
                  <div>
                    <p>{item.product.name}</p>
                    <p>${item.product.price / 100}</p>
                  </div>
                </CartItem>
              )
            })}
          </div>
          <p>Subtotal {totalPrice}</p>
          <button>Checkout</button>
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  z-index: 1001;
  opacity: ${props => (props.isOpen ? '1' : '0')};
  /* transition: opacity 0.3s; */
  color: black;
`

const Drawer = styled.div`
  position: absolute;
  top: 0;
  right:0;
  /* right: ${props => (props.isOpen ? '0' : '-100%')}; */
  /* display: ${props => (props.isOpen ? 'block' : 'none')}; */
  transition: right 0.3s ease;
  background-color: #f2dad4;
  min-width: 30vw;
  height: 100vh;
  padding: 5%;
`

const Thumbnail = styled.img`
  height: 200px;
  width: auto;
  margin-right: 15px;
`
const CartItem = styled.div`
  display: flex;
`
