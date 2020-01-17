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
    res.send(product)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    next(err)
  }
})
