/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../../server/db')
const app = require('../../../server/index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    beforeEach(() => {
      return Product.create({
        name: 'Tote',
        price: 23.5,
        description: 'The art on this bag is by Picaso',
        category: 'bags',
        filter: ['art']
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Tote')
    })

    it('GET /api/products/:productid', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Tote')
      expect(res.body.price).to.be.equal(23.5)
      expect(res.body.description).to.be.equal(
        'The art on this bag is by Picaso'
      )
      expect(res.body.category).to.be.equal('bags')
      expect(res.body.filter).to.be.an('array')
      expect(res.body.filter[0]).to.be.equal('art')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
