/* eslint react/no-unused-state:0 */
import React, {Component} from 'react'
import styled from 'styled-components'

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
    let value = this.props.value

    return (
      <div>
        <Label htmlFor={name}>{`${labels[this.props.data]}`}</Label>
        <Input
          type="text"
          name={name}
          value={value}
          data={this.props.data}
          onChange={this.props.handleChange}
          onClick={this.props.handleClear}
        />
      </div>
    )
  }
}

export default AddressFormInput

// NOTE: this makes the label invisible, but still readable by screen readers...just trying to practice good a11y
const Label = styled.label`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: polygon(0px 0px, 0px 0px, 0px 0px);
  -webkit-clip-path: polygon(0px 0px, 0px 0px, 0px 0px);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`

const Input = styled.input`
  color: #a6a6a6;
  height: 45px;
`
