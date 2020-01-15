import React, {Component} from 'react'
import {connect} from 'react-redux'
import Thumbnail from './Thumbnail'

class Cart extends Component {
  render() {
    const itemsInCart = this.props.itemsInCart
    const isCartEmpty = this.props.itemsInCart.length === 0
    return (
      <div>
        {isCartEmpty ? (
          <h2>Your cart is empty</h2>
        ) : (
          <ul>
            {itemsInCart.map(item => {
              return (
                <li key={item.product.id}>
                  {' '}
                  <Thumbnail />
                  <p>qty: {item.amt}</p>
                </li>
              )
            })}
          </ul>
        )}
        <div>
          <button type="submit">proceed to checkout</button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    //using dummydata for now
    itemsInCart: [
      {
        product: {
          imageUrl: 'https://via.placeholder.com/250',
          name: 'The Squidward',
          price: 18.99,
          description:
            'Natural white, matte, ultra smooth background. 100% cotton, acid and lignin-free archival paper. Custom trimmed with border for framing; 1" for x-small and small, 2" for all larger sizes. Every order is custom made just for you',
          category: ['print'],
          filter: ['funny'],
          id: 1
        },
        amt: 1
      }
    ]
  }
}
const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Cart)
