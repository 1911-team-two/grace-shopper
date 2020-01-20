import axios from 'axios'

/** INIT  **/

const defaultCart = []

/** ACTION TYPES **/

export const GET_CART = 'GET_CART'
export const UPDATE_CART = 'UPDATE_CART'

/** ACTION CREATORS **/

export const gotCart = cart => ({type: GET_CART, cart})

export const updateCart = cart => ({
  type: UPDATE_CART,
  cart
})

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
    const action = updateCart(data)
    return dispatch(action)
  } catch (err) {
    console.log(err)
  }
}

export const rmFromCart = item => async dispatch => {
  try {
    const res = await axios.delete(`/api/cart/${item.product.id}`)
    return dispatch(updateCart(res.data))
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
