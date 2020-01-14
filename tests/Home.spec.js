import React from 'react'
import {expect} from 'chai'
import {mount, shallow} from 'enzyme'
import {Provider} from 'react-redux'
import TestRenderer from 'react-test-renderer'

import {Home} from '../client/components/Home'
import Thumbnail from '../client/components/Thumbnail'

import configureStore from 'redux-mock-store'

import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({adapter: new Adapter()})

let mockStore = configureStore([])

describe('<Home/>', () => {
  let store
  let component

  // beforeEach(() => {
  // store = mockStore({
  //   myState: 'sample text'
  // })
  // component = TestRenderer.create(
  //   <Provider store={store}>
  //     <Home />
  //   </Provider>
  // })

  // it('renders three PLACEHOLDER thumnails', () => {
  //   const wrapper = shallow(<Home />)
  //   expect(wrapper.find(Thumbnail)).to.have.lengthOf(3)
  // })

  it.only('renders as many thumbnails as there are items', () => {
    store = mockStore({
      products: []
    })

    component = TestRenderer.create(
      <Provider store={store}>
        <Home />
      </Provider>
    )

    console.log(component.toTree())
  })
})
