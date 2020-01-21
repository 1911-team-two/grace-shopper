import React from 'react'
import {Redirect} from 'react-router'

export default class OrderConfirmation extends React.Component {
  render() {
    if (this.props.location.state) {
      return (
        <div>
          <h2>Order Confirmation</h2>
          <h3>Your order number is #{this.props.location.state.id}.</h3>
          <p>Thanks for shopping!</p>
        </div>
      )
    } else {
      return <Redirect to="/" />
    }
  }
}
