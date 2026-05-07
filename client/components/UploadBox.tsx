'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loader from './Loader'
import AnimatedButton from './AnimatedButton'

export default function UploadBox() {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const files = Array.from(e.dataTransfer.files)
    await handleFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || [])
    handleFiles(files)
  }

  const handleFiles = async (files: File[]) => {
    const validFormats = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'text/plain']
    
    for (const file of files) {
      if (!validFormats.includes(file.type)) {
        toast.error(`${file.name} format not supported`)
        continue
      }

      if (file.size > 50 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 50MB)`)
        continue
      }

      await uploadFile(file)
    }
  }

  const uploadFile = async (file: File) => {
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percentComplete = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            )
            console.log(`Upload progress: ${percentComplete}%`)
          },
        }
      )

      toast.success('File uploaded successfully!')
      // Redirect to world with the uploaded content
      window.location.href = `/world?contentId=${response.data.contentId}`
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  if (uploading) return <Loader />

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full"
    >
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`glass p-12 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
          dragging ? 'border-primary bg-opacity-20 scale-105' : 'border-slate-600'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.gif,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="text-center w-full">
          <motion.div
            animate={dragging ? { scale: 1.1 } : { scale: 1 }}
            className="text-6xl mb-4 inline-block"
          >
            {dragging ? '📤' : '🤖'}
          </motion.div>
          <h3 className="text-2xl font-bold mb-4">
            {dragging ? 'Drop your files here' : 'AI Chatbot Learning Assistant'}
          </h3>
          
          {!dragging && (
            <div className="flex gap-2 max-w-md mx-auto relative mb-6">
              <input 
                type="text" 
                placeholder="What do you want to learn today? e.g. Quantum Physics" 
                className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-primary text-white placeholder-slate-400"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    e.preventDefault();
                    e.stopPropagation();
                    const file = new File([e.currentTarget.value], "query.txt", { type: "text/plain" });
                    uploadFile(file);
                  }
                }}
              />
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-white transition-colors p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  if (input.value.trim()) {
                    const file = new File([input.value], "query.txt", { type: "text/plain" });
                    uploadFile(file);
                  }
                }}
              >
                🚀
              </button>
            </div>
          )}

          <p className="text-slate-400 mb-2 text-sm">
            {dragging ? 'Release to upload' : 'Or drag and drop files / click to browse'}
          </p>
          <p className="text-xs text-slate-500">
            Supported: PDF, Images (JPG, PNG, GIF), Text files • Max 50MB
          </p>
        </div>
      </div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 20 }}
        transition={{ delay: 0.3 }}
        className="mt-8 grid md:grid-cols-3 gap-4"
      >
        {[
          { emoji: '🤖', text: 'AI analyzes your content' },
          { emoji: '🎨', text: 'Generates 3D models' },
          { emoji: '📝', text: 'Creates interactive quizzes' },
        ].map((feature, i) => (
          <div key={i} className="glass p-4 rounded-xl text-center">
            <div className="text-3xl mb-2">{feature.emoji}</div>
            <p className="text-sm text-slate-300">{feature.text}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
