const request = require('supertest')
const app = require('../../server/index')
const db = require('../../server/db')
const {Order, OrderProduct, Product, User} = require('../../server/db/models/')

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
      let loggedInRequest

      it('login', async () => {
        loggedInRequest = request.agent(app)
        await loggedInRequest
          .post('/auth/login')
          .send({
            email: 'bob@gmail.com',
            password: 'meh'
          })
          .expect(200)
      })

      it('should return unauthorized for guests', async () => {
        await request(app)
          .get('/api/orders')
          .expect(401)
      })

      it('should get successfully for loggedin users and admins', async () => {
        await loggedInRequest.get('/api/orders').expect(200)
      })
    })

    describe('POST /api/orders', () => {
      let loggedInRequest

      it('login', async () => {
        loggedInRequest = request.agent(app)
        await loggedInRequest
          .post('/auth/login')
          .send({
            email: 'bob@gmail.com',
            password: 'meh'
          })
          .expect(200)
      })

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
        await loggedInRequest
          .post('/api/orders')
          .send({
            cart: []
          })
          .expect(201)
      })
    })
  })
})
