'use strict'

const express = require('express')
const { AdminController } = require('../../controllers/v1/index')

const router = express.Router()

/** admins */
router.get('/admins', AdminController.get)
router.get('/admins/:id', AdminController.getOne)
router.post('/admins/', AdminController.add)
router.post('/admins/login', AdminController.login)

module.exports = router
