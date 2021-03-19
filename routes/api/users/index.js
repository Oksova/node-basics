const express = require('express')
const router = express.Router()
// const validate = require('./validation')
const userControllers = require('../../../controllers/user-controllers')
const guard = require('../../../helpers/guard')

router.post('/registration', userControllers.register)
router.post('/login', userControllers.login)
router.post('/logout', guard, userControllers.logout)

module.exports = router
