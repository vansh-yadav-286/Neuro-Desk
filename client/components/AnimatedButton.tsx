'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
}

export default function AnimatedButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}: AnimatedButtonProps) {
  const baseClasses = `font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group`

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-2xl hover:shadow-primary/50',
    secondary: 'bg-gradient-to-r from-secondary to-accent text-white hover:shadow-2xl hover:shadow-secondary/50',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  }

  const finalClass = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

  const buttonContent = (
    <>
      {/* Animated background ripple */}
      <motion.div
        className="absolute inset-0 bg-white opacity-0 rounded-lg"
        whileHover={{ scale: 1.2, opacity: 0.1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 rounded-lg"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </>
  )

  const motionProps = {
    whileHover: { scale: disabled ? 1 : 1.05 },
    whileTap: { scale: disabled ? 1 : 0.95 },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={finalClass}
        {...motionProps}
      >
        {buttonContent}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${finalClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...motionProps}
    >
      {buttonContent}
    </motion.button>
  )
}
