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
            let date = new Date(order.updatedAt)
            return (
              <li key={order.id}>
                <h3>Order {order.id}</h3>
                <h4>Date: {date.toLocaleDateString('en-US')}</h4>
                <a href={`/profile/${order.id}`}>
                  Click here to view more details
                </a>
                <br></br>
                <img src={order.orderProducts[0].product.imageUrl[0]} />

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
