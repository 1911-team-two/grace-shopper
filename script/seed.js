'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = [
    {
      email: 'beyonce@gmail.com',
      password: 'password',
      firstName: 'Beyonce',
      lastName: 'Knowles',
      streetBilling: '14 Trinity Pass',
      cityBilling: 'Pound Ridge',
      stateBilling: 'NY',
      zipBilling: 10576,
      streetShipping: '505 W 37th Street',
      cityShipping: 'New York',
      stateShipping: 'NY',
      zipShipping: 10019
    },
    {
      email: 'dannydevito@gmail.com',
      password: 'iloveham',
      firstName: 'Danny',
      lastName: 'Devito',
      streetBilling: '1 Hawk Drive',
      cityBilling: 'New Paltz',
      stateBilling: 'NY',
      zipBilling: 12561,
      streetShipping: '333 Schermerhorn St',
      cityShipping: 'New York',
      stateShipping: 'NY',
      zipShipping: 11217
    }
  ]

  const products = [
    {
      imageUrl:
        'https://ctl.s6img.com/society6/img/-Df-I9ypq_VVCaZngqRxZiJthgQ/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/133a3e56f0e34a80b6c2130f394c9f72/~~/bold-and-brash1563343-prints.jpg?wait=0&attempt=0',
      name: 'The Squidward',
      price: 18.99,
      description:
        'Natural white, matte, ultra smooth background. 100% cotton, acid and lignin-free archival paper. Custom trimmed with border for framing; 1" for x-small and small, 2" for all larger sizes. Every order is custom made just for you',
      category: ['print'],
      filter: ['funny']
    }
  ]

  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )
  console.log(`seeded ${users.length} users`, Product)

  await Promise.all(
    products.map(product => {
      return Product.create(product)
    })
  )

  console.log(`sedded ${products.length} products`)
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
