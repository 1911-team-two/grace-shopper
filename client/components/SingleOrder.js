/* eslint-disable react/display-name */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleOrder} from '../store/order'
import styled from 'styled-components'

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
    const products = order.orderProducts
    // console.log(products)
    // products.map(e => console.log('product'))
    let date = new Date(order.updatedAt)
    let total = 0
    products.map(item => {
      total += item.product.price
    })
    return (
      <Wrapper>
        <div>
          <h1>Order # {order.id}</h1>
          <OrderDate>Order Date: {date.toLocaleDateString('en-US')}</OrderDate>
          <Total>Order Total: ${(total / 100).toFixed(2)}</Total>
          <Details>Details</Details>
          <hr />
          <ProductWrapper>
            {products.map(item => {
              item.product.price = (item.product.price / 100).toFixed(2)
              return (
                <ul key={item.product.id}>
                  <Name>{item.product.name}</Name>
                  <Price>${item.product.price}</Price>
                  <Image src={item.product.imageUrl[0]} />
                </ul>
              )
            })}
          </ProductWrapper>
          <ButtonWrapper>
            <Btn href="/profile/">Back to Orders</Btn>
          </ButtonWrapper>
        </div>
      </Wrapper>
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

const Wrapper = styled.div``

const OrderDate = styled.h4`
  margin-block-end: 0.5em;
  font-weight: initial;
`

const Total = styled.h4`
  margin-block-start: 0.5em;
  font-weight: initial;
`

const Details = styled.h5`
  font-size: 22px;
  margin-block-end: 0.5em;
`
const ProductWrapper = styled.div`
  display: flex;
  overflow-x: auto;
`

const Name = styled.h5`
  font-size: 20px;
  margin-block-end: 0.3em;
`
const Price = styled.h6`
  margin-block-start: 0.3em;
  font-size: 17px;
  font-weight: initial;
  margin-block-end: 0.5em;
`

const Image = styled.img`
  margin-block-start: 0.3em;
  width: 300px;
  height: auto;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Btn = styled.a`
  margin-block-start: 2em;
  margin-block-end: 1.5em;
  color: #fb80bb;
  font-size: 18px;
`
