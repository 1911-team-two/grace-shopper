/* eslint-disable react/no-array-index-key */
import React from 'react'
import styled from 'styled-components'
import AddressFormInput from './AddressFormInput'

export class AddressForm extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    let values = this.props.values
    let type = this.props.type
    // console.log('type:', values)

    let dataNeeded = [
      'firstName',
      'lastName',
      'addressLineOne',
      'addressLineTwo',
      'city',
      'state',
      'country',
      'zip'
    ]

    return (
      <Wrapper>
        <h3>{this.props.title}</h3>

        <Fieldset name={this.props.type}>
          {/* {dataNeeded.map((data, i) => {
            return (
              <AddressFormInput
                key={i}
                type={type}
                values={values}
                data={data}
                handleChange={this.props.handleChange}
              />
            )
          })} */}

          <div>
            <AddressFormInput
              type={type}
              value={this.props.values[`${type}_firstName`]}
              data="firstName"
              handleChange={this.props.handleChange}
              handleClear={this.props.handleClear}
            />
            <AddressFormInput
              type={type}
              value={this.props.values[`${type}_lastName`]}
              data="_lastName"
              handleChange={this.props.handleChange}
            />
          </div>
        </Fieldset>
      </Wrapper>
    )
  }
}

export default AddressForm

const Wrapper = styled.div``

const Fieldset = styled.fieldset`
  padding: 0;
  border: 0;
`
