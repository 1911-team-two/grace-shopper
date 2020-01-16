import axios from 'axios'
/** ACTION TYPES **/
export const GOT_ORDERS = 'GET_ALL_ORDERS'
export const FAILED_TO_GET_ORDERS = 'FAILED_TO_GET_ORDERS'
export const FAILED_TO_POST_ORDER = 'FAILED_TO_POST_ORDER'
export const SUBMITTED_ORDER = 'SUBMITTED_ORDER'

/** ACTION CREATORS **/

export const gotOrders = orders => ({type: GOT_ORDERS, orders})
export const failedToGetOrders = error => ({
  type: FAILED_TO_GET_ORDERS,
  error
})

export const failedToPostOrder = error => ({
  type: FAILED_TO_POST_ORDER,
  error
})

export const submittedOrder = order => ({type: SUBMITTED_ORDER, order})

/** THUNKS **/

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/order')
      const action = gotOrders(res.data)
      dispatch(action)
    } catch (err) {
      dispatch(failedToPostOrder(err))
    }
  }
}

export const postOrder = () => {
  return async dispatch => {
    // try {
    // } catch (error) {
    //   dispatch(failedToPostOrder(error))
    // }
  }
}

/** INIT  **/
const initialState = {
  defaultOrder: []
}

/** REDUCER  **/

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDERS:
      return {...state, defaultOrder: action.orders}
    case FAILED_TO_POST_ORDER:
      return action.error
    default:
      return state
  }
}
