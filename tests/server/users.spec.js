/* global describe beforeEach it */

const request = require('supertest')
const db = require('../../server/db')
const app = require('../../server/index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
  })

  describe('/api/users/', () => {
    beforeEach(async () => {
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

    describe('GET /api/users', () => {
      let loggedInRequest

      it('login', async () => {
        loggedInRequest = request.agent(app)
        await loggedInRequest
          .post('/auth/login')
          .send({
            email: 'jane@gmail.com',
            password: 'toolazytosetapassword'
          })
          .expect(200)
      })

      it('should return unauthorized for users except admins', async () => {
        await request(app)
          .get('/api/users')
          .expect(401)
      })

      it('should get successfully for admins', async () => {
        await loggedInRequest.get('/api/users').expect(200)
      })
    })

    describe('GET /api/users/:userId', () => {
      let loggedInRequest

      it('login', async () => {
        loggedInRequest = request.agent(app)
        await loggedInRequest
          .post('/auth/login')
          .send({
            email: 'jane@gmail.com',
            password: 'toolazytosetapassword'
          })
          .expect(200)
      })
      it('should return unauthorized for a logged in user except admin', async () => {
        await request(app)
          .get('/api/users/1')
          .expect(401)
      })

      it('should get successfully for admins', async () => {
        await loggedInRequest.get('/api/users/2').expect(200)
      })
    })

    describe('PUT /api/users/:userId', () => {
      let loggedInRequest

      it('login', async () => {
        loggedInRequest = request.agent(app)
        await loggedInRequest
          .post('/auth/login')
          .send({
            email: 'jane@gmail.com',
            password: 'toolazytosetapassword'
          })
          .expect(200)
      })

      it('should return unauthorized for users except admins', async () => {
        await request(app)
          .put('/api/users/1')
          .expect(401)
      })

      it('should get successfully for admins', async () => {
        await loggedInRequest.put('/api/users/1').expect(200)
      })
    })

    describe('DELETE /api/users/:userId', () => {
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

      it('should return unauthorized guests', async () => {
        await request(app)
          .delete('/api/users/1')
          .expect(401)
      })

      it('should return unauthorized for logged in users that are not admins', async () => {
        await loggedInRequest.delete('/api/users/1').expect(401)
      })
    })
  })
})
