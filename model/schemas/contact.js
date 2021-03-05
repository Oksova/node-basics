const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema(
  {
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
      default: 'free',
    },
    password: {
      type: Number,
      default: 'password',
    },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true },
)

const Contact = model('contact', contactSchema)

module.exports = Contact
