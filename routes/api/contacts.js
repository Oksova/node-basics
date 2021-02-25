const express = require('express')
const router = express.Router()
const Contacts = require('../../model/index')
const validate = require('./validation')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: 'success',
      code: 200,
      data: { contacts },
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: { contact },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', validate.createContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    if (contact) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: { contact },
      })
    } else {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing required name field',
      })
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'Contact deleted',
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
})

router.patch(
  '/:contactId/email',
  validate.updateContact,
  async (req, res, next) => {
    try {
      const contact = await Contacts.updateContact(
        req.params.contactId,
        req.body,
      )
      if (req.body === {}) {
        console.log(req.body)
        return res.json({
          code: 400,
          message: 'Missing fields',
        })
      }
      if (contact) {
        return res.json({
          status: 'success',
          code: 200,
          data: { contact },
        })
      } else {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Not Found',
        })
      }
    } catch (error) {
      next(error)
    }
  },
)

module.exports = router
