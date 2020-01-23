/* eslint-disable camelcase */
/* eslint-disable react/no-unused-state */
import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import axios from 'axios'
import styled from 'styled-components'

import AddressForm from './AddressForm'
import CheckoutCart from './CheckoutReview'
import PaymentForm from './PaymentForm'
import {Logo} from './Navbar'
import {clearCart} from '../store/cart'

export class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      shipping_firstName: 'First name',
      shipping_lastName: 'Last name',
      shipping_addressLineOne: 'Address',
      shipping_addressLineTwo: 'Apartment, suite, etc. (optional)',
      shipping_city: 'City',
      shipping_state: 'State',
      shipping_country: 'Country',
      shipping_zip: 'Zip code',
      billing_firstName: 'First name',
      billing_lastName: 'Last name',
      billing_addressLineOne: 'Address',
      billing_addressLineTwo: 'Apartment, suite, etc. (optional)',
      billing_city: 'City',
      billing_state: 'State',
      billing_country: 'Country',
      billing_zip: 'Zip code',
      orderPosted: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clearInput = this.clearInput.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  clearInput(e) {
    let defaultValues = {
      firstName: 'First name',
      lastName: 'Last name',
      addressLineOne: 'Address',
      addressLineTwo: 'Apartment, suite, etc. (optional)',
      city: 'City',
      state: 'State',
      country: 'Country',
      zip: 'Zip code'
    }

    if (defaultValues[e.target.attributes.data.nodeValue] === e.target.value) {
      this.setState({
        [e.target.name]: ''
      })
    }
  }

  async handleSubmit(e) {
    e.preventDefault()
    let userInfoToBePosted = {
      cart: this.props.cart
    }

    const res = await axios.post('/api/orders', userInfoToBePosted)
    if (res) {
      this.setState({orderPosted: res.data})
      this.props.clearCart()
    }
  }

  render() {
    if (this.state.orderPosted) {
      return (
        <Redirect
          to={{
            pathname: '/confirmation',
            state: {id: this.state.orderPosted.id}
          }}
        />
      )
    }

    let totalPrice = 0
    this.props.cart.forEach(item => {
      totalPrice += item.product.price * item.qty
    })
    totalPrice = totalPrice / 100
    return (
      <Wrapper onSubmit={this.handleSubmit}>
        <LeftPane>
          <Logo>
            <span>name</span>
            <span>pending</span>
          </Logo>
          <Title>Checkout</Title>
          <AddressForm
            title="Shipping Address"
            values={this.state}
            handleChange={this.handleChange}
            type="shipping"
            handleClear={this.clearInput}
          />

          <div className="line"></div>

          <PaymentForm />

          <div className="line"></div>

          <AddressForm
            title="Billing Address"
            values={this.state}
            handleChange={this.handleChange}
            type="billing"
            handleClear={this.clearInput}
          />
        </LeftPane>

        <RightPane>
          <CheckoutCart />
          <div className="divider"></div>
          <TotalWrapper>
            <span>Total</span> <span>${totalPrice}</span>
          </TotalWrapper>
          {/* <SubmitWrapper> */}
          <Button
            type="submit"
            onClick={this.handleSubmit}
            disabled={this.state.billing_zip === 'Zip code'}
          >
            Place Order
          </Button>
          {/* </SubmitWrapper> */}
        </RightPane>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  clearCart: () => dispatch(clearCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

const Wrapper = styled.div`
  background: white;
  margin: -5vh -4vw;
  padding: 5vh 5vw;
  display: grid;
  grid-template-areas: 'form cart';
  grid-template-columns: 2fr 1fr;
  grid-gap: 5%;
`

export const Title = styled.h2`
  font-weight: 400;
  font-size: 35px;
  text-decoration: underline;
  margin-bottom: 0.75rem;
`

const LeftPane = styled.div`
  display: flex;
  flex-direction: column;

  padding-left: 10vw;

  .line {
    background-color: pink;
    height: 1px;
    width: 68%;
    margin: 9vh 0 3vh 0;
  }
`

const RightPane = styled.div`
  background-color: #f9f9f9;
  margin: -5vh -5vw;
  padding: 10%;
  padding-right: 40%;

  .divider {
    background-color: #c0c0c0;
    height: 1px;
    width: 100%;
    margin: 9vh 0 3vh 0;
  }
  img {
    width: 80px;
    height: auto;
  }
`

const TotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Button = styled.button`
  margin-block-start: 2em;
  background-color: #fb80bb;
  color: white;
  height: 40px;
  width: 100%;
`
