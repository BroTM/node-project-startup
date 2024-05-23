'use strict'

const express = require('express')
const { AdminController } = require('../../controllers/v1/index')

const router = express.Router()

/** admins */
router.get('/admins', AdminController.get)

module.exports = router
