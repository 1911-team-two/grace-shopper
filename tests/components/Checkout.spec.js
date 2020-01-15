/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'

import {Checkout} from '../../client/components/Checkout'

describe('<Checkout />', () => {
  let wrapper

  beforeEach('set up wrapper', () => {
    wrapper = shallow(<Checkout />)
  })

  it('renders a header in an h2', () => {
    expect(wrapper.find('h2').text()).to.equal('Checkout')
  })
})
