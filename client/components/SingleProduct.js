import React from 'react'

const SingleProduct = props => {
  // const product = props.product;
  const product = {
    id: 1,
    imageUrl:
      'https://ctl.s6img.com/society6/img/-Df-I9ypq_VVCaZngqRxZiJthgQ/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/133a3e56f0e34a80b6c2130f394c9f72/~~/bold-and-brash1563343-prints.jpg?wait=0&attempt=0',
    name: 'The Squidward',
    price: 18.99,
    description:
      'Natural white, matte, ultra smooth background. 100% cotton, acid and lignin-free archival paper. Custom trimmed with border for framing; 1" for x-small and small, 2" for all larger sizes. Every order is custom made just for you',
    category: ['print'],
    filter: ['funny'],
    createdAt: '2020-01-14T17:44:44.019Z',
    updatedAt: '2020-01-14T17:44:44.019Z'
  }
  // dummy data

  return (
    <div>
      <div id="product-main">
        <h2>{product.name}</h2>
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <div id="product-details">
        <p id="product-description">{product.description}</p>

        <form>
          <div className="radio-group">
            <label htmlFor="size">Size</label>
            <div>
              <input type="radio" name="size" id="11x7" checked />
              <label htmlFor="11x17">11 x 17</label>
            </div>

            <div>
              <input type="radio" name="size" id="24x36" />
              <label htmlFor="24x36">24 x 36</label>
            </div>
          </div>

          <div>
            <label htmlFor="quantity">Quantity</label>
            <input type="number" min="1" name="quantity" defaultValue="1" />
          </div>
          <p>${product.price}</p>
          <button type="submit">Add to Cart</button>
        </form>
      </div>
    </div>
  )
}

export default SingleProduct
