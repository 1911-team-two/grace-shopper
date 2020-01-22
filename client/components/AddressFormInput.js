/* eslint react/no-unused-state:0 */
import React, {Component} from 'react'
import styled from 'styled-components'

export class AddressFormInput extends Component {
  render() {
    let labels = {
      firstName: 'First name',
      lastName: 'Last name',
      addressLineOne: 'Address',
      addressLineTwo: 'Apartment, suite, etc. (optional)',
      city: 'City',
      state: 'State',
      country: 'Country',
      zip: 'Zip Code'
    }

    let name = `${this.props.type}_${this.props.data}`
    let value = this.props.values[`${this.props.type}_${this.props.data}`]

    return (
      <Wrapper>
        <Label htmlFor={name}>{`${labels[this.props.data]}`}</Label>
        <Input
          type="text"
          name={name}
          value={value}
          data={this.props.data}
          onChange={this.props.handleChange}
          onClick={this.props.handleClear}
        />
      </Wrapper>
    )
  }
}

export default AddressFormInput

const Wrapper = styled.div``

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
  color: #c8c8c8;
  height: 50px;
  width: 100%;
  margin-bottom: 12px;
  padding-left: 2%;
  border: 1px solid #d3d3d3;
  border-radius: 5px;

  :focus {
    border-color: pink;
    box-shadow: 0 0 1px 1px pink;
    transition: all 0.2s ease-out;
  }
`
