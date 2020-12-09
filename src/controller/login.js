const { Request, Response } = require('express')
const { appendSessionId } = require('../utils')
const { compare } = require('bcrypt')

/**
 * Login to account.
 * @param {Request} req Request.
 * @param {Response} res Response.
 */
const login = async (req, res) => {
  const { prisma } = req
  const { email, password } = req.body

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) res.status(401).json({ message: 'User not found!' })
  else {
    const match = await compare(password, user.password)
    if (match) {
      req.session.userId = user.id
      appendSessionId(req, user.id, req.sessionID, () => {
        res.status(201).json({ message: 'Successfully loged in.' })
      })
    } else {
      res.status(401).json({ message: 'Wrong password!' })
    }
  }
}

module.exports = {
  login,
}
