const User = require('./user')
const Product = require('./products')
const Address = require('./addressBook')
const Order = require('./order')
const OrderProduct = require('./orderProduct')
const Inventory = require('./inventory')
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

Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)

Product.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)

// Inventory.hasMany(OrderProduct)

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
  OrderProduct,
  Inventory
}
