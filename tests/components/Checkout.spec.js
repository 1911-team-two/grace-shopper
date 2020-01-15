/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'

import {Checkout} from '../../client/components/Checkout'
import AddressForm from '../../client/components/AddressForm'

describe('<Checkout />', () => {
  let wrapper

  beforeEach('set up wrapper', () => {
    wrapper = shallow(<Checkout />)
  })

  it('renders a header in an h2', () => {
    expect(wrapper.find('h2').text()).to.equal('Checkout')
  })

  it('renders billing address and shipping address forms', () => {
    expect(wrapper.find(AddressForm)).to.have.lengthOf(2)
  })

  it('renders a payment information form', () => {
    expect(wrapper.find('.payment_wrapper')).have.lengthOf(1)
  })
})
