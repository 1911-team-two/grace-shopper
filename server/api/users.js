const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userid', async (req, res, next) => {
  try {
    const id = req.params.userid
    const user = await User.findByPk(id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})
