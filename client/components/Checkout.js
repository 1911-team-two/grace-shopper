import React from 'react'
import AddressForm from './AddressForm'

export class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {}

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    console.log(e.target.name)
    this.setState({
      [e.target.name]: e.target.value
    })

    console.log(this.state)
  }

  render() {
    return (
      <div>
        <h2>Checkout</h2>
        <AddressForm
          title="Shipping Address"
          handleChange={this.handleChange}
          type="shipping"
        />

        <div className="payment_wrapper">
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
        </div>

        <AddressForm title="Billing Address" />

        {/* cart info here */}
        {/* submit button here */}
      </div>
    )
  }
}

export default Checkout