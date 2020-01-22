/* eslint-disable react/display-name */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/order'
import Thumbnail from './Thumbnail'
import styled from 'styled-components'

export class UserProfile extends Component {
  componentDidMount() {
    this.props.getOrders()
  }

  // btnClick() {
  //   window.open({`http:localhost:8080/profile/${this.props.orders.id}`});
  // }
  render() {
    const user = this.props.user
    const orders = this.props.orders
    console.log('ORDERS', this.props.orders)
    return (
      <Wrapper>
        <div>
          <h1>{user.fullName}</h1>
          <YourHistory>Your Order History</YourHistory>
          <hr />

          <OrderHistory>
            {orders.map(order => {
              console.log('order:', order)
              let date = new Date(order.updatedAt)
              return (
                <ul key={order.id}>
                  <Order>Order {order.id}</Order>
                  <OrderDate>
                    Date: {date.toLocaleDateString('en-US')}
                  </OrderDate>
                  <Image src={order.orderProducts[0].product.imageUrl[0]} />
                  <br></br>
                  <ViewMore href={`/profile/${order.id}`}>
                    Click here to view more details
                  </ViewMore>

                  {/* {order.orderProducts.map(item => {
                    return <img src=`({item.product.imageUrl})` />
                  })} */}
                </ul>
              )
            })}
          </OrderHistory>
        </div>
      </Wrapper>
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

const Wrapper = styled.div``

const YourHistory = styled.h4`
  font-size: 22px;
`

const OrderHistory = styled.ul`
  display: flex;
  overflow-x: auto;
`

const Order = styled.h3`
  font-size: 20px;
  margin-block-end: 0.5px;
`

const OrderDate = styled.h4`
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  font-family: 'Work Sans';
  font-weight: inherit;
`

const Image = styled.img`
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  width: auto;
  height: 300px;
  opacity: 0.5;
`
const ViewMore = styled.a`
  color: #FB80BB;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  color: #FB80BB;
  font-size: 18px;
}
`
