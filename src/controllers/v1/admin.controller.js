'use strict'

const { AdminRepository } = require('../../repositories/v1/index')

/** get all admins process */
exports.get = async (req, res, next) => {
  try {
    // validation and process

    const result = await AdminRepository.get({})
    res.send(result)
  } catch (err) {
    next(err)
  }
}

exports.put = () => {}
