const { Request, Response } = require('express')
const { sign } = require('jsonwebtoken')

/**
 * Make a link to share your note.
 * @param {Request} req Request.
 * @param {Response} res Response.
 */
const shareNote = async (req, res) => {
  const id = Number(req.params.id)
  const token = sign({ id }, 'verysecret') //jwt is too long for this case, I use it for fun)

  res.status(200).json({ link: `http://localhost:4000/shared/note/${token}` })
}

module.exports = {
  shareNote,
}
