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
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))

// CORS - must be before routes
const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean)
const corsOptions = {
  origin: (origin: any, callback: any) => {
    // allow non-browser tools (like curl) which have undefined origin
    if (!origin) return callback(null, true)
    if (allowedOrigins.length === 0) return callback(null, true) // allow all when not configured
    if (allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions)) // Enable pre-flight for all routes

// Private Network Access: when browsers perform preflight to a private/loopback address
// they may include `Access-Control-Request-Private-Network: true` — respond with
// `Access-Control-Allow-Private-Network: true` when appropriate.
app.use((req, res, next) => {
  const acrpn = req.header('Access-Control-Request-Private-Network')
  if (acrpn && acrpn.toString() === 'true') {
    res.setHeader('Access-Control-Allow-Private-Network', 'true')
  }
  next()
})

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }))

// Health check
app.get('/', (_req, res) => {
  res.json({ 
    message: 'KENFUSE API', 
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      api: '/api/v1'
    }
  })
})

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
