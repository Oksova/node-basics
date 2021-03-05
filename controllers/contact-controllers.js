const Contacts = require('../model/index')

const getAll = async (req, res, next) => {
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
}

const getByID = async (req, res, next) => {
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
}

const create = async (req, res, next) => {
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
}

const remove = async (req, res, next) => {
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
}

const update = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body)
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
}
module.exports = {
  getAll,
  getByID,
  create,
  remove,
  update,
}
