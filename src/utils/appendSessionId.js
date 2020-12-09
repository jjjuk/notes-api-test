const { Request } = require('express')

/**
 * Store sessionId 's of specific User in Redis instanse. (user:id:sessions)
 * @param {Request} req Request.
 * @param {number} userId User id from db.
 * @param {string} sessionId Session uuid.
 * @param {Function} callback Callback function.
 */
const appendSessionId = (req, userId, sessionId, callback = () => {}) => {
  const { redis } = req
  //ok callbacks here we go again. promisified "get" throws an error
  redis.get(`user:${userId}:sessions`, (_, value) => {
    const keys = JSON.parse(value || '[]') // XD
    //if this sessionId is new
    if (!keys.find((key) => key === sessionId)) {
      redis.set(
        `user:${userId}:sessions`,
        JSON.stringify([...keys, sessionId]), //up to 512mb of pure session keys
        () => {
          callback()
        }
      )
    } else callback()
  })
}

module.exports = {
  appendSessionId,
}
