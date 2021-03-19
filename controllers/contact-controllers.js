const Contacts = require('../model/index')

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contacts = await Contacts.listContacts(userId)
    return res.json({
      status: 'success',
      code: 200,
      data: { contacts },
    })
  } catch (error) {
    next(error)
    console.log(error)
  }
}

const getByID = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.updateContact(req.params.contactId, userId)
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
    const userId = req.user.id
    const contact = await Contacts.addContact({ ...req.body, owner: userId })
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
    const userId = req.user.id
    const contact = await Contacts.removeContact(req.params.contactId, userId)
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
    const userId = req.user.id
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
      userId,
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
}
module.exports = {
  getAll,
  getByID,
  create,
  remove,
  update,
}
