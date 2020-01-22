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

          <PaymentForm />

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
          <input
            type="submit"
            value="Place Order"
            onSubmit={this.handleSubmit}
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

const Title = styled.h2`
  font-weight: 400;
  font-size: 35px;
  text-decoration: underline;
  margin-bottom: 0.75rem;
`

const LeftPane = styled.div`
  display: flex;
  flex-direction: column;

  padding-left: 10vw;
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
