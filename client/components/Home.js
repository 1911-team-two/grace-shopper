import React from 'react'

// NOTE: all css is temporary, will replace with better CSS after design is finalized

const Home = () => {
  return (
    <div>
      <h1>All products</h1>

      <div style={{display: 'flex'}}>
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
