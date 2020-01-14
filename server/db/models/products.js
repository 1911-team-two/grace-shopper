const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://leeresidentialnyc.com/wp-content/uploads/2018/09/image-not-found-1.jpg'
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.FLOAT,
    isFloat: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    validate: {
      isIn: [['print']]
    },
    allowNull: false
  },
  filter: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    validate: {
      isIn: [['nature', 'art', 'funny']]
    },
    allowNull: false
  }
})

module.exports = Product
