'use strict'

const express = require('express')
const bcrypt = require('bcrypt')
const { User } = require('../models')
const { authenticateUser } = require('../middleware/auth-user')
const asyncHandler = require('../middleware/async-handler')

const router = express.Router()

// GET /api/users - Return the currently authenticated user
router.get(
  '/users',
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = req.currentUser

    res.json({
      // Filter out password, createdAt, updatedAt
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress
    })
  })
)

// POST /api/users - Create a new user
router.post(
  '/users',
  asyncHandler(async (req, res, next) => {
    const user = req.body

    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10)
    }

    try {
      // Try...catch block left for Sequelize errors
      await User.create(user)
      // Per spec: set Location to "/" and send 201 with no content
      res.location('/')
      res.status(201).end()
    } catch (error) {
      if (
        error.name === 'SequelizeValidationError' ||
        error.name === 'SequelizeUniqueConstraintError'
      ) {
        const errors = error.errors.map((err) => err.message)
        res.status(400).json({ errors })
      } else {
        next(error)
      }
    }
  })
)

module.exports = router
