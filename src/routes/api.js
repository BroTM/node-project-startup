const express = require('express')
const v1Router = require('./v1/index')
const OtherController = require('../controllers/other.controller')

const router = express.Router()

/** welcome */
router.get('/ping', OtherController.ping)

/** v1 */
router.use('/v1', v1Router)

module.exports = router
