/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import configureMockStore from 'redux-mock-store'

import {Home} from '../client/components/Home'
import AllProducts from '../client/components/AllProducts'
// import Thumbnail from '../client/components/Thumbnail'

// const mockStore = configureMockStore()
// const initialState = [{name: 'Example'}]
// const store = mockStore(initialState)

describe('Home', () => {
  let wrapper

  beforeEach('set up wrapper', () => {
    let exampleProducts = [1, 2, 3]
    let mockGetProducts = () => {}

    wrapper = shallow(
      <Home getProducts={mockGetProducts} allProducts={exampleProducts} />
    )
  })

  it('renders a header in an h2', () => {
    expect(wrapper.find('h2').text()).to.equal('All products')
  })

  it('renders the AllProducts component', () => {
    expect(wrapper.find(AllProducts)).to.have.lengthOf(1)
  })

  // it('renders the correct number of Thumbnail components', () => {
  //   expect(wrapper.find(Thumbnail)).to.equal(3)
  // })
})