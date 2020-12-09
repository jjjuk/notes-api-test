const express = require('express')

const {
  upsertNote,
  getMyNotes,
  deleteNote,
  shareNote,
  logout,
} = require('../controller')

const route = express.Router()

route.post('/note', upsertNote)

route.get('/user/notes', getMyNotes)

route.delete('/note/:id', deleteNote)

route.post('share/note/:id', shareNote)

route.post('/logout', logout)

const main = route

module.exports = {
  main,
}
