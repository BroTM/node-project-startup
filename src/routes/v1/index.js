'use strict'

const express = require('express')
const { AdminController } = require('../../controllers/v1/index')
const verifyToken = require('../../middleware/admin_auth')

const router = express.Router()

/** admins */
router.get('/admins', verifyToken, AdminController.get)
router.get('/admins/:id', verifyToken, AdminController.getOne)
router.post('/admins/', verifyToken, AdminController.add)
router.post('/admins/login', AdminController.login)

module.exports = router
