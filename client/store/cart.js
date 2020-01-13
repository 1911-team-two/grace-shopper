/** INIT  **/

const defaultCart = []

/** ACTION TYPES **/

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_ITEM = 'UPDATE_ITEM'

/** ACTION CREATORS **/

export const addToCart = (id, amt = 1) => ({type: ADD_TO_CART, id, amt})

export const rmFromCart = id => ({type: REMOVE_FROM_CART, id})

export const updateItem = (id, amt) => ({type: UPDATE_ITEM, amt})

/** REDUCER  **/

export default function(state = defaultCart, action) {
  // Behavior depends on whether or not the item is already in cart, so check for that first
  const itemIndex = state.findIndex(item => item.id === action.id)
  let newCart = [...state]

  switch (action.type) {
    case ADD_TO_CART: {
      if (itemIndex > -1) {
        newCart[itemIndex].amt += action.amt
      } else {
        newCart.push({id: action.id, amt: 1})
      }
      return newCart
    }

    case REMOVE_FROM_CART:
      if (itemIndex > -1) newCart.splice(itemIndex, 1)
      return newCart

    case UPDATE_ITEM: {
      if (itemIndex > -1) {
        newCart[itemIndex].amt = action.amt
      }

      return newCart
    }
    default:
      return state
  }
}
