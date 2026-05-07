'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import AnimatedButton from './AnimatedButton'

interface QuizCardProps {
  question: string
  index: number
  onAnswered?: () => void
}

export default function QuizCard({ question, index, onAnswered }: QuizCardProps) {
  const [isAnswering, setIsAnswering] = useState(false)
  const [answer, setAnswer] = useState('')

  const handleSubmit = async () => {
    if (!answer.trim()) {
      toast.error('Please provide an answer')
      return
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/quiz/check`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question, userAnswer: answer }),
        }
      )

      const data = await response.json()
      if (data.correct) {
        toast.success('Correct answer! 🎉')
        setAnswer('')
        setIsAnswering(false)
        onAnswered?.()
      } else {
        toast.error(`Incorrect. Hint: ${data.hint}`)
      }
    } catch (error) {
      toast.error('Failed to check answer')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass p-6 rounded-2xl"
    >
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 font-bold">
          {index + 1}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-4">{question}</h4>

          <AnimatePresence>
            {isAnswering ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <input
                  type="text"
                  placeholder="Type your answer..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  autoFocus
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                />
                <div className="flex gap-2">
                  <AnimatedButton
                    onClick={handleSubmit}
                    variant="primary"
                    size="sm"
                    className="flex-1"
                  >
                    ✓ Submit
                  </AnimatedButton>
                  <motion.button
                    onClick={() => {
                      setIsAnswering(false)
                      setAnswer('')
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 border border-slate-600 rounded-lg px-3 py-2 hover:bg-slate-800 transition-all font-semibold"
                  >
                    ✕ Cancel
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <AnimatedButton
                onClick={() => setIsAnswering(true)}
                variant="outline"
                size="sm"
                className="w-full"
              >
                💭 Answer Question
              </AnimatedButton>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
