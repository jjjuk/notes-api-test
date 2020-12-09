const { Request } = require('express')

/**
 * Delete all sessionId's of specific User from Redis instanse. (Use Callback to destroy current session).
 * @param {Request} req Request.
 * @param {number} userId User id from db.
 * @param {Function} callback Callback function.
 */
const deleteAllSessionIds = (req, userId, callback = () => {}) => {
  const { redis } = req
  redis.get(`user:${userId}:sessions`, (_, value) => {
    const keys = JSON.parse(value || '[]').map((key) => `sess:${key}`) // XD

    //delete all keys of sessions
    redis.del([...keys], () => {
      callback()
    })
  })
}

module.exports = {
  deleteAllSessionIds,
}
