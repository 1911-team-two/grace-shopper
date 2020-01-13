import React from 'react'

const SingleProduct = () => {
  return (
    <div>
      <h2>Single Product Name</h2>
      <h3>By Placeholder Artist</h3>
      <img src="https://via.placeholder.com/250" alt="" />

      <div>
        <input type="radio" name="11x17" id="" />
        <label htmlFor="11x17">11 x 17</label>
      </div>

      <div>
        <input type="radio" name="24x36" id="" />
        <label htmlFor="24x36">24 x 36</label>
      </div>

      <div>
        <label htmlFor="quantity">Quantity</label>
        <input type="number" min="0" name="quantity" id="" />
      </div>
      <p>$00.00</p>
      <button type="submit">Add to Cart</button>
    </div>
  )
}

export default SingleProduct
