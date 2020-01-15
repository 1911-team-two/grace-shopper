/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'

import {AddressForm} from '../../client/components/AddressForm'

describe('<AddressForm />', () => {
  let wrapper

  beforeEach('set up wrapper', () => {
    wrapper = shallow(<AddressForm />)
  })

  it('renders a header in an h2', () => {
    expect(wrapper.find('h2')).to.have.lengthOf(1)
  })

  it('renders a form', () => {
    expect(wrapper.find('form')).to.have.lengthOf(1)
  })

  it('renders an input for each piece of information', () => {
    expect(wrapper.find('[name="firstName"]')).to.have.lengthOf(1)
    expect(wrapper.find('[name="lastName"]')).to.have.lengthOf(1)
    expect(wrapper.find('[name="addressLineOne"]')).to.have.lengthOf(1)
    expect(wrapper.find('[name="addressLineTwo"]')).to.have.lengthOf(1)
    expect(wrapper.find('[name="city"]')).to.have.lengthOf(1)
    expect(wrapper.find('[name="state"]')).to.have.lengthOf(1)
    expect(wrapper.find('[name="zip"]')).to.have.lengthOf(1)
  })

  it('renders a label for each input', () => {
    expect(wrapper.find('[htmlFor="firstName"]').text()).to.equal('First Name')
    expect(wrapper.find('[htmlFor="lastName"]').text()).to.equal('Last Name')
    expect(wrapper.find('[htmlFor="addressLineTwo"]').text()).to.equal(
      'Apartment (optional)'
    )
    expect(wrapper.find('[htmlFor="city"]').text()).to.equal('City')
    expect(wrapper.find('[htmlFor="state"]').text()).to.equal('State')
    expect(wrapper.find('[htmlFor="zip"]').text()).to.equal('Zip Code')
  })
})
