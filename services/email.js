const Mailgen = require('mailgen')
const sgMail = require('@sendgrid/mail')
require('dotenv').config()

class EmailService = {
    #Sender = sgMail
    #GenerateTemplate = Mailgen
    constructor(env) {}
    #createTemplate(verifyToken, name = 'Guest') {}
    sendEmail(verifyToken, email, name) {}
}

module.exports = EmailService