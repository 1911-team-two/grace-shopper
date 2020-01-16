const router = require('express').Router()
module.exports = router

const findOrCreateCart = session => {
  if (!session.cart) {
    session.cart = []
  }
  return session.cart
}

const findOrAddItem = (cart, itemToFind) => {
  const itemIdx = cart.findIndex(item => {
    return item.product.id === itemToFind.product.id
  })

  if (itemIdx > -1) {
    cart[itemIdx].qty += itemToFind.qty
  } else {
    cart.push(itemToFind)
  }
}

const editQty = (cart, itemId, qty) => {
  const itemIdx = cart.findIndex(item => {
    return item.product.id === itemId
  })

  if (itemIdx > -1) {
    cart[itemIdx].qty = qty
  }
}

router.get('/', (req, res) => {
  res.json(findOrCreateCart(req.session))
})

router.post('/', (req, res) => {
  findOrCreateCart(req.session)
  findOrAddItem(req.session.cart, req.body)
  res.status(201).json(req.session.cart)
})

router.delete('/:id', (req, res) => {
  req.session.cart = req.session.cart.filter(item => {
    return item.product.id !== Number(req.params.id)
  })

  res.status(200).json(req.session.cart)
})

router.put('/', (req, res) => {
  const {id, qty} = req.body
  editQty(req.session.cart, id, qty)
  res.status(200).json(req.session.cart)
})
