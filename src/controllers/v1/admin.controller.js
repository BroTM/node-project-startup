'use strict'

const Response = require('../../../helpers/response')
const Utils = require('../../../helpers/utils')
const MSG = require('../../../helpers/message')
const CustomError = require('../../../helpers/custom-error')

const { AdminSchema } = require('../../validations/v1')
const { AdminRepository } = require('../../repositories/v1')

/** get all admins process */
exports.get = async (req, res, next) => {
  try {
    /** validation */
    const { errors, ...value } = await AdminSchema.get.validate(req).catch((err) => err)
    if (errors) throw new CustomError(MSG[req.lang].VALIDATION_ERROR, 400, { message: errors.join(', ') })

    /** merge req data */
    const params = Utils.p(value)

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
    /** validation */
    const { errors, ...value } = await AdminSchema.getOne.validate(req).catch((err) => err)
    if (errors) throw new CustomError(MSG[req.lang].VALIDATION_ERROR, 400, { message: errors.join(', ') })

    /** merge req data */
    const params = Utils.p(value)

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
    /** validation */
    const { errors, ...value } = await AdminSchema.add.validate(req).catch((err) => err)
    if (errors) throw new CustomError(MSG[req.lang].VALIDATION_ERROR, 400, { message: errors.join(', ') })

    /** merge req data */
    const params = Utils.p(value)

    await AdminRepository.add(params)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

/** login process */
exports.login = async (req, res, next) => {
  try {
    /** validation */
    const { errors, ...value } = await AdminSchema.login.validate(req).catch((err) => err)
    if (errors) throw new CustomError(MSG[req.lang].VALIDATION_ERROR, 400, { message: errors.join(', ') })

    /** merge req data */
    const params = Utils.p(value)

    const result = await AdminRepository.login(params)

    const response = new Response(result, req.method)
    res.send(response.format())
  } catch (err) {
    next(err)
  }
}
exports.put = () => {}
