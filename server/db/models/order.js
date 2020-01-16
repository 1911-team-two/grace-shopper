const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    validation: {
      isIn: [['pending', 'complete']]
    }
  }
})

module.exports = Order
