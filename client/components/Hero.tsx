'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import AnimatedButton from './AnimatedButton'

interface User {
  id: string
  email: string
  name: string
}

export default function Hero() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse user data')
      }
    }
  }, [])
  return (
    <section className="min-h-screen pt-20 px-4 flex items-center justify-center bg-gradient-to-b from-slate-900/50 to-transparent">
      <div className="max-w-4xl mx-auto text-center">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-6"
        >
          <div className="glass px-4 py-2 rounded-full text-sm font-semibold">
            ✨ Learn Smarter, Not Harder
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight"
        >
          Visualize Complex Ideas in 3D
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Transform your learning with interactive 3D models, AI-powered quizzes, and voice-guided lessons
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 justify-center flex-wrap mb-12"
        >
          {user ? (
            <>
              <AnimatedButton href="/upload" variant="primary" size="lg">
                📤 Upload Content
              </AnimatedButton>
              <AnimatedButton href="/dashboard" variant="secondary" size="lg">
                📊 View Dashboard
              </AnimatedButton>
            </>
          ) : (
            <>
              <AnimatedButton href="/signup" variant="primary" size="lg">
                🚀 Start Learning Now
              </AnimatedButton>
              <AnimatedButton href="/login" variant="outline" size="lg">
                📝 Sign In
              </AnimatedButton>
            </>
          )}
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4 mt-16"
        >
          {[
            { number: '10K+', label: 'Students' },
            { number: '500+', label: 'Lessons' },
            { number: '99%', label: 'Satisfaction' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="glass p-6 rounded-xl"
            >
              <div className="text-3xl font-bold gradient-text">{stat.number}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
