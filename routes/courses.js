'use strict'

const express = require('express')
const { Course, User } = require('../models')
const { authenticateUser } = require('../middleware/auth-user')
const asyncHandler = require('../middleware/async-handler')

const router = express.Router()

// GET /api/courses - Return all courses including the User associated with each course
router.get(
  '/courses',
  asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: User,
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        }
      ]
    })
    res.json(courses)
  })
)

// GET /api/courses/:id - Return a specific course including the User associated with it
router.get(
  '/courses/:id',
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: User,
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        }
      ]
    })

    if (course) {
      res.json(course)
    } else {
      res.status(404).json({ message: 'Course not found' })
    }
  })
)

// POST /api/courses - Create a new course
router.post(
  '/courses',
  authenticateUser,
  asyncHandler(async (req, res) => {
    const course = await Course.create(req.body)
    res.location(`/api/courses/${course.id}`)
    res.status(201).end()
  })
)

// PUT /api/courses/:id - Update an existing course
router.put(
  '/courses/:id',
  authenticateUser,
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    if (course.userId !== req.currentUser.id) {
      return res.status(403).json({ message: 'Forbidden: Not course owner' })
    }

    await course.update(req.body)
    res.status(204).end()
  })
)

// DELETE /api/courses/:id - Delete an existing course
router.delete(
  '/courses/:id',
  authenticateUser,
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    if (course.userId !== req.currentUser.id) {
      return res.status(403).json({ message: 'Forbidden: Not course owner' })
    }

    await course.destroy()
    res.status(204).end()
  })
)

module.exports = router
