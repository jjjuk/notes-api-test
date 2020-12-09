const { PrismaClient } = require('@prisma/client') //it's my favourite ORM (but it's kinda smth bigger then just ORM)

const prisma = new PrismaClient()

;(async () => {
  await prisma.$queryRaw('DROP TABLE IF EXISTS "public"."User" CASCADE')
  await prisma.$queryRaw('DROP TABLE IF EXISTS "public"."Note" CASCADE')
  await prisma.$queryRaw(`
    CREATE TABLE "public"."User" ( 
      id                SERIAL PRIMARY KEY,
      "name"            VARCHAR(50) DEFAULT(''),
      "email"           TEXT UNIQUE NOT NULL,
      "password"        TEXT NOT NULL 
    );
  `)
  await prisma.$queryRaw(`
    CREATE TABLE "public"."Note" ( 
      id                SERIAL PRIMARY KEY,
      "userId"          INT NOT NULL,
      FOREIGN KEY ("userId") REFERENCES "public"."User"(id) ON DELETE CASCADE,
      "content"         VARCHAR(1000)
    );
  `)
  process.exit(0)
})()
