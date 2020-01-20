import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'

import {SingleProduct} from '../../client/components/SingleProduct'

describe('<SingleProduct/>', () => {
  let wrapper

  beforeEach('set up wrapper', () => {
    let exampleProduct = {name: 'This is a name of a product'}
    wrapper = shallow(<SingleProduct product={exampleProduct} />)
  })

  it('should render an h2', () => {
    expect(wrapper.find('h2').text()).to.equal('This is a name of a product')
  })
})
