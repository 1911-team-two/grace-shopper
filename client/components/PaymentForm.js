import React, {Component} from 'react'
import styled from 'styled-components'

export default class PaymentForm extends Component {
  constructor() {
    super()

    this.state = {
      cardNumber: 'Card number',
      cardName: 'Name on card',
      expiration: 'Expiration Date (MM/YY)',
      security: 'Security code'
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick(e) {
    let defaultValues = {
      cardNumber: 'Card number',
      cardName: 'Name on card',
      expiration: 'Expiration Date (MM/YY)',
      security: 'Security code'
    }

    if (defaultValues[e.target.attributes.name.nodeValue] === e.target.value) {
      this.setState({
        [e.target.name]: ''
      })
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <Fieldset className="payment_wrapper">
        <Title>Payment</Title>

        <Label htmlFor="cc_number">Card Number</Label>
        <Input
          type="text"
          name="cardNumber"
          value={this.state.cardNumber}
          onClick={this.handleClick}
          onChange={this.handleChange}
        />

        <Label htmlFor="cardname">Name on Card</Label>
        <Input
          type="text"
          name="cardName"
          value={this.state.cardName}
          onClick={this.handleClick}
          onChange={this.handleChange}
        />

        <Label htmlFor="expiration">Expiration date (MM/YY)</Label>
        <Input
          type="text"
          name="expiration"
          value={this.state.expiration}
          onClick={this.handleClick}
          onChange={this.handleChange}
        />

        <Label htmlFor="security">Security Code</Label>
        <Input
          type="text"
          name="security"
          value={this.state.security}
          onClick={this.handleClick}
          onChange={this.handleChange}
        />
      </Fieldset>
    )
  }
}

const Fieldset = styled.fieldset`
  max-width: 30vw;
  padding: 0;
  border: 0;
`

const Title = styled.h3`
  font-weight: 300;
  font-size: 25px;
`

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
