'use strict'

/** dependencies */
const uuid = require('uuid')
const crypto_js = require('crypto-js')

class Util {
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
}

module.exports = Util
