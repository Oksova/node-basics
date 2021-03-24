const mongoose = require('mongoose')
const { Schema, model } = mongoose
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 8

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlenght: 2,
      default: 'Guest',
    },
    email: {
      type: String,
      require: [true, 'Email require'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password required'],
    },
    token: {
      type: String,
      default: null,
    },
    subscription: {
      type: String,
      enum: ['free', 'pro', 'premium'],
      default: 'free',
    },
  },
  { versionKey: false, timestamps: true },
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
  this.password = await bcrypt.hash(this.password, salt, null)
  return next()
})

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}
const User = model('user', userSchema)

module.exports = User
