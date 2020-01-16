/* eslint-disable no-unused-expressions */
/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import sinon from 'sinon'

import {AddressForm} from '../../client/components/AddressForm'
import {Checkout} from '../../client/components/Checkout'
import AddressFormInput from '../../client/components/AddressFormInput'

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
    expect(wrapper.find(AddressFormInput)).to.have.lengthOf(7)
  })

  describe('<AddressFormInput />', () => {
    let inputWrapper
    let input

    beforeEach(() => {
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

      // passing in dummy data for this particular input
      inputWrapper = shallow(
        <AddressFormInput type="shipping" data="firstName" values={values} />
      )

      input = inputWrapper.find('input')
    })

    it('should render one input', () => {
      expect(inputWrapper.find('input')).to.have.lengthOf(1)
    })

    it('renders a label with the correct text', () => {
      expect(inputWrapper.find('label').text()).to.equal('First Name')
    })

    describe('the input', () => {
      it('should have the correct name prop', () => {
        expect(input.prop('name')).to.equal('shipping_firstName')
      })

      it('should have a value that is initially empty', () => {
        expect(input.prop('value')).to.equal('')
      })
    })
  })
})
