// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')

// const { required } = require('joi')

// const adapter = new FileSync('./model/contacts.json')
// const db = low(adapter)

// db.defaults({ contacts: [] }).write()

// const { MongoClient } = require('mongodb')
// const db = MongoClient.connect(uriDb, {
// //   useUnifiedTopology: true,
// //   poolSize: 5,
// // })
const mongoose = require('mongoose')
require('dotenv').config()
const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
mongoose.connection.on('connected', () => {
  console.log('Mongoose connection to db')
})

mongoose.connection.on('error', (error) => {
  console.log(`Mongoose connection error: ${error.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  console.log('Connection for db closed')
  process.exit(1)
})
module.exports = db
