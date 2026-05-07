'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import AnimatedButton from './AnimatedButton'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store user data in localStorage
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }

      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('authToken', `token_${Date.now()}`)

      toast.success('Login successful! 🎉')
      
      // Redirect to dashboard
      setTimeout(() => {
        router.push('/dashboard')
      }, 500)
    } catch (error) {
      toast.error('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setEmail('demo@neurolearn.com')
    setPassword('demo123456')
    
    // Auto-submit after setting fields
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const form = document.querySelector('form') as HTMLFormElement
    if (form) {
      form.dispatchEvent(new Event('submit', { bubbles: true }))
    }
  }

  return (
    <motion.form
      onSubmit={handleLogin}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Email Input */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <label className="block text-sm font-semibold text-slate-300">
          📧 Email Address
        </label>
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-all duration-300 focus:shadow-lg focus:shadow-primary/20"
        />
      </motion.div>

      {/* Password Input */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <label className="block text-sm font-semibold text-slate-300">
          🔐 Password
        </label>
        <div className="relative">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-all duration-300 focus:shadow-lg focus:shadow-primary/20 pr-12"
          />
          <motion.button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xl transition-colors hover:text-primary"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </motion.button>
        </div>
      </motion.div>

      {/* Remember & Forgot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between text-sm"
      >
        <label className="flex items-center gap-2 cursor-pointer group">
          <motion.input
            type="checkbox"
            className="w-4 h-4 rounded bg-slate-800 border-slate-700 cursor-pointer accent-primary"
            whileHover={{ scale: 1.1 }}
          />
          <span className="text-slate-400 group-hover:text-slate-300 transition-colors">
            Remember me
          </span>
        </label>
        <motion.a
          href="#"
          className="text-primary hover:text-secondary transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          Forgot password?
        </motion.a>
      </motion.div>

      {/* Login Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <AnimatedButton
          type="submit"
          disabled={loading}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {loading ? '⏳ Logging in...' : '🚀 Sign In'}
        </AnimatedButton>
      </motion.div>

      {/* Demo Login */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <AnimatedButton
          onClick={handleDemoLogin}
          disabled={loading}
          variant="outline"
          size="md"
          className="w-full"
        >
          👤 Try Demo Account
        </AnimatedButton>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative"
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-slate-900 text-slate-400">or</span>
        </div>
      </motion.div>

      {/* Social Login */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-2 gap-3"
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toast.success('Google login coming soon! 🔄')}
          className="glass px-4 py-3 rounded-lg font-semibold hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span className="text-xl">🔵</span>
          <span className="hidden sm:inline">Google</span>
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toast.success('GitHub login coming soon! 🔄')}
          className="glass px-4 py-3 rounded-lg font-semibold hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span className="text-xl">🐙</span>
          <span className="hidden sm:inline">GitHub</span>
        </motion.button>
      </motion.div>

      {/* Sign Up Link */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-slate-400"
      >
        Don&apos;t have an account?{' '}
        <motion.a
          href="/signup"
          className="text-primary font-semibold hover:text-secondary transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          Sign up now
        </motion.a>
      </motion.p>
    </motion.form>
  )
}
