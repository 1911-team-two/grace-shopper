const expect = require('chai').expect

import cartReducer, {
  GET_CART,
  UPDATE_CART,
  gotCart,
  updateCart
} from '../client/store/cart'

import productReducer, {
  GOT_PRODUCTS,
  FAILED_TO_GET_PRODUCTS,
  gotProducts,
  failedToGetProducts,
  getProducts
} from '../client/store/products'

const products = [{id: 1, hello: 'hello'}, {id: 2, bye: 'hello'}, {id: 3}]

describe('cart', () => {
  let cart = [
    {product: products[0], qty: 1},
    {product: products[1], qty: 100}
  ]

  describe('action creators', () => {
    it('gotCart should create correct action', () => {
      expect(gotCart(cart)).to.deep.equal({type: GET_CART, cart})
    })

    it('updateCart should create correct action', () => {
      expect(updateCart(cart)).to.deep.equal({type: UPDATE_CART, cart})
    })
  })
})

describe('reducers', () => {
  const emptyCart = []
  const nonEmptyCart = [
    {product: products[0], qty: 1},
    {product: products[1], qty: 100}
  ]

  it('should return initial state', () => {
    expect(cartReducer(undefined, {}), emptyCart)
  })

  it('should update the state correctly for UPDATE_CART action', () => {
    const action = {type: UPDATE_CART, cart: nonEmptyCart}
    const expected = [
      {product: products[0], qty: 1},
      {product: products[1], qty: 100}
    ]
    expect(cartReducer(emptyCart, action)).to.deep.equal(expected)
  })

  it('should update the state correctly for GET_CART action', () => {
    const action = {type: GET_CART, cart: nonEmptyCart}
    const expected = [
      {product: products[0], qty: 1},
      {product: products[1], qty: 100}
    ]
    expect(cartReducer(emptyCart, action)).to.deep.equal(expected)
  })
})

describe('products', () => {
  const productsData = [
    {
      id: 1,
      imageUrl:
        'https://ctl.s6img.com/society6/img/-Df-I9ypq_VVCaZngqRxZiJthgQ/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/133a3e56f0e34a80b6c2130f394c9f72/~~/bold-and-brash1563343-prints.jpg?wait=0&attempt=0',
      name: 'The Squidward',
      price: 18.99,
      description:
        'Natural white, matte, ultra smooth background. 100% cotton, acid and lignin-free archival paper. Custom trimmed with border for framing; 1" for x-small and small, 2" for all larger sizes. Every order is custom made just for you',
      category: ['print'],
      filter: ['funny'],
      createdAt: '2020-01-14T17:44:44.019Z',
      updatedAt: '2020-01-14T17:44:44.019Z'
    }
  ]

  describe('action creators', () => {
    it('should create an action when products are retrieved', () => {
      expect(gotProducts({})).to.deep.equal({type: GOT_PRODUCTS, products: {}})
      expect(gotProducts(productsData)).to.deep.equal({
        type: GOT_PRODUCTS,
        products: productsData
      })
    })

    it('should create an action when an error is thrown retrieving products', () => {
      expect(failedToGetProducts('Failed')).to.deep.equal({
        type: FAILED_TO_GET_PRODUCTS,
        error: 'Failed'
      })
      expect(
        failedToGetProducts({type: 'Error type', message: 'Error message'})
      ).to.deep.equal({
        type: FAILED_TO_GET_PRODUCTS,
        error: {type: 'Error type', message: 'Error message'}
      })
    })
  })

  describe('thunk creators', () => {
    it('the thunk returns a function', () => {
      expect(getProducts()).to.be.an.instanceOf(Function)
    })
  })

  describe('reducer', () => {
    it('should add products to state', () => {
      expect(productReducer([], gotProducts(productsData))).to.deep.equal(
        productsData
      )
    })

    it('should produce an error if it fails to get products', () => {
      expect(productReducer([], failedToGetProducts('error'))).to.deep.equal(
        'error'
      )
      expect(
        productReducer([], failedToGetProducts({error: 'error'}))
      ).to.deep.equal({error: 'error'})
    })
  })
})
