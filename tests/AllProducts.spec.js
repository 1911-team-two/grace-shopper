import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {AllProducts} from '../client/components/AllProducts'
import Thumbnail from '../client/components/Thumbnail'

describe('<AllProducts/>', () => {
  let wrapper

  beforeEach('set up wrapper', () => {
    let exampleProducts = [
      {name: 'Example Piece One'},
      {name: 'Example Piece Two'},
      {name: 'Example Piece Three'}
    ]

    let mockGetProducts = () => {}

    wrapper = shallow(
      <AllProducts
        getProducts={mockGetProducts}
        allProducts={exampleProducts}
      />
    )
  })

  it('renders the correct number of Thumbnails', () => {
    expect(wrapper.find(Thumbnail)).to.have.lengthOf(3)
  })
})
