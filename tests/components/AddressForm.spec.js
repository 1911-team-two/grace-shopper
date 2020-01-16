/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'

import {AddressForm} from '../../client/components/AddressForm'
import {Checkout} from '../../client/components/Checkout'

describe('<AddressForm />', () => {
  let wrapper

  beforeEach('set up wrapper', () => {
    let values = {
      shipping_firstName: '',
      shipping_lastName: '',
      shipping_addressLineOne: '',
      shipping_addressLineTwo: '',
      shipping_city: '',
      shipping_state: '',
      shipping_zip: '',
      billing_firstName: '',
      billing_lastName: '',
      billing_addressLineOne: '',
      billing_addressLineTwo: '',
      billing_city: '',
      billing_state: '',
      billing_zip: ''
    }

    wrapper = shallow(<AddressForm type="shipping" values={values} />)
  })

  it('renders a header in an h3', () => {
    expect(wrapper.find('h3')).to.have.lengthOf(1)
  })

  it('renders a fieldset', () => {
    expect(wrapper.find('fieldset')).to.have.lengthOf(1)
  })

  it('renders an input for each piece of information', () => {
    expect(wrapper.find('input')).to.have.lengthOf(7)
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

  // really cant figure this out
  // describe('the input', () => {
  // it('calls handleChange on change', () => {
  //   const input = wrapper.find('[name="shipping_firstName"]')
  //   input.simulate('change')

  //   const mockHandleChange = () => {}

  //   expect(mockHandleChange).toHaveBeenCalled()
  // })
  // })
})
