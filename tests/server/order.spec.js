const request = require('supertest')
const {expect} = require('chai')
const app = require('../../server/index')
const db = require('../../server/db')
const {Order, OrderProduct, Product, User} = require('../../server/db/models/')
const createAuthenticatedRequest = require('../util')

describe('Order routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
  })

  describe('/api/orders/', () => {
    beforeEach(async () => {
      let product = await Product.create({
        name: 'Tote',
        price: 23,
        description: 'The art on this bag is by Picaso'
      })
      let order = await Order.create({
        status: 'complete'
      })
      let orderProduct = await OrderProduct.create({
        qty: 2
      })

      await orderProduct.setProduct(product)
      await orderProduct.setOrder(order)

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

    describe('GET /api/orders', () => {
      it('should return unauthorized for guests', async () => {
        await request(app)
          .get('/api/orders')
          .expect(401)
      })

      it('should get successfully for loggedin users and admins', async () => {
        await createAuthenticatedRequest(
          app,
          {
            email: 'bob@gmail.com',
            password: 'meh'
          },
          async function(req) {
            await req.get('/api/orders').expect(200)
          }
        )
      })
    })

    describe('POST /api/orders', () => {
      it('should work successfully for guests', async () => {
        await request(app)
          .post('/api/orders')
          .send({
            cart: [
              {
                qty: 1,
                product: {
                  id: 1
                }
              }
            ]
          })
          .expect(201)
      })

      it('should work successfully for loggedin users', async () => {
        await createAuthenticatedRequest(
          app,
          {
            email: 'bob@gmail.com',
            password: 'meh'
          },
          async function(req) {
            await req
              .post('/api/orders')
              .send({
                cart: []
              })
              .expect(201)
          }
        )
      })
    })
  })
})
