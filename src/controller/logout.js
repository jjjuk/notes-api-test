const { Request, Response } = require('express')
const { deleteAllSessionIds } = require('../utils')

/**
 * Logout and delete all sessions.
 * @param {Request} req Request.
 * @param {Response} res Response.
 */
const logout = (req, res) => {
  const userId = req.session.userId
  deleteAllSessionIds(userId, () => {
    req.session.destroy((err) => {
      if (!!err) res.status(500).json({ message: 'Something went wrong' })
      else res.status(200).json({ message: 'Successfully logged out.' })
    })
  })
}

module.exports = {
  logout,
}
