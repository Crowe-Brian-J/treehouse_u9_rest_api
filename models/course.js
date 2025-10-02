'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // Each Course belongs to one User
      Course.belongsTo(models.User, {
        foreignKey: {
          fieldName: 'userId',
          allowNull: false
        }
      })
    }
  }
  Course.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Title is required' },
          notEmpty: { msg: 'Title cannot be empty' }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: 'Description is required' },
          notEmpty: { msg: 'Description cannot be empty' }
        }
      },
      estimatedTime: DataTypes.STRING,
      materialsNeeded: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Course'
    }
  )
  return Course
}
