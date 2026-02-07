import { PrismaClient } from '@prisma/client'
import { logger } from '../utils/logger'

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

// Try to connect but don't exit if it fails
prisma.$connect()
  .then(() => logger.info('✅ Database connected successfully'))
  .catch((error) => {
    logger.error('❌ Database connection failed:', error.message)
    logger.warn('⚠️  Server will start but database operations will fail')
  })

export default prisma
