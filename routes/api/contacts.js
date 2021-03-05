const express = require('express')
const router = express.Router()
const {
  getAll,
  getByID,
  create,
  remove,
  update,
} = require('../../controllers/contact-controllers')
const validate = require('./validation')

router.get('/', getAll).post('/', validate.createContact, create)

router.get('/:contactId', getByID).delete('/:contactId', remove)

router.patch('/:contactId/email', validate.updateContact, update)

module.exports = router
