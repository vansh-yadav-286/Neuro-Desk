'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import AnimatedButton from '@/components/AnimatedButton'

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields')
      return
    }

    if (formData.name.length < 2) {
      toast.error('Name must be at least 2 characters')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        name: formData.name,
        avatar: `https://api.dicebear.com/7.x/avataaars/png?seed=${formData.email}`,
      }

      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('authToken', `token_${Date.now()}`)

      toast.success('Account created successfully! 🎉')

      setTimeout(() => {
        router.push('/dashboard')
      }, 500)
    } catch (error) {
      toast.error('Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-dark">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          animate={{ x: [-100, 100], y: [0, 50] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          style={{ top: '-10%', right: '-10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{ x: [100, -100], y: [50, -50] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          style={{ bottom: '-10%', left: '-10%' }}
        />
      </div>

      <div className="w-full max-w-md z-10">
        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <Link href="/" className="inline-block mb-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mx-auto shadow-lg shadow-secondary/50"
            >
              <span className="text-3xl">🧠</span>
            </motion.div>
          </Link>
          <h1 className="text-3xl font-bold gradient-text mb-2">Join NeuroLearn</h1>
          <p className="text-slate-400">Start your learning journey today</p>
        </motion.div>

        {/* Signup Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass p-8 rounded-2xl border border-slate-700 shadow-xl"
        >
          <motion.form
            onSubmit={handleSignup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-slate-300">
                👤 Full Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-secondary transition-all duration-300 focus:shadow-lg focus:shadow-secondary/20"
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-slate-300">
                📧 Email Address
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-secondary transition-all duration-300 focus:shadow-lg focus:shadow-secondary/20"
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-slate-300">
                🔐 Password
              </label>
              <div className="relative">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-secondary transition-all duration-300 focus:shadow-lg focus:shadow-secondary/20 pr-12"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xl transition-colors hover:text-secondary"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </motion.button>
              </div>
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-slate-300">
                ✓ Confirm Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-secondary transition-all duration-300 focus:shadow-lg focus:shadow-secondary/20"
              />
            </motion.div>

            {/* Terms Checkbox */}
            <motion.label
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <motion.input
                type="checkbox"
                className="w-4 h-4 rounded bg-slate-800 border-slate-700 cursor-pointer accent-secondary"
                whileHover={{ scale: 1.1 }}
                required
              />
              <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                I agree to the Terms and Privacy Policy
              </span>
            </motion.label>

            {/* Signup Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <AnimatedButton
                type="submit"
                disabled={loading}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {loading ? '⏳ Creating Account...' : '✨ Create Account'}
              </AnimatedButton>
            </motion.div>

            {/* Login Link */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center text-slate-400 text-sm"
            >
              Already have an account?{' '}
              <Link href="/login" className="text-secondary font-semibold hover:text-accent transition-colors">
                Sign in
              </Link>
            </motion.p>
          </motion.form>
        </motion.div>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-secondary transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
