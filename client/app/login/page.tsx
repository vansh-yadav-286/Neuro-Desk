'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import LoginForm from '@/components/LoginForm'

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-dark">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{ x: [-100, 100], y: [0, 50] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          style={{ top: '-10%', left: '-10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          animate={{ x: [100, -100], y: [50, -50] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          style={{ bottom: '-10%', right: '-10%' }}
        />
      </div>

      <div className="w-full max-w-md z-10">
        {/* Logo & Branding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Link href="/" className="inline-block mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/50"
            >
              <span className="text-4xl">🧠</span>
            </motion.div>
          </Link>
          <h1 className="text-3xl font-bold gradient-text mb-2">NeuroLearn</h1>
          <p className="text-slate-400">Welcome back, learner!</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass p-8 rounded-2xl border border-slate-700 shadow-xl"
        >
          {/* Decorative Top Line */}
          <motion.div
            className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full mb-8 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          />

          <LoginForm />
        </motion.div>

        {/* Terms & Privacy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-xs text-slate-500 mt-8"
        >
          By signing in, you agree to our{' '}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </motion.p>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center mt-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
