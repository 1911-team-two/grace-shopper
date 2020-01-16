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
        'https://s7d5.scene7.com/is/image/UrbanOutfitters/45327822_001_b?$xlarge$&hei=900&qlt=80&fit=constrain',
      name: 'Llama Family',
      price: 1899,
      description:
        'Taken by photographer Victoria Aguiree while hiking through the Andes Mountains, this adorable black + white print of a family of llamas reflects each of their vibrant personalities. Printed on archival paper made from cotton pressed in Italian mills, this high-quality art print is available in sizes and frames just right for your space. First select your frame (or go frameless), then select your size.'
    },
    {
      imageUrl:
        'https://s7d5.scene7.com/is/image/UrbanOutfitters/53824355_014_b?$xlarge$&hei=900&qlt=80&fit=constrain',
      name: 'Jungle Vacay',
      price: 1899,
      description:
        'Dream of getaways to the jungle with this lush art print by 83 Oranges. Printed on archival paper made from cotton pressed in Italian mills, this high-quality art print is available in sizes and frames just right for your space. First select your frame (or go frameless), then select your size.'
    },
    {
      imageUrl:
        'https://s7d5.scene7.com/is/image/UrbanOutfitters/45802725_014_b?$xlarge$&hei=900&qlt=80&fit=constrain',
      name: 'Sea Bliss',
      price: 1899,
      description:
        'Shot with a drone off the coast of northern Portugal, this seascape is by English photographer Ingrid Beddoes, whose work celebrates travel, the sea + a love of all things simple. Printed on archival paper made from cotton pressed in Italian mills, this high-quality art print is available in sizes and frames just right for your space. First select your frame (or go frameless), then select your size.'
    },
    {
      imageUrl:
        'https://s7d5.scene7.com/is/image/UrbanOutfitters/49955818_017_b?$xlarge$&hei=900&qlt=80&fit=constrain',
      name: 'Sun and Moon',
      price: 1899,
      description:
        'UO-exclusive art print by Nadja depicting a tarot-inspired sun + moon drawing. Printed on archival paper made from cotton pressed in Italian mills, this high-quality art print is available in sizes and frames just right for your space. First select your frame (or go frameless), then select your size.'
    },
    {
      imageUrl:
        'https://s7d5.scene7.com/is/image/UrbanOutfitters/41089186_003_b?$xlarge$&hei=900&qlt=80&fit=constrain',
      name: 'Holy Night',
      price: 1899,
      description:
        'UO-exclusive print from Fran Rodriguez, who is inspired by psychedelics and surrealism. Printed on archival paper made from cotton pressed in Italian mills, this high-quality art print is available in sizes and frames just right for your space. First select your frame (or go frameless), then select your size.'
    },
    {
      imageUrl:
        'https://s7d5.scene7.com/is/image/UrbanOutfitters/45118072_010_b?$xlarge$&hei=900&qlt=80&fit=constrain',
      name: 'Crash Into Me',
      price: 1899,
      description:
        'Born in the Pacific Northwest, photographer Leah Flores seeks out mountains, forests + other forms of nature to include in her works - Crash Into Me being an invitation to explore the ocean. Printed on archival paper made from cotton pressed in Italian mills, this bold graphic art is available in sizes and frames just right for your space. First select your frame (or go frameless), then select your size.'
    },
    {
      imageUrl:
        'https://s7d5.scene7.com/is/image/UrbanOutfitters/55531511_014_b?$xlarge$&hei=900&qlt=80&fit=constrain',
      name: 'Oranges Snow and Gold Pine',
      price: 1899,
      description:
        'Bring the mountains into your space with this art print by 83 Oranges, capturing a road through majestic peaks. Printed on archival paper made from cotton pressed in Italian mills, this high-quality art print is available in sizes and frames just right for your space. First select your frame (or go frameless), then select your size.'
    },
    {
      imageUrl:
        'https://s7d5.scene7.com/is/image/UrbanOutfitters/55531511_014_b?$xlarge$&hei=900&qlt=80&fit=constrain',
      name: 'Leopard Block Party',
      price: 1899,
      description:
        'Leopards in the house with this art print by Megan Galante, sure to bring out the wild side in your space. Printed on archival paper made from cotton pressed in Italian mills, this high-quality art print is available in sizes and frames just right for your space. First select your frame (or go frameless), then select your size.'
    },
    {
      imageUrl:
        'https://s7d5.scene7.com/is/image/UrbanOutfitters/54051578_014_b?$xlarge$&hei=900&qlt=80&fit=constrain',
      name: 'Terracotta',
      price: 1899,
      description:
        'Leopards in the house with this art print by Megan Galante, sure to bring out the wild side in your space. Printed on archival paper made from cotton pressed in Italian mills, this high-quality art print is available in sizes and frames just right for your space. First select your frame (or go frameless), then select your size.'
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
