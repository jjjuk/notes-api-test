const { Request, Response } = require('express')

/**
 * Delete note by id.
 * @param {Request} req Request.
 * @param {Response} res Response.
 */
const deleteNote = async (req, res) => {
  const { prisma } = req
  const { id } = req.params
  const note = await prisma.note.delete({ where: { id } })
  res.status(200).json({ note })
}

module.exports = {
  deleteNote,
}
