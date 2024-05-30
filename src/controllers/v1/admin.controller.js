'use strict'

const Response = require('../../../helpers/response')
const Utils = require('../../../helpers/utils')

const { AdminRepository } = require('../../repositories/v1/index')

/** get all admins process */
exports.get = async (req, res, next) => {
  try {
    // validation and process

    /** merge req data */
    const params = Utils.p(req)

    const result = await AdminRepository.get(params)

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

    /** merge req data */
    const params = Utils.p(req)

    const result = await AdminRepository.getOne(params)

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

    /** merge req data */
    const params = Utils.p(req)

    await AdminRepository.add(params)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

/** login process */
exports.login = async (req, res, next) => {
  try {
    // validation and process

    /** merge req data */
    const params = Utils.p(req)

    const result = await AdminRepository.login(params)

    const response = new Response(result, req.method)
    res.send(response.format())
  } catch (err) {
    next(err)
  }
}
exports.put = () => {}
