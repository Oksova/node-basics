const User = require('./schemas/user')

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const findById = async (id) => {
  return await User.findOne({ _id: id })
}

const findByVerifyToken = async (verifyToken) => {
  return await User.findOne({ verifyToken })
}

const create = async ({
  name,
  email,
  password,
  subscription,
  verify,
  verifyToken,
}) => {
  const user = new User({
    name,
    email,
    password,
    subscription,
    verify,
    verifyToken,
  })
  return user.save()
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

const updateVerifyToken = async (id, verify, verifyToken) => {
  return await User.findOneAndUpdate({ _id: id }, { verify, verifyToken })
}

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatar })
}

module.exports = {
  findByEmail,
  create,
  findById,
  updateToken,
  updateAvatar,
  findByVerifyToken,
  updateVerifyToken,
}
