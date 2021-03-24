const express = require('express')
const router = express.Router()
const {
  getAll,
  getByID,
  create,
  remove,
  update,
} = require('../../../controllers/contact-controllers')
const validate = require('./validation')
const guard = require('../../../helpers/guard')

router.get('/', guard, getAll).post('/', guard, validate.createContact, create)

router.get('/:contactId', guard, getByID).delete('/:contactId', guard, remove)

router.patch('/:contactId/email', guard, validate.updateContact, update)

module.exports = router
