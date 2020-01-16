import axios from 'axios'

/** INIT  **/

const defaultCart = []

/** ACTION TYPES **/

export const GET_CART = 'GET_CART'
export const UPDATE_CART = 'UPDATE_CART'

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const UPDATE_ITEM = 'UPDATE_ITEM'

/** ACTION CREATORS **/

export const gotCart = cart => ({type: GET_CART, cart})

export const updateCart = cart => ({
  type: UPDATE_CART,
  cart
})

// export const addToCart = (product, qty = 1) => ({
//   type: ADD_TO_CART,
//   product,
//   qty
// })

// export const rmFromCart = product => ({
//   type: REMOVE_FROM_CART,
//   product
// })

// export const updateItem = (product, qty) => ({
//   type: UPDATE_ITEM,
//   product,
//   qty
// })

/** THUNKS **/

export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    return dispatch(gotCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const addToCart = item => async dispatch => {
  try {
    const {data} = await axios.post('/api/cart', item)
    return dispatch(updateCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const rmFromCart = item => async dispatch => {
  try {
    const {data} = await axios.delete('/api/cart', item.product.id)
    return dispatch(updateCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const changeQty = (item, qty) => async dispatch => {
  try {
    const {id} = item.product
    const {data} = await axios.put('/api/cart', {id, qty})
    return dispatch(updateCart(data))
  } catch (err) {
    console.log(err)
  }
}

/** REDUCER  **/

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_CART:
      return action.cart

    default:
      return state
  }
}
