import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import {getProducts} from '../store/products'
import {addToCart} from '../store/cart'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    // Initialize empty product to avoid undefined issues on render
    this.state = {
      product: {
        name: '',
        imageUrl: '',
        price: 0,
        description: ''
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const product = this.props.allProducts.find(
      prod => prod.id === Number(this.props.match.params.id)
    )

    this.setState({product})
  }

  handleSubmit(event) {
    event.preventDefault()
    const quantity = Number(event.target.quantity.value)
    // const size = event.target.size.value

    // await axios.post('/api/cart/', this.state.product, quantity)
    this.props.addToCart(this.state.product, quantity)
  }

  render() {
    const product = this.state.product
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

const mapStateToProps = state => ({
  allProducts: state.products
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts()),
  addToCart: (product, qty) => dispatch(addToCart({product, qty}))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
