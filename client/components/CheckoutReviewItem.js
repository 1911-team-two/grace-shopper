import React, {Component} from 'react'
import CartItem from './CartItem'

export default class CheckoutReviewItem extends Component {
  render() {
    const {name} = this.props.product

    return (
      <div>
        <p className="productName">item</p>
      </div>
    )
  }
}
