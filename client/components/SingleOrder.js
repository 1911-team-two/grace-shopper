/* eslint-disable react/display-name */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleOrder} from '../store/order'

class OrderProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: {
        orderProducts: []
      }
    }
  }

  componentDidMount() {
    this.props.getSingleOrder(this.props.match.params.orderId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.order !== this.props.order) {
      this.setState({
        order: this.props.order
      })
    }
  }

  render() {
    // console.log('PROPS', this.props)
    const order = this.state.order
    console.log('ORDER', order)
    const products = order.orderProducts
    // console.log(products)
    // products.map(e => console.log('product'))
    let date = new Date(order.updatedAt)
    let total = 0
    products.map(item => {
      total += item.product.price
    })
    return (
      <div>
        <h1>Order # {order.id}</h1>
        <h4>Order Date: {date.toLocaleDateString('en-US')}</h4>
        <h4>Order Total: ${(total / 100).toFixed(2)}</h4>
        <h5>Details</h5>
        <hr />

        <ul>
          {products.map(item => {
            item.product.price = (item.product.price / 100).toFixed(2)
            return (
              <li key={item.product.id}>
                <h3>{item.product.name}</h3>
                <h5>${item.product.price}</h5>
                <img src={item.product.imageUrl} />
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
    order: state.order.singleOrder
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleOrder: num => dispatch(fetchSingleOrder(num))
  }
}

export default connect(mapState, mapDispatch)(OrderProfile)
