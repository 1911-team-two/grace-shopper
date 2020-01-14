import React from 'react'
import {Link} from 'react-router-dom'

const Thumbnail = () => {
  return (
    <div>
      <Link to="/product/1">
        <img src="https://via.placeholder.com/250" alt="" />
        <p>Placeholder Name</p>
        <p>Artist Name</p>
        <p>$00.00</p>
      </Link>
    </div>
  )
}

export default Thumbnail
