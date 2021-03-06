import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'

import PropTypes from 'prop-types'

import {
  Home,
  SingleProduct,
  Cart,
  UserProfile,
  Checkout,
  OrderConfirmation,
  Navbar,
  LoginOrSignup
} from './components'

import {me} from './store'
import SingleOrder from './components/SingleOrder'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/checkout" component={Checkout} />
          <Route component={hasHeader} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          {/* <Route component={Login} /> */}
        </Switch>
      </div>
    )
  }
}

const hasHeader = () => (
  <div>
    <Navbar />
    <Route path="/cart" component={Cart} />
    <Route path="/login" component={LoginOrSignup} />

    <Route exact path="/checkout" component={Checkout} />
    <Route path="/confirmation" component={OrderConfirmation} />

    <Route exact path="/product/:id" component={SingleProduct} />
    <Route exact path="/profile/:orderId" component={SingleOrder} />
    <Route exact path="/profile" component={UserProfile} />

    <Route exact path="/" component={Home} />
  </div>
)
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
