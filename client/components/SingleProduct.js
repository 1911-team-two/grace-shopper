import React from 'react'
import {connect} from 'react-redux'

import {getProducts} from '../store/products'
import {addToCart} from '../store/cart'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const quantity = Number(event.target.quantity.value)
    // const size = event.target.size.value

    // await axios.post('/api/cart/', this.state.product, quantity)
    this.props.addToCart(this.props.product, quantity)
  }

  render() {
    const product = this.props.product
    return (
      <div>
        <div id="product-main">
          <h2>{product.name}</h2>
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div id="product-details">
          <p id="product-description">{product.description}</p>

          <form onSubmit={this.handleSubmit}>
            {/* <div className="radio-group">
              <label htmlFor="size">Size</label>
              <div>
                <input
                  type="radio"
                  name="size"
                  value="11x7"
                  id="11x7"
                  defaultChecked
                />
                <label htmlFor="11x17">11 x 17</label>
              </div>

              <div>
                <input type="radio" name="size" value="24x36" id="24x36" />
                <label htmlFor="24x36">24 x 36</label>
              </div>
            </div> */}

            <div>
              <label htmlFor="quantity">Quantity</label>
              <input type="number" min="1" name="quantity" defaultValue="1" />
            </div>

            <p>${product.price / 100}</p>
            <button type="submit">Add to Cart</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id)
  return {
    product:
      state.products.find(product => {
        return product.id === id
      }) || {}
  }
}

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts()),
  addToCart: (product, qty) => dispatch(addToCart({product, qty}))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
