const express = require('express')
const clients = express.Router()

const { PrismaClient } = require('@prisma/client') //it's my favourite ORM (but it's kinda smth bigger then just ORM)
const redis = require('redis')

const prisma = new PrismaClient()
const redisClient = redis.createClient(6379, 'localhost', {
  password: 'FiGreo32reoqowR1321e12',
})

redisClient.on('error', console.error)

clients.use((req, _, next) => {
  req.prisma = prisma
  req.redis = redisClient
  next()
})

module.exports = {
  clients,
  redisClient,
}
