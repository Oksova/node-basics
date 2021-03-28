const express = require('express')
const router = express.Router()
const validate = require('./validation')
const userControllers = require('../../../controllers/user-controllers')
const { validateUploadAvatar } = require('./validation')
const guard = require('../../../helpers/guard')
const upload = require('../../../helpers/upload')

router.post('/registration', validate.userRegister, userControllers.register)
router.post('/login', validate.userLogin, userControllers.login)
router.post('/logout', guard, userControllers.logout)
router.get('/current', guard, userControllers.current)
router.patch(
  '/avatars',
  [guard, upload.single('avatar'), validateUploadAvatar],
  userControllers.avatars,
)
router.get('/verify/:token', userControllers.verify)

module.exports = router
