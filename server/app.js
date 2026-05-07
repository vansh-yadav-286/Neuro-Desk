import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Routes
import uploadRoutes from './routes/uploadRoutes.js'
import quizRoutes from './routes/quizRoutes.js'
import contentRoutes from './routes/contentRoutes.js'
import sessionRoutes from './routes/sessionRoutes.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors({
  origin: process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() })
})

// Root - redirect to health for quick verification
app.get('/', (req, res) => {
  res.redirect('/health')
})

// API Routes
app.use('/api/upload', uploadRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/sessions', sessionRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  void next
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    status: err.status || 500,
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

const PORT = process.env.SERVER_PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app
