const router = require('express').Router()
const Product = require('../db/models/products')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productid', async (req, res, next) => {
  try {
    let id = req.params.productid
    const product = await Product.findByPk(id)
    if (product) {
      res.send(product)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const product = await Product.create(req.body)
      res.status(201).json(product)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId
    if (req.user && req.user.isAdmin) {
      const product = await Product.findByPk(productId)
      const updatedProduct = await product.update(req.body)
      res.send(updatedProduct)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const product = await Product.findByPk(req.params.productId)
      await product.destroy()
      res.sendStatus(204)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})
