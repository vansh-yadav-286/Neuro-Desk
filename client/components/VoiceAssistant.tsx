'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import AnimatedButton from './AnimatedButton'

interface VoiceAssistantProps {
  content: any
}

export default function VoiceAssistant({ content }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const recognitionRef = useRef<any>(null)

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Speech recognition not supported in your browser')
      return
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = false
    recognitionRef.current.lang = 'en-US'

    recognitionRef.current.onstart = () => setIsListening(true)
    recognitionRef.current.onend = () => setIsListening(false)
    
    recognitionRef.current.onresult = (event: any) => {
      let transcript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      toast.success(`You said: "${transcript}"`)
    }

    recognitionRef.current.onerror = (event: any) => {
      toast.error(`Error: ${event.error}`)
      setIsListening(false)
    }

    recognitionRef.current.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const speak = async () => {
    if (!('speechSynthesis' in window)) {
      toast.error('Text-to-speech not supported in your browser')
      return
    }

    const text = `Let me tell you about ${content?.title}. ${content?.description}`
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => {
      toast.error('Speech failed')
      setIsSpeaking(false)
    }

    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass p-6 rounded-2xl border border-slate-700"
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <motion.span animate={isSpeaking || isListening ? { scale: 1.2 } : { scale: 1 }} className="text-2xl">
          🎤
        </motion.span>
        Voice Assistant
      </h3>

      <div className="space-y-3">
        <AnimatedButton
          onClick={isSpeaking ? stopSpeaking : speak}
          variant={isSpeaking ? 'primary' : 'secondary'}
          size="md"
          className="w-full"
        >
          <motion.span animate={isSpeaking ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 2, repeat: isSpeaking ? Infinity : 0 }}>
            🔊
          </motion.span>
          {isSpeaking ? 'Stop Speaking' : 'Listen to Explanation'}
        </AnimatedButton>

        <AnimatedButton
          onClick={isListening ? stopListening : startListening}
          variant={isListening ? 'primary' : 'outline'}
          size="md"
          className="w-full"
        >
          <motion.span animate={isListening ? { scale: [1, 1.1, 1] } : { scale: 1 }} transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}>
            🎙️
          </motion.span>
          {isListening ? 'Stop Listening' : 'Ask a Question'}
        </AnimatedButton>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-slate-500 mt-4 text-center"
      >
        Use voice commands to interact with the learning material
      </motion.p>
    </motion.div>
  )
}
