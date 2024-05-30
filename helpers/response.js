'use strict'

class Response {
  /**
   *
   * @param {Object} _result
   */
  constructor(_result, _method) {
    this.result = _result
    this.method = _method
  }

  /**
   * format response
   * @returns Object
   */
  format() {
    return {
      status: true,
      message: `${this.method} success.`,
      body: {
        ...this.result,
      },
    }
  }
}

module.exports = Response
