/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../server/db')
const app = require('../../server/index')
const User = db.model('user')
const createAuthenticatedRequest = require('../util')

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
      it('should return unauthorized for users except admins', async () => {
        await request(app)
          .get('/api/users')
          .expect(401)
      })

      it('should get successfully for admins', async () => {
        await createAuthenticatedRequest(
          app,
          {
            email: 'jane@gmail.com',
            password: 'toolazytosetapassword'
          },
          async function(authenticatedRequest) {
            await authenticatedRequest.get('/api/users').expect(200)
          }
        )
      })
    })

    describe('GET /api/users/userId', () => {
      it('should return unauthorized for a logged in user except admin', async () => {
        await request(app)
          .get('/api/users/1')
          .expect(401)
      })

      it('should get successfully for admins', async () => {
        await createAuthenticatedRequest(
          app,
          {
            email: 'jane@gmail.com',
            password: 'toolazytosetapassword'
          },
          async function(authenticatedRequest) {
            await authenticatedRequest.get('/api/users/2').expect(200)
          }
        )
      })
    })

    describe('PUT /api/users/:userId', () => {
      it('should return unauthorized for users except admins', async () => {
        await request(app)
          .put('/api/users/1')
          .expect(401)
      })

      it('admins should be able to update /api/users', async () => {
        await createAuthenticatedRequest(
          app,
          {
            email: 'jane@gmail.com',
            password: 'toolazytosetapassword'
          },
          async function(authenticatedRequest) {
            await authenticatedRequest.put('/api/users/1').expect(200)
          }
        )
      })
    })

    describe('DELETE /api/users/:userId', () => {
      it('should return unauthorized guests', async () => {
        await request(app)
          .delete('/api/users/1')
          .expect(401)
      })

      it('should return unauthorized for logged in users that are not admins', async () => {
        await createAuthenticatedRequest(
          app,
          {
            email: 'bob@gmail.com',
            password: 'meh'
          },
          async function(authenticatedRequest) {
            await authenticatedRequest.delete('/api/users/1').expect(401)
          }
        )
      })
    })
  })
})
