require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const createError = require('http-errors')
const express = require('express')

const prisma = new PrismaClient()
const app = express()

const pino = require('express-pino-logger')({
  prettyPrint: true,
})
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(pino)

app.use(
  cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'authorization', 'Authorization'],
  })
)

app.post('/hi', (req, res) => {
  res.send('Hi!')
})

app.listen(3000)
