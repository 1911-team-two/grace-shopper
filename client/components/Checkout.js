/* eslint-disable camelcase */
/* eslint-disable react/no-unused-state */
import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import axios from 'axios'
import styled from 'styled-components'
import AddressForm from './AddressForm'
import CheckoutCart from './CheckoutReview'

export class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      shipping_firstName: '',
      shipping_lastName: '',
      shipping_addressLineOne: '',
      shipping_addressLineTwo: '',
      shipping_city: '',
      shipping_state: '',
      shipping_zip: '',
      billing_firstName: '',
      billing_lastName: '',
      billing_addressLineOne: '',
      billing_addressLineTwo: '',
      billing_city: '',
      billing_state: '',
      billing_zip: '',
      orderPosted: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async handleSubmit(e) {
    e.preventDefault()
    let userInfoToBePosted = {
      id: this.props.userId,
      cart: this.props.cart
    }

    const res = await axios.post('/api/orders', userInfoToBePosted)
    if (res) {
      this.setState({orderPosted: res.data})
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
    return (
      <Wrapper onSubmit={this.handleSubmit}>
        <div>
          <h2>Checkout</h2>
          <AddressForm
            title="Shipping Address"
            values={this.state}
            handleChange={this.handleChange}
            type="shipping"
          />

          <fieldset className="payment_wrapper">
            <h3>Payment</h3>
            <p>This is placeholder for payment details</p>
            <label htmlFor="cc_number">Card Number</label>
            <input type="text" name="cc_number" />

            <label htmlFor="cardname">Name on Card</label>
            <input type="text" name="cardname" />

            <label htmlFor="expiration">Expiration date (MM/YY)</label>
            <input type="text" name="expiration" />

            <label htmlFor="security">Security Code</label>
            <input type="text" name="security" />
          </fieldset>

          <AddressForm
            title="Billing Address"
            values={this.state}
            handleChange={this.handleChange}
            type="billing"
          />
        </div>

        <RightPane>
          <CheckoutCart />
          <input
            type="submit"
            value="Place Order"
            handleSubmit={this.handleSubmit}
          />
        </RightPane>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  cart: state.cart
})

export default connect(mapStateToProps)(Checkout)

const Wrapper = styled.div`
  background: white;
  margin: -5vh -4vw;
  padding: 5vh 5vw;
  display: grid;
  grid-template-areas: 'form cart';
  grid-template-columns: 2fr 1fr;
  grid-gap: 5%;
`

const RightPane = styled.div`
  background-color: #f9f9f9;
  margin: -5vh -5vw;
  padding: 10%;

  img {
    width: 80px;
    height: auto;
  }
`
