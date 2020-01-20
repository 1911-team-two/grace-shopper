const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email']
      })
      res.send(users)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    if (req.user && (req.user.isAdmin || req.user.id === userId)) {
      const user = await User.findByPk(userId)
      res.send(user)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

//No router.post because it is being handled by signup

router.put('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    if (req.user && (req.user.isAdmin || req.user.id === userId)) {
      const user = await User.findByPk(userId)
      await user.update(req.body)
      res.send(user)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    if (req.user && (req.user.isAdmin || req.user.id === userId)) {
      let user = await User.findByPk(userId)
      await user.destroy()
      res.sendStatus(204)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})
