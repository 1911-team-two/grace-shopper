/* eslint react/no-unused-state:0 */
import React, {Component} from 'react'

export class AddressFormInput extends Component {
  render() {
    let labels = {
      firstName: 'First Name',
      lastName: 'Last Name',
      addressLineOne: 'Address',
      addressLineTwo: 'Address (optional)',
      city: 'City',
      state: 'state',
      zip: 'Zip Code'
    }

    let name = `${this.props.type}_${this.props.data}`
    let value = this.props.values[name]

    return (
      <div>
        <label htmlFor={name}>{`${labels[this.props.data]}`}</label>
        <input
          type="text"
          name={name}
          value={value}
          onChange={this.props.handleChange}
        />
      </div>
    )
  }
}

export default AddressFormInput
