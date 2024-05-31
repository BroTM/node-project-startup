'use strict'

/** dependencies */
const uuid = require('uuid')
const crypto_js = require('crypto-js')
const jwt = require('jsonwebtoken')

class Util {
  /**
   * request parameter
   * @param {Request} req
   * @returns params obj
   */
  static p(req) {
    return {
      ...req.body,
      ...req.params,
      ...req.query,
      lang: req.lang,
    }
  }
  /**
   * get pagination info
   * @param {Object} params
   * @returns Object
   */
  static pagination(params) {
    let pageSize = 10
    let page = 1

    if (params?.pageSize) pageSize = parseInt(params.pageSize)
    if (params?.page) page = parseInt(params.page)
    const offset = (page - 1) * pageSize

    return { pageSize, offset, page }
  }
  /** primary key
   * @returns String
   */
  static uuid() {
    return uuid.v4()
  }

  /**
   * Generate hash string of game signature
   * @param {String} signature - game signature code
   * @returns String
   */
  static getSignature(signature) {
    return crypto_js.MD5(signature).toString().toUpperCase()
  }

  /**
   * Encrypt Password
   * @param {String} text - plain text
   * @returns String
   */
  static encryptPassword(text) {
    const encoded_string = crypto_js.AES.encrypt(text, process.env.PASSWORD_SECRET_KEY).toString()

    return encoded_string
  }

  /**
   * Decrypt Password
   * @param {String} encoded_string - encoded string
   * @returns String
   */
  static decryptPassword(encoded_string) {
    const decoded_string = crypto_js.AES.decrypt(encoded_string, process.env.PASSWORD_SECRET_KEY).toString(crypto_js.enc.Utf8)

    return decoded_string
  }

  /**
   * Encrypt JWT payload
   * @param {Object} payload
   * @returns String
   */
  static encryptJWTPayload(payload) {
    const encoded_string = crypto_js.AES.encrypt(JSON.stringify(payload), process.env.JWT_SECRET_KEY).toString()

    return encoded_string
  }

  /**
   * Decrypt JWT Data
   * @param {String} encoded_string - encoded string
   * @returns Object
   */
  static decryptJWTData(encoded_string) {
    const decoded_string = crypto_js.AES.decrypt(encoded_string, process.env.JWT_SECRET_KEY).toString(crypto_js.enc.Utf8)

    return JSON.parse(decoded_string)
  }

  /**
   * hash token
   * @param {String} text
   * @returns HashString
   */
  static hashToken(text) {
    text += process.env.TOKEN_SECRET_KEY

    return crypto_js.MD5(text).toString().toUpperCase()
  }

  /**
   * hide jwt data
   * generate json web token
   * @param {JWT_Payload} payload
   * @returns
   */
  static generateJWT(payload) {
    /** encrypt the payload */
    const encrypt_string = this.encryptJWTPayload(payload)

    /** sign jwt */
    const jwt_token = jwt.sign({ data: encrypt_string }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1hr',
    })
    return jwt_token
  }
}

module.exports = Util
