import React from 'react'

import Thumbnail from './Thumbnail'

// NOTE: all css is temporary, will replace with better CSS after design is finalized

const Home = () => {
  return (
    <div>
      <h2>All products</h2>

      <div style={{display: 'flex'}}>
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
      </div>
    </div>
  )
}

export default Home
