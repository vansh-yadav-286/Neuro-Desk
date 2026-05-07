'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Loader from '@/components/Loader'
import AnimatedButton from '@/components/AnimatedButton'
import toast from 'react-hot-toast'

interface LearningSession {
  id: string
  title: string
  topic: string
  progress: number
  lastAccessed: string
}

export default function Dashboard() {
  const [sessions, setSessions] = useState<LearningSession[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/sessions`
      )
      setSessions(response.data)
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-2 gradient-text">Your Learning Dashboard</h1>
          <p className="text-slate-400">Track your progress and continue your learning journey</p>
        </motion.div>

        {sessions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold mb-2">No sessions yet</h2>
            <p className="text-slate-400 mb-6">
              Start by uploading a document or image to begin your learning journey
            </p>
            <AnimatedButton
              href="/upload"
              variant="primary"
              size="lg"
            >
              📤 Upload Content
            </AnimatedButton>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session, i) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, translateY: -4 }}
                onClick={() => {
                  router.push(`/world?sessionId=${session.id}`)
                  toast.success(`Loading ${session.title}...`)
                }}
                className="glass p-6 rounded-2xl hover:bg-opacity-30 transition-all cursor-pointer group border border-slate-700 hover:border-primary"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold group-hover:gradient-text transition-all">
                    {session.title}
                  </h3>
                  <motion.span 
                    className="text-2xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    🎓
                  </motion.span>
                </div>
                <p className="text-slate-400 mb-4 text-sm">{session.topic}</p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <motion.span 
                      className="font-bold gradient-text"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {session.progress}%
                    </motion.span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${session.progress}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <p className="text-sm text-slate-500">
                  Last accessed: {new Date(session.lastAccessed).toLocaleDateString()}
                </p>
                <motion.div
                  className="mt-4 text-sm font-semibold text-primary"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  Continue Learning →
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
