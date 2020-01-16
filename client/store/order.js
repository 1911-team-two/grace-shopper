import axios from 'axios'
/** ACTION TYPES **/
export const GOT_ORDERS = 'GET_ALL_ORDERS'
export const GOT_SINGLE_ORDER = 'GOT_SINGLE_ORDER'
export const FAILED_TO_GET_ORDERS = 'FAILED_TO_GET_ORDERS'

/** ACTION CREATORS **/

export const gotOrders = orders => ({type: GOT_ORDERS, orders})
export const gotSingleOrder = order => ({type: GOT_SINGLE_ORDER, order})
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
    } catch (error) {
      dispatch(failedToGetOrders(error))
    }
  }
}

export const fetchSingleOrder = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/order/${id}`)
      const action = gotSingleOrder(res.data)
      dispatch(action)
    } catch (error) {
      dispatch(failedToGetOrders(error))
    }
  }
}

/** INIT  **/
const initialState = {
  defaultOrder: [],
  singleOrder: {}
}

/** REDUCER  **/

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDERS: {
      return {...state, defaultOrder: action.orders}
    }
    case GOT_SINGLE_ORDER: {
      return {...state, singleOrder: action.order}
    }
    default:
      return state
  }
}
