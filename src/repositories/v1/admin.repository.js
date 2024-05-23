'use strict'

class AdminRepository {
  static async get(params) {
    return { data: 'hello' }
  }

  static async getOne(params) {}
}

module.exports = AdminRepository
