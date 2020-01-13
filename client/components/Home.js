import React from 'react'
import {Link} from 'react-router-dom'

// NOTE: all css is temporary, will replace with better CSS after design is finalized

const Home = () => {
  return (
    <div>
      <h1>All products</h1>

      <div style={{display: 'flex'}}>
        <div>
          <Link to="/product/1">
            <img src="https://via.placeholder.com/250" alt="" />
            <p>Placeholder Name</p>
            <p>Artist Name</p>
            <p>$00.00</p>
          </Link>
        </div>
        <div>
          <img src="https://via.placeholder.com/250" alt="" />
          <p>Placeholder Name</p>
          <p>Artist Name</p>
          <p>$00.00</p>
        </div>
        <div>
          <img src="https://via.placeholder.com/250" alt="" />
          <p>Placeholder Name</p>
          <p>Artist Name</p>
          <p>$00.00</p>
        </div>
      </div>
    </div>
  )
}

export default Home
