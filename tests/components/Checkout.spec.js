/* eslint-disable camelcase */
/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'

import {Checkout, Title} from '../../client/components/Checkout'
import {
  AddressForm,
  Fieldset,
  Title as TitleAddress
} from '../../client/components/AddressForm'
import AddressFormInput from '../../client/components/AddressFormInput'
import {CheckoutReview} from '../../client/components/CheckoutReview'
import PaymentForm from '../../client/components/PaymentForm'

describe('<Checkout />', () => {
  let wrapper

  beforeEach('set up wrapper', () => {
    let mockCart = [
      {product: {price: 0}},
      {product: {price: 0}},
      {product: {price: 0}}
    ]
    wrapper = shallow(<Checkout cart={mockCart} />)
  })

  it('renders a header in an h2', () => {
    expect(wrapper.find(Title).text()).to.equal('Checkout')
  })

  it('renders billing address and shipping address forms', () => {
    expect(wrapper.find(AddressForm)).to.have.lengthOf(2)
  })

  it('renders a payment information form', () => {
    expect(wrapper.find(PaymentForm)).have.lengthOf(1)
  })

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
      expect(wrapper.find(TitleAddress)).to.have.lengthOf(1)
    })

    it('renders a fieldset', () => {
      expect(wrapper.find(Fieldset)).to.have.lengthOf(1)
    })

    it('renders an input for each piece of information', () => {
      expect(wrapper.find(AddressFormInput)).to.have.lengthOf(8)
    })

    // describe('<AddressFormInput />', () => {
    //   let inputWrapper
    //   let input

    //   beforeEach(() => {
    //     let values = {
    //       shipping_firstName: '',
    //       shipping_lastName: '',
    //       shipping_addressLineOne: '',
    //       shipping_addressLineTwo: '',
    //       shipping_city: '',
    //       shipping_state: '',
    //       shipping_zip: '',
    //       billing_firstName: '',
    //       billing_lastName: '',
    //       billing_addressLineOne: '',
    //       billing_addressLineTwo: '',
    //       billing_city: '',
    //       billing_state: '',
    //       billing_zip: ''
    //     }

    //     // passing in dummy data for this particular input
    //     inputWrapper = shallow(
    //       <AddressFormInput type="shipping" data="firstName" values={values} />
    //     )

    //     input = inputWrapper.find('input')
    //   })

    //   it('should render one input', () => {
    //     expect(inputWrapper.find('input')).to.have.lengthOf(1)
    //   })

    //   it('renders a label with the correct text', () => {
    //     expect(inputWrapper.find('label').text()).to.equal('First Name')
    //   })

    //   describe('the input', () => {
    //     it('should have the correct name prop', () => {
    //       expect(input.prop('name')).to.equal('shipping_firstName')
    //     })

    //     it('should have an object of values passed in', () => {
    //       expect(input.prop('value')).to.be.an('object')
    //     })
    //   })
    // })
  })

  describe('<CheckoutReview />', () => {
    let reviewWrapper

    beforeEach(() => {
      const mockGetCart = () => {}
      const mockCart = [{name: 'Sun and Moon'}, {name: 'Sword and Shield'}]
      reviewWrapper = shallow(
        <CheckoutReview getCart={mockGetCart} cart={mockCart} />
      )
    })

    it('renders a title in an h3', () => {
      expect(reviewWrapper.find('h3').text()).to.equal('Review Your Order')
    })

    // it('renders a component for each unique item in the cart', () => {
    //   expect(reviewWrapper.find(CartItem)).to.have.lengthOf(2)
    // })

    // describe('<CheckoutReviewItem />', () => {
    //   let itemWrapper

    //   beforeEach(() => {
    //     let mockProduct = {name: 'Leaf Green'}
    //     itemWrapper = shallow(<CheckoutReviewItem product={mockProduct} />)
    //   })

    //   it('renders the name of the item', () => {
    //     expect(itemWrapper.find('.productName').text()).to.equal('Leaf Green')
    //   })
    // })
  })
})
