module.exports = {
  ...require('./upsertNote'),
  ...require('./getMyNotes'),
  ...require('./deleteNote'),
  ...require('./shareNote'),
  ...require('./logout'),
  ...require('./getSharedNoteContetnt'),
  ...require('./login'),
  ...require('./signup'),
}