import axios from 'axios'
/** ACTION TYPES **/
export const GOT_ORDERS = 'GET_ALL_ORDERS'
export const FAILED_TO_GET_ORDERS = 'FAILED_TO_GET_ORDERS'

/** ACTION CREATORS **/

export const gotOrders = orders => ({type: GOT_ORDERS, orders})
export const failedToGetOrders = error => ({
  type: FAILED_TO_GET_ORDERS,
  error
})

/** THUNKS **/

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/order')
      const action = gotOrders(res.data)
      dispatch(action)
    } catch (err) {
      dispatch(failedToGetOrders(err))
    }
  }
}

/** INIT  **/
const initialState = {
  defaultOrder: []
}

/** REDUCER  **/

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDERS: {
      return {...state, defaultOrder: action.orders}
    }
    default:
      return state
  }
}
