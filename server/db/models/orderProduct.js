const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderProduct', {
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = OrderProduct
