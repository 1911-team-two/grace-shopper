const router = require('express').Router()
const Order = require('../db/models/order')
const OrderProduct = require('../db/models/orderProduct')
const Product = require('../db/models/products')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user.id) {
      const order = await Order.findAll({
        where: {
          userId: req.user.id
        },
        include: {
          model: OrderProduct,
          include: [Product]
        }
      })
      res.json(order)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})
