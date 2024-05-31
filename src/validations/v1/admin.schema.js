'use strict'

const { object, string, number } = require('../validator')

const get = object({
  query: object({
    page: string().digit().min(1).optional(),
    pageSize: string().digit().min(1).max(2, 'Maximum value is 99').optional(),
  }).noUnknown(true),
}).strict()

const getOne = object({
  params: object({
    id: string().uuid().required(),
  }).noUnknown(true),
}).strict()

const add = object({
  body: object({
    name: string().trim().SC().required(),
    email: string().trim().email().required(),
    password: string().trim().digit().min(6).max(8).required(),
  }).noUnknown(true),
}).strict()

const login = object({
  body: object({
    email: string().trim().email().required(),
    password: string().trim().digit().min(6).max(8).required(),
  }).noUnknown(true),
}).strict()

module.exports = {
  get,
  getOne,
  add,
  login,
}
