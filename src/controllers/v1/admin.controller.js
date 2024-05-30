'use strict'

const Response = require('../../../helpers/response')

const { AdminRepository } = require('../../repositories/v1/index')

/** get all admins process */
exports.get = async (req, res, next) => {
  try {
    // validation and process

    const result = await AdminRepository.get({})

    const response = new Response(result, req.method)
    res.send(response.format())
  } catch (err) {
    next(err)
  }
}

/** get one admin process */
exports.getOne = async (req, res, next) => {
  try {
    // validation and process

    const result = await AdminRepository.getOne({ admin_id: req.params.id })

    const response = new Response(result, req.method)
    res.send(response.format())
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
    next(err)
  }
}

/** login process */
exports.login = async (req, res, next) => {
  try {
    // validation and process

    const result = await AdminRepository.login(req.body)

    const response = new Response(result, req.method)
    res.send(response.format())
  } catch (err) {
    next(err)
  }
}
exports.put = () => {}
