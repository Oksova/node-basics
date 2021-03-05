// const fs = require('fs/promises')
// const contacts = require('./contacts.json')

// const db = require('./db')
// const { ObjectID } = require('mongodb')

// const getCollection = async (db, name) => {
//   const client = await db
//   const collection = await client.db().collection('contacts')
//   return collection
// }

const Contact = require('./schemas/contact')

const listContacts = async () => {
  const results = await Contact.find({})
  return results
}

const getContactById = async (contactId) => {
  const results = await Contact.findOne({ _id: contactId })
  return results
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true },
  )
  return result
}

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove({ _id: contactId })
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
