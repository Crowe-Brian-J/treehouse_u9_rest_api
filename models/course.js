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
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
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
