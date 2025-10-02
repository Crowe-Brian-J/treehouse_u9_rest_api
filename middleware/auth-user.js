'use strict'

const auth = require('basic-auth')
const bcrypt = require('bcrypt')
const { User } = require('../models')

// Middleware to authenticate the current user
const authenticateUser = async (req, res, next) => {
  let message = null

  // Parse the Authorization header.
  const credentials = auth(req)

  if (credentials) {
    const user = await User.findOne({
      where: { emailAddress: credentials.name }
    })

    if (user) {
      const authenticated = await bcrypt.compare(
        credentials.pass,
        user.password
      )
      if (authenticated) {
        req.currentUser = user
      } else {
        message = 'Access Denied - User Not Authenticated'
      }
    } else {
      message = 'Access Denied - No User'
    }
  } else {
    message = 'Access Denied - No Credentials'
  }

  if (message) {
    res.status(401).json({ message })
  } else {
    next()
  }
}

module.exports = { authenticateUser }
