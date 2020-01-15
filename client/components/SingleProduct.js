import React from 'react'
import {getProducts} from '../store/products'
import {connect} from 'react-redux'

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
  }

  async componentDidMount() {
    await this.props.getProducts()

    // Find product that matches id in link
    const product = this.props.allProducts.find(
      prod => prod.id === Number(this.props.match.params.id)
    )

    this.setState({product})
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

          <form>
            <div className="radio-group">
              <label htmlFor="size">Size</label>
              <div>
                <input type="radio" name="size" id="11x7" defaultChecked />
                <label htmlFor="11x17">11 x 17</label>
              </div>

              <div>
                <input type="radio" name="size" id="24x36" />
                <label htmlFor="24x36">24 x 36</label>
              </div>
            </div>

            <div>
              <label htmlFor="quantity">Quantity</label>
              <input type="number" min="1" name="quantity" defaultValue="1" />
            </div>
            <p>${product.price}</p>
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
  getProducts: () => dispatch(getProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
