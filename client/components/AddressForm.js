import React from 'react'

export class AddressForm extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>

        <form>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name={`firstName_${this.props.type}`}
            onChange={this.props.handleChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" />

          <label htmlFor="addressLineOne">Address</label>
          <input type="text" name="addressLineOne" />

          <label htmlFor="addressLineTwo">Apartment (optional)</label>
          <input type="text" name="addressLineTwo" />

          <label htmlFor="city">City</label>
          <input type="text" name="city" />

          <label htmlFor="state">State</label>
          <input type="text" name="state" />

          <label htmlFor="zip">Zip Code</label>
          <input type="text" name="zip" />
        </form>
      </div>
    )
  }
}

export default AddressForm
