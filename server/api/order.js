const router = require('express').Router()
const Order = require('../db/models/order')
const OrderProduct = require('../db/models/orderProduct')
const Product = require('../db/models/products')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
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

router.get('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId

    if (req.user) {
      const singleOrder = await Order.findOne({
        where: {
          id: orderId,
          userId: req.user.id
        },
        include: {
          model: OrderProduct,
          include: [Product]
        }
      })
      res.json(singleOrder)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const newOrder = await Order.create({
        status: 'complete'
      })
      await newOrder.setUser(req.user.id)
      const itemsInCart = req.body.cart

      itemsInCart.forEach(async item => {
        const newOrderProduct = await OrderProduct.create({
          qty: item.qty
        })

        await newOrderProduct.setProduct(item.product.id)
        await newOrderProduct.setOrder(newOrder)
      })

      res.send(newOrder)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    if (req.user) {
      let order = await Order.findOne({
        where: {
          id: orderId,
          userId: req.user.id
        }
      })

      const itemsInCart = req.body.cart

      itemsInCart.forEach(async item => {
        const newOrderProduct = await OrderProduct.create({
          qty: item.qty
        })
        await newOrderProduct.setProduct(item.product.id)
        await newOrderProduct.setOrder(order)
      })

      let updatedOrder = await order.reload({
        include: {
          model: OrderProduct,
          include: [Product]
        }
      })
      res.send(updatedOrder)
    } else {
      res.status(401).end()
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    if (req.user) {
      let order = await Order.findOne({
        where: {
          id: orderId,
          userId: req.user.id
        }
      })

      await order.destroy()
      res.sendStatus(204)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})
