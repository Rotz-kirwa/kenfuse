import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { errorHandler } from './middleware/errorHandler'
import { notFound } from './middleware/notFound'
import routes from './routes'
import { logger } from './utils/logger'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? (origin, callback) => {
        const allowedOrigins = [
          'https://kenfuse.vercel.app',
          /^https:\/\/kenfuse-.*\.vercel\.app$/
        ]
        if (!origin || allowedOrigins.some(allowed => 
          typeof allowed === 'string' ? allowed === origin : allowed.test(origin)
        )) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
    : ['http://localhost:5173', 'http://localhost:3001'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }))

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/v1', routes)

// Error handling
app.use(notFound)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`)
  logger.info(`📝 Environment: ${process.env.NODE_ENV}`)
  logger.info(`🌐 CORS enabled for: ${process.env.CORS_ORIGIN}`)
})

export default app
