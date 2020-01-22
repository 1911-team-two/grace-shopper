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

    let dataNeeded = [
      'firstName',
      'lastName',
      'addressLineOne',
      'addressLineTwo',
      'city',
      'country',
      'state',
      'zip'
    ]

    return (
      <Wrapper>
        <Title>{this.props.title}</Title>

        <Fieldset name={this.props.type}>
          {dataNeeded.map((data, i) => {
            return (
              <AddressFormInput
                key={i}
                type={type}
                values={values}
                data={data}
                handleChange={this.props.handleChange}
                handleClear={this.props.handleClear}
              />
            )
          })}
        </Fieldset>
      </Wrapper>
    )
  }
}

export default AddressForm

const Wrapper = styled.div``

export const Fieldset = styled.fieldset`
  max-width: 30vw;
  padding: 0;
  border: 0;
`

export const Title = styled.h3`
  font-weight: 300;
  font-size: 25px;
`
