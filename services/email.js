const Mailgen = require('mailgen')
const sgMail = require('@sendgrid/mail')
const config = require('../config/email.json')
require('dotenv').config()

class EmailService {
  #sender = sgMail
  #GenerateTemplate = Mailgen
  constructor(env) {
    switch (env) {
      case 'development':
        this.link = config.dev
        break
      case 'production':
        this.link = config.prod
        break
      default:
        this.link = config.dev
        break
    }
  }
  #createTemplate(verifyToken, name = 'Guest') {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'neopolitan',
      product: {
        name: 'MSystem Contacts',
        link: this.link,
      },
    })
    const template = {
      body: {
        name,
        intro: 'Intro',
        action: {
          instructions: 'Please click here to finish registration',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    }
    return mailGenerator.generate(template)
  }
  async sendEmail(verifyToken, email, name) {
    const emailBody = this.#createTemplate(verifyToken, name)
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: email,
      from: 'no-reply@system-contacts.com',
      subject: 'Activate your account',
      html: emailBody,
    }

    await this.#sender.send(msg)
  }
}

module.exports = EmailService
