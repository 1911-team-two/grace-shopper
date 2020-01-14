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

describe('cart', () => {
  describe('actions', () => {
    it('should create an action to add to cart', () => {
      const expectedAction = {type: ADD_TO_CART, id: 1, amt: 1}
      const expectedAction2 = {type: ADD_TO_CART, id: 2, amt: 50}
      expect(addToCart(1)).to.deep.equal(expectedAction)
      expect(addToCart(2, 50)).to.deep.equal(expectedAction2)
    })

    it('should create an action to remove from cart', () => {
      const expectedAction = {type: REMOVE_FROM_CART, id: 1}
      const expectedAction2 = {type: REMOVE_FROM_CART, id: 20}
      expect(rmFromCart(1)).to.deep.equal(expectedAction)
      expect(rmFromCart(20)).to.deep.equal(expectedAction2)
    })

    it('should create an action to update item', () => {
      const expectedAction = {type: UPDATE_ITEM, id: 1, amt: 30}
      const expectedAction2 = {type: UPDATE_ITEM, id: 510, amt: 1}
      expect(updateItem(1, 30)).to.deep.equal(expectedAction)
      expect(updateItem(510, 1)).to.deep.equal(expectedAction2)
    })
  })

  describe('reducers', () => {
    const emptyCart = []
    const nonEmptyCart = [
      {id: 1, amt: 1},
      {id: 20, amt: 100}
    ]

    it('should return initial state', () => {
      expect(cartReducer(undefined, {}), [])
    })

    describe('ADD_TO_CART', () => {
      it('should add to empty cart', () => {
        expect(cartReducer(emptyCart, addToCart(1, 1))).to.deep.equal([
          {id: 1, amt: 1}
        ])
        expect(cartReducer(emptyCart, addToCart(5, 20))).to.deep.equal([
          {id: 5, amt: 20}
        ])
        expect(cartReducer(emptyCart, addToCart(25))).to.deep.equal([
          {id: 25, amt: 1}
        ])
      })

      it('should add to non-empty cart', () => {
        let expectedCart = [...nonEmptyCart, {id: 2, amt: 2}]
        let actualCart = cartReducer(nonEmptyCart, addToCart(2, 2))
        expect(actualCart).to.deep.equal(expectedCart)
        expectedCart.push({id: 30, amt: 1})
        actualCart = cartReducer(actualCart, addToCart(30))
        expectedCart.push({id: 25, amt: 1000})
        actualCart = cartReducer(actualCart, addToCart(25, 100))
      })

      it('should not duplicate items', () => {
        let expectedCart = [{id: 1, amt: 2}, nonEmptyCart[1]]
        let actualCart = cartReducer(nonEmptyCart, addToCart(1))
        expect(actualCart).to.deep.equal(expectedCart)
        expectedCart = [nonEmptyCart[0], {id: 20, amt: 120}]
        actualCart = cartReducer(nonEmptyCart, addToCart(20, 20))
      })
    })

    describe('REMOVE_FROM_CART', () => {
      it('should remove an item by id if it is in the cart', () => {
        let expectedCart = [nonEmptyCart[1]]
        let actualCart = cartReducer(nonEmptyCart, rmFromCart(1))
        expect(actualCart).to.deep.equal(expectedCart)
        expectedCart = []
        actualCart = cartReducer(actualCart, rmFromCart(20))
        expect(actualCart).to.deep.equal(expectedCart)
      })

      it('should not remove an item if it is not in the cart', () => {
        let expectedCart = [nonEmptyCart[0]]
        let actualCart = cartReducer([nonEmptyCart[0]], rmFromCart(20))
        expect(actualCart).to.deep.equal(expectedCart)
        expectedCart = []
        actualCart = cartReducer([], rmFromCart(1))
        expect(actualCart).to.deep.equal(expectedCart)
      })
    })

    describe('UPDATE_ITEM', () => {
      it('should update an item in the cart', () => {
        let expectedCart = [nonEmptyCart[0], {id: 20, amt: 30}]
        let actualCart = cartReducer(nonEmptyCart, updateItem(20, 30))
        expect(actualCart).to.deep.equal(expectedCart)
        expectedCart = [{id: 1, amt: 20}, expectedCart[1]]
        actualCart = cartReducer(actualCart, updateItem(1, 20))
      })

      it('should not update an item not in the cart', () => {
        let expectedCart = nonEmptyCart
        let actualCart = cartReducer(nonEmptyCart, updateItem(99, 0))
        expect(actualCart).to.deep.equal(expectedCart)
      })
    })
  })
})

describe.only('products', () => {
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
