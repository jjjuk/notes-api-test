const { Request, Response } = require('express')
const { verify } = require('jsonwebtoken')

/**
 * Get contetnt of note by shared link.
 * @param {Request} req Request.
 * @param {Response} res Response.
 */
const getSharedNoteContetnt = async (req, res) => {
  const { prisma } = req
  const { id } = verify(req.params.token, 'verysecret')
  if (!id) res.status(400).json({ message: 'Invalid token!' })
  else {
    const note = await prisma.note.findUnique({ where: { id } })

    if (!note) res.status(404).json({ message: 'Note not found!' })
    else {
      res.status(200).send(note.content)
    }
  }
}

module.exports = {
  getSharedNoteContetnt,
}
