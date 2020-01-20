/* global describe beforeEach it */
const request = require('supertest')
const {expect} = require('chai')
const db = require('../../server/db')
const app = require('../../server/index')
const Product = db.model('product')
const User = db.model('user')
const createAuthenticatedRequest = require('../util')

describe('Product routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
  })

  describe('/api/products/', () => {
    beforeEach(async () => {
      await Product.create({
        name: 'Tote',
        price: 23,
        description: 'The art on this bag is by Picaso'
      })

      await User.create({
        fullName: 'Bob',
        email: 'bob@gmail.com',
        password: 'meh',
        isAdmin: false
      })

      await User.create({
        fullName: 'Jane',
        email: 'jane@gmail.com',
        password: 'toolazytosetapassword',
        isAdmin: true
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

    describe('POST /api/products', async () => {
      it('should return unauthorized for guest users', async () => {
        await request(app)
          .post('/api/products/')
          .send({
            name: 'Pine leaves',
            price: 17,
            description: 'Beautiful printed leaves'
          })
          .expect(401)
      })

      it('should post successfully for admins', async () => {
        await createAuthenticatedRequest(
          app,
          {
            email: 'jane@gmail.com',
            password: 'toolazytosetapassword'
          },
          async function(request) {
            let res = await request
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
          }
        )
      })
    })

    describe('PUT /api/products/:productid', async (req, res, next) => {
      it('should return unauthorized for users except admins', async () => {
        await request(app)
          .put('/api/products/1')
          .send({
            name: 'Pine leaves',
            price: 17,
            description: 'Beautiful printed leaves'
          })
          .expect(401)
      })

      it('should update successfully for admins', async () => {
        await createAuthenticatedRequest(
          app,
          {
            email: 'jane@gmail.com',
            password: 'toolazytosetapassword'
          },
          async function(request) {
            let res = await request
              .put('/api/products/1')
              .send({
                name: 'Pine leaves',
                price: 23,
                description: 'Beautiful printed leaves'
              })
              .expect(200)

            expect(res.body).to.be.an('object')
            expect(res.body.name).to.be.equal('Pine leaves')
            expect(res.body.price).to.be.equal(23)
            expect(res.body.description).to.be.equal('Beautiful printed leaves')
          }
        )
      })
    })

    describe('DESTROY /api/products/:productId', async (req, res, next) => {
      it('should return unauthorized users except admins', async () => {
        await request(app)
          .delete('/api/products/1')
          .send()
          .expect(401)
      })

      it('should delete successfully for admins', async () => {
        await createAuthenticatedRequest(
          app,
          {
            email: 'jane@gmail.com',
            password: 'toolazytosetapassword'
          },
          async function(request) {
            let res = await request
              .delete('/api/products/1')
              .send()
              .expect(204)
          }
        )
      })
    })
  })
})
