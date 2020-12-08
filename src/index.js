require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const createError = require('http-errors') //Im lazy
const express = require('express')

const prisma = new PrismaClient() //it's my favourite ORM (but it's kinda smth bigger then just ORM)
const app = express()

const pino = require('express-pino-logger')({
  prettyPrint: true,
})
app.use(pino) //logs no longer hurt my eyes

const cors = require('cors')({
  origin: '*',
  allowedHeaders: ['Content-Type', 'authorization', 'Authorization'],
})
app.use(cors) //Access-Control-Allow-Origin ¯\_(ツ)_/¯

const cookieParser = require('cookie-parser')()
app.use(cookieParser)

app.use(express.json()) // think of XML server every time I type this line
app.use(express.urlencoded({ extended: true }))

app.post('/hi', (req, res) => {
  res.send('Hi!')
})

app.listen(3000)
