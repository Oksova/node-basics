const express = require('express')
const router = express.Router()
const contactsController = require('../../controllers/contact-controllers')
const validate = require('./validation')

router
  .get('/', contactsController.getAll)
  .post('/', validate.createContact, contactsController.create)

router
  .get('/:contactId', contactsController.getById)
  .delete('/:contactId', contactsController.remove)

router.patch(
  '/:contactId/email',
  validate.updateContact,
  contactsController.update,
)

module.exports = router
