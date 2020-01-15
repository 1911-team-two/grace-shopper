const User = require('./user')
const Product = require('./products')
const Address = require('./addressBook')
const Cart = require('./cart')
const Order = require('./order')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Address.belongsTo(User)
User.hasMany(Address)

User.hasMany(Order)
Order.belongsTo(User)

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.hasMany(Product)

Order.hasMany(Product)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Address,
  Order,
  Cart
}
