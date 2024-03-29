const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')
const { HttpCode } = require('./helpers/constans')
const rateLimit = require('express-rate-limit')
const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')
require('dotenv').config()

const app = express()

const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS
app.use(express.static(path.join(__dirname, AVATARS_OF_USERS)))

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: 10000 }))
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  handler: (req, res, next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: 'BAD_REQUEST',
      message: 'Too many requests in a minute',
    })
  },
})
app.use('/api/', apiLimiter)
app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
