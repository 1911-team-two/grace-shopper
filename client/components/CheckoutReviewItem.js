import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import styled from 'styled-components'

import {rmFromCart, changeQty} from '../store/cart'

class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleQtyChange = this.handleQtyChange.bind(this)
  }

  handleQtyChange(e) {
    this.props.changeQty(this.props.item, e.target.value)
  }

  render() {
    const item = this.props.item
    const product = this.props.item.product
    return (
      <Wrapper>
        <div>
          {/* <Link to={`/product/${product.id}`}> */}
          <Thumbnail src={product.imageUrl[1]} alt="" />
          {/* </Link> */}
        </div>
        <div>
          <Detail>{product.name}</Detail>
          <Detail>Quantity: {item.qty}</Detail>
          <Detail>${(product.price * item.qty) / 100}</Detail>
          {/* <input
            type="number"
            defaultValue={item.qty}
            min="1"
            name="quantity"
            onChange={this.handleQtyChange}
          /> */}

          {/* <button type="button" onClick={() => this.props.rmFromCart(item)}>
            Remove
          </button> */}
        </div>
      </Wrapper>
    )
  }
}

const mapDispatch = dispatch => ({
  rmFromCart: item => dispatch(rmFromCart(item)),
  changeQty: (item, qty) => dispatch(changeQty(item, qty))
})

export default connect(null, mapDispatch)(CartItem)

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: flex-end;
`
const Thumbnail = styled.img`
  padding-right: 15px;
`
const Detail = styled.p`
  line-height: 40%;
  font-size: 13px;
`
