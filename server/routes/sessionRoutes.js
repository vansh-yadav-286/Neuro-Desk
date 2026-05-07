import express from 'express'
import asyncHandler from 'express-async-handler'

const router = express.Router()

// Get all sessions
router.get('/', asyncHandler(async (req, res) => {
  res.json([
    {
      id: '1',
      title: 'Brain Anatomy Basics',
      topic: 'Neuroscience',
      progress: 45,
      lastAccessed: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Cardiac System Overview',
      topic: 'Medicine',
      progress: 72,
      lastAccessed: new Date().toISOString(),
    },
  ])
}))

// Get specific session
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params
  
  res.json({
    id,
    title: 'Learning Session',
    progress: 50,
  })
}))

export default router
