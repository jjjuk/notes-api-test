require('dotenv').config()
const { magentaBright: pink, cyanBright: cyan } = require('chalk') //log colors

const express = require('express')
const app = express()

const { publicRoutes, main } = require('./routes')
const { isAuthenticated, clients, redisClient } = require('./middleware')

const session = require('express-session')
const { v4: genuuid } = require('uuid')
const RedisStore = require('connect-redis')(session)

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    cookie: { secure: false, maxAge: 86400000, httpOnly: true },
    secret: 'rediska',
    resave: false,
    saveUninitialized: true,
    genid: () => genuuid(),
  })
)

app.use(express.json()) // think of XML server every time I type this line
app.use(express.urlencoded({ extended: true }))

const pino = require('express-pino-logger')({
  prettyPrint: true,
})
// app.use(pino) //logs no longer hurt my eyes

const cors = require('cors')({
  origin: '*',
  allowedHeaders: ['Content-Type', 'authorization', 'Authorization'],
})
app.use(cors) //Access-Control-Allow-Origin ¯\_(ツ)_/¯

const cookieParser = require('cookie-parser')()
app.use(cookieParser) // https://preview.redd.it/t9y87m5f0pz41.jpg?width=640&crop=smart&auto=webp&s=2e9d017408fcc1f77e8b1ac2e7c67fe8cdc1ac31

app.use(clients)

app.use(publicRoutes)

app.use(isAuthenticated)

app.use(main)

const port = 4000
const server = app.listen(port, () => {
  console.log(
    pink('✨ Test app running at'),
    cyan(`http://localhost:${port} ✨`)
  )
})

module.exports = {
  server,
  redisClient,
}