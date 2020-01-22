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
      <Item>
        <Link to={`/product/${product.id}`}>
          <ImgThumbnail>
            <img src={product.imageUrl[1]} alt="" />
          </ImgThumbnail>
        </Link>

        <ItemInfo>
          <Row>
            <Link to={`/product/${product.id}`}>
              <p>{product.name}</p>
            </Link>
            <button type="button" onClick={() => this.props.rmFromCart(item)}>
              ×
            </button>
          </Row>
          <Row>
            <InputGroup>
              <label htmlFor="quantity">Qty </label>
              <input
                type="number"
                defaultValue={item.qty}
                min="1"
                name="quantity"
                onChange={this.handleQtyChange}
              />
            </InputGroup>
            <p>${(product.price * item.qty) / 100}</p>
          </Row>
        </ItemInfo>
      </Item>
    )
  }
}

/** STYLES **/

const Item = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  img {
    width: 100%;
  }
`

const ImgThumbnail = styled.div`
  display: flex;
  align-items: center;
  width: 14vw;
  height: 14vw;
  margin-right: 2rem;
  overflow: hidden;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    background: transparent;
    border: none;
    font-size: 1.8rem;
    color: pink;
    transition: all 0.2s ease;

    :hover {
      color: ${props => props.theme.pink};
    }
  }
`

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 0 auto;
  font-size: 1rem;
  border-top: 1px solid pink;
  border-bottom: 1px solid pink;

  a {
    font-size: 1.4rem;
    line-height: 1;

    ${ImgThumbnail}:hover & {
      color: ${props => props.theme.pink};
    }
  }
`

const InputGroup = styled.div`
  display: flex;
  align-items: center;

  input {
    width: 2.5rem;
    margin-left: 1rem;
    padding: 0.4rem 0 0.4rem 0.6rem;
    box-sizing: border-box;
    border: 1px solid pink;
    border-radius: 2px;
    caret-color: ${props => props.theme.pink};
    font-size: 0.8rem;

    :focus {
      box-shadow: 0px 0px 3px 0px pink;
    }
`

/** REDUX **/

const mapDispatch = dispatch => ({
  rmFromCart: item => dispatch(rmFromCart(item)),
  changeQty: (item, qty) => dispatch(changeQty(item, qty))
})

export default connect(null, mapDispatch)(CartItem)
