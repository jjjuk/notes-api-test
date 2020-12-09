const express = require('express')

const { getSharedNoteContetnt, login, signup } = require('../controller')

const route = express.Router()

route.post('/signup', signup)

route.post('/login', login)

route.get('/shared/note/:token', getSharedNoteContetnt)

const publicRoutes = route

module.exports = {
  publicRoutes,
}
