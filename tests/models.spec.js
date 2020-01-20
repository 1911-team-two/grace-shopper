/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../server/db/index')
const User = db.model('user')
const Product = db.model('product')
const Address = db.model('address')
const Order = db.model('order')
const OrderProducts = db.model('orderProduct')

describe('db Models', () => {
  describe('User model', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })

    describe('instanceMethods', () => {
      describe('correctPassword', () => {
        let cody

        beforeEach(async () => {
          cody = await User.create({
            email: 'cody@puppybook.com',
            password: 'bones'
          })
        })

        it('returns true if the password is correct', () => {
          expect(cody.correctPassword('bones')).to.be.equal(true)
        })

        it('returns false if the password is incorrect', () => {
          expect(cody.correctPassword('bonez')).to.be.equal(false)
        })
      }) // end describe('correctPassword')
    }) // end describe('instanceMethods')

    describe('Attributes', () => {
      let user

      beforeEach(async () => {
        user = await User.create({
          email: 'rebecca@gmail.com',
          password: 'doggies',
          isAdmin: true
        })
      })

      // afterEach(function(){
      //   return User.truncate({cascade: true})
      // })

      it('includes `email`, `password` and `isAdmin` fields', () => {
        return user.save().then(savedUser => {
          expect(savedUser.email).to.equal('rebecca@gmail.com')
          // expect(savedUser.password).to.equal('doggies')
          expect(savedUser.isAdmin).to.equal(true)
        })
      })

      it('requires `email`', () => {
        user.email = null
        return user.validate().then(
          () => {
            throw new Error('validation should fail when email is null')
          },
          createdError => expect(createdError).to.be.an.instanceOf(Error)
        )
      })
    })
  }) // end describe('User model')
  describe('Product model', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })

    describe('Attributes', () => {
      let product

      beforeEach(async () => {
        product = await Product.create({
          imageUrl:
            'https://s7d5.scene7.com/is/image/UrbanOutfitters/45327822_001_b?$xlarge$&hei=900&qlt=80&fit=constrain',
          name: 'doggies',
          price: 1899,
          description: 'its cute :)'
        })
      })

      it('includes `imageUrl`, `name`, `price` and `description` fields', () => {
        return product.save().then(savedProduct => {
          expect(savedProduct.imageUrl).to.equal(
            'https://s7d5.scene7.com/is/image/UrbanOutfitters/45327822_001_b?$xlarge$&hei=900&qlt=80&fit=constrain'
          )
          expect(savedProduct.name).to.equal('doggies')
          expect(savedProduct.price).to.equal(1899)
          expect(savedProduct.description).to.equal('its cute :)')
        })
      })

      it('requires `name`', () => {
        product.name = null
        return product.validate().then(
          () => {
            throw new Error('validation should fail when name is null')
          },
          createdError => expect(createdError).to.be.an.instanceOf(Error)
        )
      })

      it('requires `price`', () => {
        product.price = null
        return product.validate().then(
          () => {
            throw new Error('validation should fail when price is null')
          },
          createdError => expect(createdError).to.be.an.instanceOf(Error)
        )
      })

      it('requires `description`', () => {
        product.description = null
        return product.validate().then(
          () => {
            throw new Error('validation should fail when description is null')
          },
          createdError => expect(createdError).to.be.an.instanceOf(Error)
        )
      })
    })
  })
  describe('Address Book model', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })

    describe('Attributes', () => {
      let addressBook

      beforeEach(async () => {
        addressBook = await Address.create({
          address1: '20 Laurel Road',
          address2: null,
          city: 'Pound Ridge',
          state: 'NY',
          zip: 10576
        })
      })

      it('includes `address1`, `address2`, `city`, `state` and `zip` fields', () => {
        return addressBook.save().then(savedAddress => {
          expect(savedAddress.address1).to.equal('20 Laurel Road')
          expect(savedAddress.address2).to.equal(null)
          expect(savedAddress.city).to.equal('Pound Ridge'),
            expect(savedAddress.state).to.equal('NY'),
            expect(savedAddress.zip).to.equal(10576)
        })
      })
    })
  })
  describe('Order model', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })

    describe('Attributes', () => {
      let order

      beforeEach(async () => {
        order = await Order.create({
          status: 'pending'
        })
      })

      it('includes a `status` field', () => {
        return order.save().then(savedOrder => {
          expect(savedOrder.status).to.equal('pending')
        })
      })
    })
  })
  describe('Order Products model', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })

    describe('Attributes', () => {
      let orderProduct

      beforeEach(async () => {
        orderProduct = await OrderProducts.create({
          qty: 2
        })
      })

      it('includes a `qty` field', () => {
        return orderProduct.save().then(savedOrderProduct => {
          expect(savedOrderProduct.qty).to.equal(2)
        })
      })
    })
  })
})
