'use strict'

// Wraps an async route handler and passes any errors to the next() function

const asyncHandler = (cb) => async (req, res, next) => {
  try {
    await cb(req, res, next)
  } catch (error) {
    next(error)
  }
}

module.exports = asyncHandler
