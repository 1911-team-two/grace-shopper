/** INIT  **/

const defaultCart = []

/** ACTION TYPES **/

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const UPDATE_ITEM = 'UPDATE_ITEM'

/** ACTION CREATORS **/

export const addToCart = (product, qty = 1) => ({
  type: ADD_TO_CART,
  product,
  qty
})

export const rmFromCart = product => ({
  type: REMOVE_FROM_CART,
  product
})

export const updateItem = (product, qty) => ({
  type: UPDATE_ITEM,
  product,
  qty
})

/** REDUCER  **/

const addHelper = (itemIndex, action, newCart) => {
  if (itemIndex > -1) {
    newCart[itemIndex].qty += action.qty
  } else {
    newCart.push({product: action.product, qty: action.qty})
  }
  return newCart
}

const rmHelper = (itemIndex, newCart) => {
  if (itemIndex > -1) newCart.splice(itemIndex, 1)
  return newCart
}

const updHelper = (itemIndex, action, newCart) => {
  if (itemIndex > -1) {
    newCart[itemIndex].qty = action.qty
  }
  return newCart
}

export default function(state = defaultCart, action) {
  // Behavior depends on whether or not the item is already in cart, so check for that first
  const itemIndex = state.findIndex(
    item => item.product.id === action.product.id
  )
  let newCart = [...state]

  switch (action.type) {
    case ADD_TO_CART:
      return addHelper(itemIndex, action, newCart)

    case REMOVE_FROM_CART:
      return rmHelper(itemIndex, newCart)

    case UPDATE_ITEM:
      return updHelper(itemIndex, action, newCart)
    default:
      return state
  }
}
