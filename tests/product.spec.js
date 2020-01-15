/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../server/db/index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  let description = ''
  describe('Attributes', () => {
    it('includes `imageUrl`, `name`, `price`, `description`, `category`, and `filter` fields', async () => {})
  })
  describe('Validations', () => {
    it('requires `name`', async () => {
      const product = Product.build()
      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('product.name cannot be null')
      }
    })
    it('requires `name` to not be an empty string', async () => {
      const product = Product.build({
        name: ''
      })

      try {
        await product.validate()
        throw Error(
          'Validation error: validation was successful but should have failed if name is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })
    it('requires `price`', async () => {
      const product = Product.build()
      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed without `price`'
        )
      } catch (err) {
        expect(err.message).to.contain('product.price cannot be null')
      }
    })
  })
}) // end describe('Product model')
