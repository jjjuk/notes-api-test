const { Request, Response } = require('express')

/**
 * Get notes. UserId took from session data.
 * @param {Request} req Request.
 * @param {Response} res Response.
 */
const getMyNotes = async (req, res) => {
  const { prisma } = req
  const { take, skip } = req.body
  const userId = req.session.userId
  const dataLength = await prisma.note.count({ where: { userId } })
  const notes = await prisma.note.findMany({
    where: { userId },
    skip,
    take,
  })

  res.status(201).json({ notes, dataLength }) // data lenght may be usefull for pagination
}

module.exports = {
  getMyNotes,
}
