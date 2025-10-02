'use strict'

const express = require('express')
const { Course, User } = require('../models')
const { authenticateUser } = require('../middleware/auth-user')

const router = express.Router()

// GET /api/courses - Return all courses including the User associated with each course
router.get('/courses', async (req, res, next) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'emailAddress'] // Filter out createdAt, updatedAt
        }
      ]
    })
    res.json(courses) // Defaults to 200
  } catch (error) {
    next(error)
  }
})

// GET /api/courses/:id - Return a specific course including the User associated with it
router.get('/courses/:id', async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'emailAddress'] // Filter out createdAt, updatedAt, password
        }
      ]
    })

    if (course) {
      res.json(course) // defaults to 200
    } else {
      res.status(404).json({ message: 'Course not found' })
    }
  } catch (error) {
    next(error)
  }
})

// POST /api/courses - Create a new course
router.post('/courses', authenticateUser, async (req, res, next) => {
  try {
    const course = await Course.create(req.body)
    res.location(`/api/courses/${course.id}`)
    res.status(201).end()
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map((err) => err.message)
      res.status(400).json({ errors })
    } else {
      next(error)
    }
  }
})

// PUT /api/courses/:id - Update an existing course
router.put('/courses/:id', authenticateUser, async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id)
    if (course) {
      if (course.userId === req.currentUser.id) {
        await course.update(req.body)
        res.status(204).end()
      } else {
        res.status(403).json({ message: 'Forbidden: Not the course owner' })
      }
    } else {
      res.status(404).json({ message: 'Course not found' })
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map((err) => err.message)
      res.status(400).json({ errors })
    } else {
      next(error)
    }
  }
})

// DELETE /api/courses/:id - Delete an existing course
router.delete('/courses/:id', authenticateUser, async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id)
    if (course) {
      if (course.userId === req.currentUser.id) {
        await course.destroy()
        res.status(204).end()
      } else {
        res.status(403).json({ message: 'Forbidden: Not the course owner' })
      }
    } else {
      res.status(404).json({ message: 'Course not found' })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
