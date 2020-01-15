/* eslint-disable react/display-name */
import React, {Component} from 'react'
import {connect} from 'react-redux'

class UserProfile extends Component {
  render() {
    const user = this.props.user
    console.log(user)

    return (
      <div>
        <h1>{user.fullName}</h1>

        <br />
        <h3>Your Order History</h3>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, null)(UserProfile)
