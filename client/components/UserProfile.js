/* eslint-disable react/display-name */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/order'
import Thumbnail from './Thumbnail'

class UserProfile extends Component {
  componentDidMount() {
    this.props.getOrders()
  }

  render() {
    const user = this.props.user
    const orders = this.props.orders

    return (
      <div>
        <h1>{user.fullName}</h1>
        <h3>Your Order History</h3>
        <hr />

        <ul>
          {orders.map(order => {
            return (
              <li key={order.id}>
                <h3>Order {order.id}</h3>
                <h4>Date: {order.updatedAt}</h4>
                <h5>Click here to view more details</h5>
                <img src={order.orderProducts[0].product.imageUrl} />

                {/* {order.orderProducts.map(item => {
                    return <img src=`({item.product.imageUrl})` />
                  })} */}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    orders: state.order.defaultOrder
  }
}

const mapDispatch = dispatch => {
  return {
    getOrders: () => dispatch(fetchOrders())
  }
}

export default connect(mapState, mapDispatch)(UserProfile)
