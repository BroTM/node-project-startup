'use strict'

/** moemnt */
const moment = require('moment-timezone')
moment.tz.setDefault(process.env.TZ)

const { Admin } = require('../../database/models/index')

const CustomError = require('../../../helpers/custom-error')
const MSG = require('../../../helpers/message')
const Utils = require('../../../helpers/utils')
const { ADMIN_STATUS } = require('../../../helpers/constant')

class AdminRepository {
  /**
   * All admins
   * @param {Object} params
   * @returns Admin[]
   */
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
   * detail admin
   * @param {Object} params
   * @returns { Admin, Pagination }
   */
  static async getOne(params) {
    const admin_ = await Admin.findOne({ where: { admin_id: params.admin_id } })

    if (!admin_) throw new CustomError(MSG[params.lang].ADMIN_NOT_FOUND, 404)

    const { password: encryptPassword, ...admin } = admin_.dataValues

    const password = Utils.decryptPassword(encryptPassword)

    return { admin: { ...admin, password } }
  }

  /**
   * add new admin
   * @param {Object} params
   */
  static async add(params) {
    const admin_ = await Admin.findOne({ where: { email: params.email } })

    if (admin_) throw new CustomError(MSG[params.lang].ADMIN_ALREADY_EXIST, 412)

    const encryptedPassword = Utils.encryptPassword(params.password)

    const payload = this.generatePayload({ ...params, encryptedPassword })

    await Admin.create(payload)
  }

  /**
   * login - jwt expire in 1hr
   * @param {Object} params
   */
  static async login(params) {
    const admin_ = await Admin.findOne({ attributes: { exclude: ['created_by', 'created_at', 'updated_at'] }, where: { email: params.email } })

    if (!admin_) throw new CustomError(MSG[params.lang].INCORRECT_EMAIL, 401)

    const decryptedPassword = Utils.decryptPassword(admin_.password)
    /**
     * . check password
     * . status lock
     */
    if (decryptedPassword !== params.password) throw new CustomError(MSG[params.lang].INCORRECT_PASSWORD, 401)
    else if (admin_.status == ADMIN_STATUS.LOCK) throw new CustomError(MSG[params.lang].ACCOUNT_LOCKED, 423)

    const { token, jwt_token } = this.generateToken(admin_)

    /** update token */
    await Admin.update({ token, status: ADMIN_STATUS.VERIFIED }, { where: { admin_id: admin_.admin_id } })

    const { password, token: ot, status, ...admin } = admin_.dataValues

    return { admin, jwt_token }
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
  /**
   * generate admin token & jwt
   * @param {Admin} params
   * @returns tokens
   */
  static generateToken(params) {
    /** token data */
    const text = params.admin_id + moment().unix()

    /** unique token */
    const token = Utils.hashToken(text)

    const jwt_token = Utils.generateJWT({ token })

    return { token, jwt_token }
  }
}

module.exports = AdminRepository
