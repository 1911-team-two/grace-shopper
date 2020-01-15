import React from 'react'

export const AddressForm = props => {
  return (
    <div>
      <h2>{props.title}</h2>

      <form>
        {/* first name, last name, address 1, address 2, city, state , zip*/}
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" />

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

export default AddressForm
