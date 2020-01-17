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

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create({
      status: 'complete'
    })

    await newOrder.setUser(req.body.id)

    const itemsInCart = req.body.cart

    itemsInCart.map(async item => {
      const newOrderProduct = await OrderProduct.create({
        qty: item.qty
      })

      await newOrderProduct.setProduct(item.product.id)
      await newOrderProduct.setOrder(newOrder)
    })

    res.send(newOrder)
  } catch (err) {
    next(err)
  }
})
