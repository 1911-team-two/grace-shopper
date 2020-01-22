import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserProfile} from '../../client/components/UserProfile'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserPage', () => {
  let userProfile

  beforeEach(() => {
    userProfile = shallow(
      <UserProfile
        user={{fullName: 'Tashi'}}
        orders={[]}
        getOrders={() => {}}
      />
    )
  })

  it('renders the name in an h1', () => {
    expect(userProfile.find('h1').text()).to.be.equal('Tashi')
  })
})
