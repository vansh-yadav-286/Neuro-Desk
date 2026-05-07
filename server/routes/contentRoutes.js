import express from 'express'
import asyncHandler from 'express-async-handler'

const router = express.Router()

// Get all content
router.get('/', asyncHandler(async (req, res) => {
  res.json({
    content: [],
    message: 'Content endpoint',
  })
}))

// Get specific content
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params
  
  res.json({
    id,
    title: 'Sample Content',
    description: 'Learning material',
    modelType: 'brain',
  })
}))

export default router
