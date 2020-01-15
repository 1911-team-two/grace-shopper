import React from 'react'

import AllProducts from './AllProducts'

// NOTE: all css is temporary, will replace with better CSS after design is finalized

export class Home extends React.Component {
  render() {
    return (
      <div>
        <h2>All products</h2>
        <AllProducts />
      </div>
    )
  }
}

export default Home
