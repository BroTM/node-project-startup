'use strict'

class CustomError extends Error {
  /**
   *
   * @param {string} _message error message
   * @param {number} _statusCode HTTP status code corresponding to the error
   * @param {Array.<Object>} _errors an array of error objects
   */
  constructor(_message, _statusCode, _errors) {
    super(_message)
    this.message = _message
    this.statusCode = _statusCode || 500
    this.errors = _errors ? _errors : { message: _message }
    this.name = 'CustomError'
  }
}

module.exports = CustomError
