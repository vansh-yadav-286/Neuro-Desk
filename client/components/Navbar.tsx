'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import AnimatedButton from './AnimatedButton'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)

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

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
    setUser(null)
    setShowUserMenu(false)
    window.location.href = '/'
  }

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Explore', href: '/world' },
    { label: 'Upload', href: '/upload' },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 w-full z-50 glass border-b border-slate-700"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-xl font-bold">🧠</span>
          </div>
          <span className="font-bold text-lg hidden sm:inline gradient-text">NeuroLearn</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <motion.button
                onClick={() => setShowUserMenu(!showUserMenu)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-opacity-20 transition-all"
              >
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-semibold hidden lg:inline">{user.name}</span>
                <span className="text-lg">▼</span>
              </motion.button>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 glass rounded-xl shadow-xl border border-slate-700 z-50"
                >
                  <div className="p-4 space-y-2">
                    <div className="pb-2 border-b border-slate-700">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block px-3 py-2 rounded hover:bg-white hover:bg-opacity-10 transition-colors text-sm"
                      onClick={() => setShowUserMenu(false)}
                    >
                      📊 Dashboard
                    </Link>
                    <Link
                      href="/upload"
                      className="block px-3 py-2 rounded hover:bg-white hover:bg-opacity-10 transition-colors text-sm"
                      onClick={() => setShowUserMenu(false)}
                    >
                      📤 Upload
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded hover:bg-red-500 hover:bg-opacity-10 transition-colors text-sm text-red-400"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <>
              <AnimatedButton href="/login" variant="outline" size="sm">
                Sign In
              </AnimatedButton>
              <AnimatedButton href="/signup" variant="primary" size="sm">
                Sign Up
              </AnimatedButton>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 rounded-lg hover:bg-white hover:bg-opacity-10 flex items-center justify-center"
        >
          <span className="text-2xl">{isOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-slate-700 p-4 space-y-3"
        >
          {/* Nav Items */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="border-t border-slate-700 my-2" />

          {/* Auth Section */}
          {user ? (
            <>
              <div className="px-4 py-3 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
              </div>
              <Link
                href="/dashboard"
                className="block px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all text-sm"
                onClick={() => setIsOpen(false)}
              >
                📊 My Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-500 hover:bg-opacity-10 transition-all text-sm text-red-400"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <div className="space-y-2">
              <Link
                href="/login"
                className="block px-4 py-2 border border-primary text-primary rounded-lg font-semibold text-center hover:bg-primary hover:text-white transition-all"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="block px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold text-center"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </motion.nav>
  )
}
