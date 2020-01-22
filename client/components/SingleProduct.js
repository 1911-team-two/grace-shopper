import React from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store/products'
import {addToCart} from '../store/cart'
import styled from 'styled-components'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {
        imageUrl: []
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      this.setState({
        product: this.props.product
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const quantity = Number(event.target.quantity.value)
    // const size = event.target.size.value

    // await axios.post('/api/cart/', this.state.product, quantity)
    this.props.addToCart(this.props.product, quantity)
  }
  render() {
    const product = this.state.product
    console.log('STATE', this.state)
    return (
      <Wrapper>
        <StyledImg id="product-main">
          <div>
            <a key={product.id}>
              {product.imageUrl.map(image => {
                return <img src={image} />
              })}
            </a>
          </div>

          {/* <img src={product.imageUrl[0]} /> */}
        </StyledImg>
        <StyledDetails>
          <div id="product-details">
            <h2>{product.name}</h2>
            <Price>${product.price / 100}</Price>

            <Form onSubmit={this.handleSubmit}>
              <Button type="submit">Add to Cart</Button>
              <Quantity>
                <label htmlFor="quantity">Quantity</label>
                <input type="number" min="1" name="quantity" defaultValue="1" />
              </Quantity>
            </Form>
            <Header>Description:</Header>
            <Description id="product-description">
              {product.description}
            </Description>
          </div>
        </StyledDetails>
      </Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  min-height: max-content;
`
const StyledImg = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px;
  align-items: flex-start;
  /* height: 700px; */
  margin-block-end: 20px;
`

const StyledDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50px;
  margin-top: 5vh;
  position: sticky;
  top: 0;
`

const h2 = styled.h2`
  font-size: 50px;
  padding: 0px;
  margin-block-end: 0px;
  margin-block-start: 0px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

const Quantity = styled.div`
  margin: 0px;
  margin-block-start: 20px;
`

const Price = styled.p`
  font-size: 30px;
  margin-block-start: 0px;
`

const Header = styled.h4`
  font-size: 30px;
  margin-block-end: 0.5em;
`

const Description = styled.p`
  font-size: 22px;
  margin-block-start: 0em;
`

const Button = styled.button`
  background-color: #fb80bb;
  color: white;
  height: 50px;
  font-size: 25px;
`
