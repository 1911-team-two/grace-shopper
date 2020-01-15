const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  address1: {
    type: Sequelize.STRING,
    allowNull: true
  },
  address2: {
    type: Sequelize.STRING,
    allowNull: true
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isIn: [
        [
          'AL',
          'AK',
          'AS',
          'AZ',
          'AR',
          'CA',
          'CO',
          'CT',
          'DE',
          'DC',
          'FM',
          'FL',
          'GA',
          'GU',
          'HI',
          'ID',
          'IL',
          'IN',
          'IA',
          'KS',
          'KY',
          'LA',
          'ME',
          'MH',
          'MD',
          'MA',
          'MI',
          'MN',
          'MS',
          'MO',
          'MT',
          'NE',
          'NV',
          'NH',
          'NJ',
          'NM',
          'NY',
          'NC',
          'ND',
          'MP',
          'OH',
          'OK',
          'OR',
          'PW',
          'PA',
          'PR',
          'RI',
          'SC',
          'SD',
          'TN',
          'TX',
          'UT',
          'VT',
          'VI',
          'VA',
          'WA',
          'WV',
          'WI',
          'WY'
        ]
      ]
    }
  },
  zip: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = Address

// const addressWithUsers = await Address.findAll({
//   include: [{model: User}]
// })
