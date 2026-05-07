'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export default function Loader() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 border-4 border-slate-700 border-t-primary rounded-full mb-6"
      />
      <motion.h2
        variants={itemVariants}
        className="text-2xl font-bold gradient-text"
      >
        Loading...
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-slate-400 mt-2 text-center max-w-md"
      >
        Preparing your learning experience
      </motion.p>
    </motion.div>
  )
}
