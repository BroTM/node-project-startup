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

/** get one admin process */
exports.getOne = async (req, res, next) => {
  try {
    // validation and process

    const result = await AdminRepository.getOne({ admin_id: req.params.id })
    res.send(result)
  } catch (err) {
    next(err)
  }
}

/** get one admin process */
exports.add = async (req, res, next) => {
  try {
    // validation and process

    await AdminRepository.add(req.body)
    res.status(204).send()
  } catch (err) {
    console.log(err)
    next(err)
  }
}
exports.put = () => {}
