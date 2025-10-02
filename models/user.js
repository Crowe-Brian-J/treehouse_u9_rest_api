'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // A User can have many Courses
      User.hasMany(models.Course, {
        foreignKey: {
          fieldName: 'userId',
          allowNull: false
        }
      })
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'First name is required' },
          notEmpty: { msg: 'First name cannot be empty' }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Last name is required' },
          notEmpty: { msg: 'Last name cannot be empty' }
        }
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Email address already exists'
        },
        validate: {
          notNull: { msg: 'Email address is required' },
          notEmpty: { msg: 'Email address cannot be empty' },
          isEmail: { msg: 'Email address must be valid' }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Password is required' },
          notEmpty: { msg: 'Password cannot be empty' }
        }
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}
