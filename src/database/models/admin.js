'use strict'

const { TABLES, MODELS } = require('../../../helpers/constant')

const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init(
    {
      admin_id: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      token: DataTypes.STRING,
      created_by: DataTypes.STRING,
      created_at: DataTypes.Date,
      updated_at: DataTypes.Date,
    },
    {
      sequelize,
      modelName: MODELS.ADMIN,
      tableName: TABLES.ADMIN,
    }
  )
  return Admin
}
