/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../server/db')
const app = require('../../server/index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    beforeEach(() => {
      return Product.create({
        name: 'Tote',
        price: 23,
        description: 'The art on this bag is by Picaso'
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
      expect(res.body.price).to.be.equal(23)
      expect(res.body.description).to.be.equal(
        'The art on this bag is by Picaso'
      )
    })

    it('POST /api/products/', async () => {
      const res = await request(app)
        .post('/api/products/')
        .send({
          name: 'Pine leaves',
          price: 17,
          description: 'Beautiful printed leaves'
        })
        .expect(201)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Pine leaves')
      expect(res.body.price).to.be.equal(17)
      expect(res.body.description).to.be.equal('Beautiful printed leaves')
    })
  })
})
