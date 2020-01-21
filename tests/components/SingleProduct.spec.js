import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'

import {SingleProduct} from '../../client/components/SingleProduct'

describe('<SingleProduct/>', () => {
  let wrapper

  beforeEach('set up wrapper', () => {
    let mock = () => {}
    let mockMatch = {
      params: {
        id: '1'
      }
    }
    let exampleProduct = {name: 'This is a name of a product'}
    wrapper = shallow(
      <SingleProduct
        addToCart={mock}
        getProducts={mock}
        match={mockMatch}
        product={exampleProduct}
      />
    )
    wrapper.setState({
      product: {name: 'This is a name of a product', imageUrl: ['google.com']}
    })
  })

  it('should render an h2', () => {
    expect(wrapper.find('h2').text()).to.equal('This is a name of a product')
  })
})
