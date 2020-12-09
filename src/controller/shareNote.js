const { Request, Response } = require('express')
const { sign } = require('jsonwebtoken')

/**
 * Make a link to share your note.
 * @param {Request} req Request.
 * @param {Response} res Response.
 */
const shareNote = async (req, res) => {
  const { id } = req.params
  const token = sign({ id }, 'verysecret')

  res.status(200).json({ link: `http://localhost:4000/note/share/${token}` })
}

module.exports = {
  shareNote,
}
