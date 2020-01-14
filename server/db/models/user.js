const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  streetBilling: {
    type: Sequelize.STRING,
    allowNull: true
  },
  cityBilling: {
    type: Sequelize.STRING,
    allowNull: true
  },
  stateBilling: {
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
  zipBilling: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  streetShipping: {
    type: Sequelize.STRING,
    allowNull: true
  },
  cityShipping: {
    type: Sequelize.STRING,
    allowNull: true
  },
  stateShipping: {
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
  zipShipping: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
