import reducer, {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_ITEM,
  addToCart,
  rmFromCart,
  updateItem
} from '../client/store/cart'

const expect = require('chai').expect

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
  it('should return initial state', () => {
    expect(reducer(undefined, {}), [])
  })

  describe('ADD_TO_CART', () => {
    const emptyCart = []
    const nonEmptyCart = [
      {id: 1, amt: 1},
      {id: 20, amt: 100}
    ]

    it('should add to empty cart', () => {
      expect(reducer(emptyCart, addToCart(1, 1))).to.deep.equal([
        {id: 1, amt: 1}
      ])
      expect(reducer(emptyCart, addToCart(5, 20))).to.deep.equal([
        {id: 5, amt: 20}
      ])
      expect(reducer(emptyCart, addToCart(25))).to.deep.equal([
        {id: 25, amt: 1}
      ])
    })

    it('should add to non-empty cart', () => {
      let expectedCart = [...nonEmptyCart, {id: 2, amt: 2}]
      let actualCart = reducer(nonEmptyCart, addToCart(2, 2))
      expect(actualCart).to.deep.equal(expectedCart)
      expectedCart.push({id: 30, amt: 1})
      actualCart = reducer(actualCart, addToCart(30))
      expectedCart.push({id: 25, amt: 1000})
      actualCart = reducer(actualCart, addToCart(25, 100))
    })

    it('should not duplicate items', () => {
      let expectedCart = [{id: 1, amt: 2}, nonEmptyCart[1]]
      let actualCart = reducer(nonEmptyCart, addToCart(1))
      expect(actualCart).to.deep.equal(expectedCart)
      expectedCart = [nonEmptyCart[0], {id: 20, amt: 120}]
      actualCart = reducer(nonEmptyCart, addToCart(20, 20))
    })
  })
})