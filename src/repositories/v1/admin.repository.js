'use strict'

/** moemnt */
const moment = require('moment-timezone')
moment.tz.setDefault(process.env.TZ)

const { Admin } = require('../../database/models/index')

const CustomError = require('../../../helpers/custom-error')
const MSG = require('../../../helpers/message')
const Utils = require('../../../helpers/utils')

class AdminRepository {
  static async get(params) {
    const { offset, ...pgn } = Utils.pagination(params)

    const result_ = await Admin.findAndCountAll({
      limit: pgn.pageSize,
      offset: offset,
      attributes: ['admin_id', 'name', 'email', 'status'],
      order: [['created_at', 'DESC']],
    })

    // Pagination information
    pgn.totalRow = result_.count
    pgn.totalPage = Math.ceil(pgn.totalRow / pgn.pageSize)

    return { admins: result_.rows, pagination: pgn }
  }

  /**
   *
   * @param {Object} params
   * @returns Admin
   */
  static async getOne(params) {
    const admin_ = await Admin.findOne({ where: { admin_id: params.admin_id } })

    if (!admin_) throw new CustomError(MSG[params.lang].ADMIN_NOT_FOUND, 404)

    const { password: encryptPassword, ...admin } = admin_.dataValues

    const password = Utils.decryptPassword(encryptPassword)

    return { admin: { ...admin, password } }
  }

  /**
   *
   * @param {Object} params
   */
  static async add(params) {
    const admin_ = await Admin.findOne({ where: { email: params.email } })

    if (admin_) throw new CustomError(MSG[params.lang].ADMIN_ALREADY_EXIST, 412)

    const encryptedPassword = Utils.encryptPassword(params.password)

    const payload = this.generatePayload({ ...params, encryptedPassword })

    await Admin.create(payload)
  }

  /** ---------------------- Methods ----------------------
   * ------------------------------------------------------*/
  /**
   * generate admin payload
   * @param {Object} params
   */
  static generatePayload(params) {
    return {
      admin_id: Utils.uuid(),
      name: params.name,
      password: params.encryptedPassword,
      email: params.email,
      created_at: moment(),
    }
  }
}

module.exports = AdminRepository
