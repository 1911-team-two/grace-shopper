import React from 'react'
import {connect} from 'react-redux'

export class CheckoutCart extends React.Component {
  render() {
    return (
      <div>
        <h3>Review Your Order</h3>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps)(CheckoutCart)
