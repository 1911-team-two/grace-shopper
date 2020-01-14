import React from 'react'
import {expect} from 'chai'
import enzyme, {mount, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SingleProduct from '../client/components/SingleProduct'

enzyme.configure({
  adapter: new Adapter()
})

describe('<SingleProduct/>', () => {
  it('should render an h2', () => {
    const wrapper = shallow(<SingleProduct />)
    expect(wrapper.find('h2').text()).to.equal('Single Product Name')
  })
})
