import React from 'react'

export class AddressForm extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    let values = this.props.values
    let type = this.props.type

    return (
      <div>
        <h3>{this.props.title}</h3>

        <fieldset name={this.props.type}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name={`${this.props.type}_firstName`}
            value={values[`${type}_firstName`]}
            onChange={this.props.handleChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name={`${this.props.type}_lastName`}
            value={values[`${type}_lastName`]}
            onChange={this.props.handleChange}
          />

          <label htmlFor="addressLineOne">Address</label>
          <input
            type="text"
            name={`${this.props.type}_addressLineOne`}
            value={values[`${type}_addressLineOne`]}
            onChange={this.props.handleChange}
          />

          <label htmlFor="addressLineTwo">Apartment (optional)</label>
          <input
            type="text"
            name={`${this.props.type}_addressLineTwo`}
            value={values[`${type}_addressLineTwo`]}
            onChange={this.props.handleChange}
          />

          <label htmlFor="city">City</label>
          <input
            type="text"
            name={`${this.props.type}_city`}
            value={values[`${type}_city`]}
            onChange={this.props.handleChange}
          />

          <label htmlFor="state">State</label>
          <input
            type="text"
            name={`${this.props.type}_state`}
            value={values[`${type}_state`]}
            onChange={this.props.handleChange}
          />

          <label htmlFor="zip">Zip Code</label>
          <input
            type="text"
            name={`${this.props.type}_zip`}
            value={values[`${type}_zip`]}
            onChange={this.props.handleChange}
          />
        </fieldset>
      </div>
    )
  }
}

export default AddressForm
