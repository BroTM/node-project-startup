/** general functions */
'use strict'

const Response = require('../../helpers/response')

exports.ping = (req, res, next) => {
  try {
    const response = new Response({ message: 'pong' }, req.method)
    res.send(response.format())
  } catch (err) {
    next(err)
  }
}
