const { Request, Response } = require('express')
const { appendSessionId } = require('../utils')
const { hash } = require('bcrypt')

/**
 * Create new account.
 * @param {Request} req Request.
 * @param {Response} res Response.
 */
const signup = async (req, res) => {
  const { prisma } = req
  const { email, password } = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  })

  if (!!userExists)
    res
      .status(406)
      .json({ message: `User with email ${email} already exists.` })
  else {
    const hashed = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
      },
      select: {
        id: true,
      },
    })

    req.session.userId = user.id
    appendSessionId(req, user.id, req.sessionID, () => {
      res.status(201).json({ message: 'Successfully signed in.' })
    })
  }
}

module.exports = {
  signup,
}
