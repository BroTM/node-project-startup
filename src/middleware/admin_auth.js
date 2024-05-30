'use strict'

const jwt = require('jsonwebtoken')

const { Admin } = require('../database/models/index')

const CustomError = require('../../helpers/custom-error')
const MSG = require('../../helpers/message')
const Utils = require('../../helpers/utils')

const VerifyToken = async (req, res, next) => {
  try {
    const secret = process.env.JWT_SECRET_KEY
    const authHeader = req.headers.authorization

    if (!authHeader) throw new CustomError(MSG[req.body.lang].REQUEST_NOT_ALLOW, 400)

    /** check req header */
    const headers = authHeader?.split(' ')
    const token = headers.length > 1 ? headers[1] : null

    if (!token) throw new CustomError(MSG[req.body.lang].REQUEST_NOT_ALLOW, 400)

    /** verify token */
    const decode = jwt.verify(token, secret)

    let jwt_data = decode.data

    let data = Utils.decryptJWTData(jwt_data)
    const admin = await Admin.findOne({ attributes: { exclude: ['token', 'password'] }, where: { token: data.token } })

    if (!admin) throw new CustomError(MSG[req.body.lang].INVALID_TOKEN, 401)

    req.user = admin.dataValues

    next()
  } catch (err) {
    if (err.message.includes('expired')) return next(new CustomError(MSG[req.body.lang].TOKEN_EXPIRED, 401))
    else if (err.name == 'JsonWebTokenError') return next(new CustomError(err?.message, 401, err))

    next(err)
  }
}

module.exports = VerifyToken
