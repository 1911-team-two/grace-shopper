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

    it('GET /api/users', async () => {
      it('should return unauthorized for users except admins', async () => {
        await request(app)
          .get('/api/users')
          .expect(401)
      })

      it('should get successfully for admins', async () => {
        await createAuthenticatedRequest(
          app,
          {
            email: 'bob@gmail.com',
            password: 'meh'
          },
          async function(request) {
            let res = await request.get('/api/users').expect(201)
          }
        )
      })

      it('GET /api/users/:userId', async () => {
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
            async function(request) {
              let res = await request.get('/api/users/:userId').expect(201)
            }
          )
        })
      })
    })
  })
})
