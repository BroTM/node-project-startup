'use strict'
const { TABLES, ADMIN_STATUS } = require('../../../helpers/constant')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLES.ADMIN, {
      admin_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(45),
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: 'show name',
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: 'unique email',
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'AES hash password',
      },
      token: {
        type: Sequelize.STRING(45),
        allowNull: true,
        unique: true,
        comment: 'unique md5 hash token',
      },
      status: {
        type: Sequelize.ENUM,
        values: Object.values(ADMIN_STATUS),
        defaultValue: ADMIN_STATUS.NO_VERIFY,
        allowNull: false,
      },
      created_by: {
        allowNull: false,
        type: Sequelize.STRING(45),
        defaultValue: '0', // 0 for system user
        comment: 'admin user',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        comment: 'created date time',
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
        comment: 'updated date time',
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLES.ADMIN)
  },
}
