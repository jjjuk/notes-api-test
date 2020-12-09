const { Request, Response } = require('express')

/**
 * Create new Note or update if id passed in body.
 * @param {Request} req Request.
 * @param {Response} res Response.
 */
const upsertNote = async (req, res) => {
  const { prisma } = req
  const { content, id = 0 } = req.body
  const userId = req.session.userId
  const note = await prisma.note.upsert({
    where: { id },
    create: {
      user: { connect: { id: userId } },
      content,
    },
    update: {
      content,
    },
  })

  if (id) res.status(201).json({ note })
  else res.status(200).json({ note })
}

module.exports = {
  upsertNote,
}
