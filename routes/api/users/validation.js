const Joi = require('joi')
const { HttpCode } = require('../../../helpers/constans')

const schemaRegister = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().optional(),
  password: Joi.string().required(),
})

const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)
  if (error) {
    const [{ message }] = error.details
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, '')}`,
      data: 'Bad request',
    })
  }
  next()
}

module.exports.userRegister = (req, res, next) => {
  return validate(schemaRegister, req.body, next)
}

module.exports.userLogin = (req, res, next) => {
  return validate(schemaLogin, req.body, next)
}

module.exports.validateUploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: 'BAD_REQUEST',
      message: 'Field og avatar with file not found',
    })
  }
  next()
}
