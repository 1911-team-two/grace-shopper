const axios = require('axios')

/** INIT **/

const initAllProducts = []

/** ACTIONS **/

export const GOT_PRODUCTS = 'GET_ALL_PRODUCTS'
export const FAILED_TO_GET_PRODUCTS = 'FAILED_TO_GET_PRODUCTS'

/** ACTION CREATORS **/

export const gotProducts = products => ({type: GOT_PRODUCTS, products})
export const failedToGetProducts = error => ({
  type: FAILED_TO_GET_PRODUCTS,
  error
})

/** THUNKS **/

export const getProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')

      dispatch(gotProducts(data.slice()))
    } catch (err) {
      dispatch(failedToGetProducts(err))
    }
  }
}

/** REDUCER  **/

export default function(state = initAllProducts, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      console.log(action)
      return action.products
    case FAILED_TO_GET_PRODUCTS:
      return action.error
    default:
      return state
  }
}
