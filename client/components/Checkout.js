import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
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
      billing_zip: ''
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
    console.log('res:', res)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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

        <CheckoutCart />
        <input
          type="submit"
          value="Send Request"
          handleSubmit={this.handleSubmit}
        />
      </form>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  cart: state.cart
})

export default connect(mapStateToProps)(Checkout)
