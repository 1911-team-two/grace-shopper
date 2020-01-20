const request = require('supertest')

module.exports = function createAuthenticatedRequest(
  server,
  loginDetails,
  done
) {
  let authenticatedRequest = request.agent(server)
  authenticatedRequest
    .post('/auth/login')
    .send(loginDetails)
    .end(function(err, res) {
      if (err) {
        throw err
      }
      done(authenticatedRequest)
    })
}
