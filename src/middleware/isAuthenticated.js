const express = require('express')
const createError = require('http-errors')

const isAuthenticated = express.Router()

isAuthenticated.use((req, _, next) => {
  if (!req.session || !req.session.userId) {
    req.session?.destroy() //optional chaining is a THING
    next(createError(401, 'Not authorized!'))
  } else next()
})

module.exports = {
  isAuthenticated,
}
