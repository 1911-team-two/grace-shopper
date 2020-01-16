const Sequelize = require('sequelize')
const db = require('../db')

const Inventory = db.define('inventory', {
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false,
    validation: {
      isIn: [['S', 'L']]
    }
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Inventory
