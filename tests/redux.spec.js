import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore, applyMiddleware} from 'redux'

const expect = require('chai').expect

import cartReducer, {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_ITEM,
  addToCart,
  rmFromCart,
  updateItem
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
  describe('actions', () => {
    it('should create an action to add to cart', () => {
      const expectedAction = {
        type: ADD_TO_CART,
        product: products[0],
        qty: 1
      }
      const expectedAction2 = {
        type: ADD_TO_CART,
        product: products[2],
        qty: 50
      }
      expect(addToCart(products[0])).to.deep.equal(expectedAction)
      expect(addToCart(products[2], 50)).to.deep.equal(expectedAction2)
    })

    it('should create an action to remove from cart', () => {
      const expectedAction = {
        type: REMOVE_FROM_CART,
        product: products[0]
      }
      const expectedAction2 = {
        type: REMOVE_FROM_CART,
        product: products[2]
      }
      expect(rmFromCart(products[0])).to.deep.equal(expectedAction)
      expect(rmFromCart(products[2])).to.deep.equal(expectedAction2)
    })

    it('should create an action to update item', () => {
      const expectedAction = {type: UPDATE_ITEM, product: products[1], qty: 30}
      const expectedAction2 = {type: UPDATE_ITEM, product: products[2], qty: 1}
      expect(updateItem(products[1], 30)).to.deep.equal(expectedAction)
      expect(updateItem(products[2], 1)).to.deep.equal(expectedAction2)
    })
  })

  describe('reducers', () => {
    const emptyCart = []
    const nonEmptyCart = [
      {product: products[0], qty: 1},
      {product: products[1], qty: 100}
    ]

    it('should return initial state', () => {
      expect(cartReducer(undefined, {}), [])
    })

    describe('ADD_TO_CART', () => {
      it('should add to empty cart', () => {
        expect(
          cartReducer(emptyCart, addToCart(products[1], 1))
        ).to.deep.equal([{product: products[1], qty: 1}])
        expect(
          cartReducer(emptyCart, addToCart(products[0], 20))
        ).to.deep.equal([{product: products[0], qty: 20}])
        expect(cartReducer(emptyCart, addToCart(products[2]))).to.deep.equal([
          {product: products[2], qty: 1}
        ])
      })

      it('should add to non-empty cart', () => {
        let expectedCart = [...nonEmptyCart, {product: products[2], qty: 2}]
        let actualCart = cartReducer(nonEmptyCart, addToCart(products[2], 2))
        expect(actualCart).to.deep.equal(expectedCart)
        expectedCart.push({product: products[1], qty: 1000})
        actualCart = cartReducer(actualCart, addToCart(products[1], 100))
      })

      it('should not duplicate items', () => {
        let expectedCart = [{product: products[0], qty: 2}, nonEmptyCart[1]]
        let actualCart = cartReducer(nonEmptyCart, addToCart(products[0]))
        expect(actualCart).to.deep.equal(expectedCart)
        expectedCart = [nonEmptyCart[0], {product: products[1], qty: 120}]
        actualCart = cartReducer(nonEmptyCart, addToCart(products[1], 20))
      })
    })

    describe('REMOVE_FROM_CART', () => {
      it('should remove an item by id if it is in the cart', () => {
        let expectedCart = [nonEmptyCart[1]]
        let actualCart = cartReducer(
          nonEmptyCart,
          rmFromCart(nonEmptyCart[0].product)
        )
        expect(actualCart).to.deep.equal(expectedCart)
        expectedCart = []
        actualCart = cartReducer(actualCart, rmFromCart(products[1]))
        expect(actualCart).to.deep.equal(expectedCart)
      })

      it('should not remove an item if it is not in the cart', () => {
        let expectedCart = [nonEmptyCart[0]]
        let actualCart = cartReducer([nonEmptyCart[0]], rmFromCart(products[1]))
        expect(actualCart).to.deep.equal(expectedCart)
        expectedCart = []
        actualCart = cartReducer([], rmFromCart(products[1]))
        expect(actualCart).to.deep.equal(expectedCart)
      })
    })

    describe('UPDATE_ITEM', () => {
      it('should update an item in the cart', () => {
        let expectedCart = [nonEmptyCart[0], {product: products[1], qty: 30}]
        let actualCart = cartReducer(nonEmptyCart, updateItem(products[1], 30))
        expect(actualCart).to.deep.equal(expectedCart)
        expectedCart = [{product: products[1], qty: 20}, expectedCart[1]]
        actualCart = cartReducer(actualCart, updateItem(products[1], 20))
      })

      it('should not update an item not in the cart', () => {
        let expectedCart = nonEmptyCart
        let actualCart = cartReducer(nonEmptyCart, updateItem(products[2], 0))
        expect(actualCart).to.deep.equal(expectedCart)
      })
    })
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
