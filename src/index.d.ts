import { PrismaClient } from '@prisma/client'
import { RedisClient } from 'redis'

//enable autocomplete in conrollers, utils etc.

declare global {
  namespace Express {
    interface Request {
      prisma: PrismaClient
      redis: RedisClient
    }
  }
}
