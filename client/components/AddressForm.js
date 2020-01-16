/* eslint-disable react/no-array-index-key */
import React from 'react'
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
      'state',
      'zip'
    ]

    return (
      <div>
        <h3>{this.props.title}</h3>

        <fieldset name={this.props.type}>
          {dataNeeded.map((data, i) => {
            return (
              <AddressFormInput
                key={i}
                type={type}
                values={values}
                data={data}
                handleChange={this.props.handleChange}
              />
            )
          })}
        </fieldset>
      </div>
    )
  }
}

export default AddressForm
