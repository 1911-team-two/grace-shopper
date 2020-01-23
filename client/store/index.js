import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import cart from './cart'
import products from './products'
import order from './order'

const OPEN_MODAL = 'OPEN_MODAL'
export const openModal = () => ({type: OPEN_MODAL})
const CLOSE_MODAL = 'CLOSE_MODAL'
export const closeModal = () => ({type: CLOSE_MODAL})

const modalReducer = (state = false, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return true
    case CLOSE_MODAL:
      return false
    default:
      return state
  }
}

const isOpen = modalReducer

const reducer = combineReducers({products, user, cart, order, isOpen})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
