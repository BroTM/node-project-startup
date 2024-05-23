/** general functions */
'use strict'

exports.ping = (req, res, next) => {
  try {
    res.send({ msg: 'pong' })
  } catch (err) {
    next(err)
  }
}
