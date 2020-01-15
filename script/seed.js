'use strict'

const db = require('../server/db')
const {User, Product, Address, Order, Cart} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = [
    {
      email: 'beyonce@gmail.com',
      password: 'password',
      fullName: 'Beyonce'
    },
    {
      email: 'dannydevito@gmail.com',
      password: 'iloveham',
      fullName: 'Danny Devito'
    }
  ]

  const addresses = [
    {
      address1: '14 Trinity Pass',
      address2: null,
      city: 'Pound Ridge',
      state: 'NY',
      zip: 10576
    },
    {
      address1: '505 W 37th Street',
      address2: null,
      city: 'New York',
      state: 'NY',
      zip: 10019
    }
  ]

  const products = [
    {
      imageUrl:
        'https://ctl.s6img.com/society6/img/-Df-I9ypq_VVCaZngqRxZiJthgQ/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/133a3e56f0e34a80b6c2130f394c9f72/~~/bold-and-brash1563343-prints.jpg?wait=0&attempt=0',
      name: 'The Squidward',
      price: 1899,
      description:
        'Natural white, matte, ultra smooth background. 100% cotton, acid and lignin-free archival paper. Custom trimmed with border for framing; 1" for x-small and small, 2" for all larger sizes. Every order is custom made just for you'
    }
  ]

  const orders = [{}]

  const carts = [{}]

  const realUsers = await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )
  console.log(`seeded ${users.length} users`)

  const allAddresses = await Promise.all(
    addresses.map(address => {
      return Address.create(address)
    })
  )
  console.log(`seeded ${addresses.length} addresses`)

  const allProducts = await Promise.all(
    products.map(product => {
      return Product.create(product)
    })
  )
  console.log(`seeded ${products.length} products`)

  const allOrders = await Promise.all(
    orders.map(order => {
      return Order.create(order)
    })
  )
  console.log(`seeded ${orders.length} orders`)

  const singleCart = await Promise.all(
    carts.map(cart => {
      return Cart.create(cart)
    })
  )
  console.log(`seeded ${carts.length} carts`)

  // assign addresses to users
  for (const i in allAddresses) {
    await realUsers[i].addAddress(allAddresses[i])
  }

  // assign orders to users
  for (const i in allOrders) {
    await realUsers[i].addOrder(allOrders[i])
  }

  // assign a cart to a user
  for (const i in singleCart) {
    await realUsers[i].setCart(singleCart[i])
  }

  // assign product to order
  for (const i in allProducts) {
    await allOrders[i].addProduct(allProducts[i])
  }

  // assign products to cart
  for (const i in allProducts) {
    await singleCart[i].addProduct(allProducts[i])
  }

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
