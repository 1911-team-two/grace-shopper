import React from 'react'
import {expect} from 'chai'
import {mount, shallow} from 'enzyme'

import Home from '../client/components/Home'
import Thumbnail from '../client/components/Thumbnail'

describe('<Home/>', () => {
  it('should render an h2', () => {
    const wrapper = shallow(<Home />)
    expect(wrapper.find('h2').text()).to.equal('All products')
  })

  it('renders three PLACEHOLDER thumnails', () => {
    const wrapper = shallow(<Home />)
    expect(wrapper.find(Thumbnail)).to.have.lengthOf(3)
  })
})
