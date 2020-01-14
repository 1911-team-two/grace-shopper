import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
enzyme.configure({
  adapter: new Adapter()
})

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
