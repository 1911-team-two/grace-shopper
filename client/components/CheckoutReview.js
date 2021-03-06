/* eslint-disable react/no-array-index-key */
import React from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store/cart'
import CheckoutReviewItem from './CheckoutReviewItem'

export class CheckoutReview extends React.Component {
  componentDidMount() {
    this.props.getCart()
  }
  render() {
    return (
      <div>
        <h3>Review Your Order</h3>

        <div>
          {this.props.cart.map((item, i) => {
            return <CheckoutReviewItem key={i} item={item} />
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutReview)
