const express = require('express')
const router = express.Router()
const validate = require('./validation')
const userControllers = require('../../../controllers/user-controllers')
const guard = require('../../../helpers/guard')

router.post('/registration', validate.userRegister, userControllers.register)
router.post('/login', validate.userLogin, userControllers.login)
router.post('/logout', guard, userControllers.logout)
router.get('/current', guard, userControllers.current)

module.exports = router
