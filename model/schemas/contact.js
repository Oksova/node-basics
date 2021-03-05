const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: [true, 'Set email'],
    unique: true,
  },
  phone: {
    type: Number,
  },
  subscription: {
    type: String,
  },
  password: {
    type: Number,
    required: [true, 'Set password'],
  },
  token: {
    type: String,
    default: null,
  },
})

const Contact = model('contact', contactSchema)

module.exports = Contact