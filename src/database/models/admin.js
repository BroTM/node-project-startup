'use strict'

const { TABLES, MODELS, ADMIN_STATUS } = require('../../../helpers/constant')

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
      status: DataTypes.ENUM(Object.values(ADMIN_STATUS)),
      created_by: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      timestamps: false,
      modelName: MODELS.ADMIN,
      tableName: TABLES.ADMIN,
    }
  )
  return Admin
}
