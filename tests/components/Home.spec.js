/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'

import Home, {Header} from '../../client/components/Home'
import AllProducts from '../../client/components/AllProducts'

describe('Home', () => {
  let wrapper

  beforeEach('set up wrapper', () => {
    wrapper = shallow(<Home />)
  })

  it('renders a header in an h2', () => {
    console.log(wrapper)
    expect(
      wrapper
        .find(Header)
        .first()
        .text()
    ).to.equal('Featured products')
  })

  it('renders the AllProducts component', () => {
    expect(wrapper.find(AllProducts)).to.have.lengthOf(1)
  })
})
