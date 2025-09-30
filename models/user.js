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
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      emailAddress: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}
