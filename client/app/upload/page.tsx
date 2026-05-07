'use client'

import { motion } from 'framer-motion'
import UploadBox from '@/components/UploadBox'

export default function Upload() {
  return (
    <div className="min-h-screen pt-24 px-4 pb-12 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Upload Your Content
          </h1>
          <p className="text-xl text-slate-300">
            Upload documents, images, or PDFs to create interactive 3D learning experiences
          </p>
        </div>

        <UploadBox />

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 glass p-8 rounded-2xl"
        >
          <h3 className="text-lg font-semibold mb-4">Supported Formats</h3>
          <div className="grid md:grid-cols-2 gap-4 text-slate-300">
            <div>
              <p className="font-semibold mb-2">📄 Documents</p>
              <p className="text-sm">PDF, DOCX, TXT</p>
            </div>
            <div>
              <p className="font-semibold mb-2">🖼️ Images</p>
              <p className="text-sm">JPG, PNG, GIF</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-4">
            Our AI will analyze your content and generate 3D models, quizzes, and interactive lessons.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
