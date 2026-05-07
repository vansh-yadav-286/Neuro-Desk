'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import ThreeScene from '@/components/ThreeScene'
import QuizCard from '@/components/QuizCard'
import VoiceAssistant from '@/components/VoiceAssistant'
import Loader from '@/components/Loader'
import AnimatedButton from '@/components/AnimatedButton'

interface WorldContent {
  id: string
  modelType: string
  title: string
  description: string
  icon: string
  color: string
  stats: { label: string; value: string }[]
  quizzes: string[]
  details: string[]
}

interface SceneOption {
  type: string
  title: string
  icon: string
  color: string
}

const scenes: SceneOption[] = [
  { type: 'brain', title: 'Brain Anatomy', icon: '🧠', color: '#ec4899' },
  { type: 'heart', title: 'Heart System', icon: '❤️', color: '#ef4444' },
  { type: 'solar', title: 'Solar System', icon: '🌍', color: '#f59e0b' },
]

const contentMap: { [key: string]: WorldContent } = {
  brain: {
    id: '1',
    modelType: 'brain',
    title: 'Brain Anatomy',
    description: 'Explore the structure and functions of the human brain',
    icon: '🧠',
    color: '#ec4899',
    stats: [
      { label: 'Weight', value: '1.4 kg' },
      { label: 'Neurons', value: '86B' },
      { label: 'Connections', value: '100T+' },
    ],
    quizzes: [
      'What are the main lobes of the brain?',
      'Identify the cerebellum',
      'Name the largest brain structure',
      'What does the hippocampus control?',
    ],
    details: [
      'The cerebrum is the largest part of the brain, responsible for conscious thought',
      'The cerebellum coordinates movement and balance',
      'The brainstem controls vital functions like breathing',
    ],
  },
  heart: {
    id: '2',
    modelType: 'heart',
    title: 'Heart System',
    description: 'Understand the complex circulatory system',
    icon: '❤️',
    color: '#ef4444',
    stats: [
      { label: 'Beats/Min', value: '60-100' },
      { label: 'Chambers', value: '4' },
      { label: 'Blood Flow', value: '5L/min' },
    ],
    quizzes: [
      'What are the four chambers of the heart?',
      'Explain the cardiac cycle',
      'Name the major blood vessels',
      'What does the valve prevent?',
    ],
    details: [
      'The heart pumps oxygenated blood throughout the body',
      'The right side receives deoxygenated blood from the body',
      'The left side pumps oxygen-rich blood to the body',
    ],
  },
  solar: {
    id: '3',
    modelType: 'solar',
    title: 'Solar System',
    description: 'Explore our cosmic neighborhood',
    icon: '🌍',
    color: '#f59e0b',
    stats: [
      { label: 'Planets', value: '8' },
      { label: 'Moons', value: '200+' },
      { label: 'Distance', value: '4.8B km' },
    ],
    quizzes: [
      'How many planets are in the solar system?',
      'Which planet is the largest?',
      'What is the distance to the Sun?',
      'Name all gas giants',
    ],
    details: [
      'The Sun is the center of our solar system',
      'Earth orbits the Sun in approximately 365 days',
      'The solar system formed 4.6 billion years ago',
    ],
  },
}

export default function World() {
  const [currentModel, setCurrentModel] = useState<string>('brain')
  const [content, setContent] = useState<WorldContent>(contentMap.brain)
  const [loading, setLoading] = useState(true)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizProgress, setQuizProgress] = useState(0)
  const [rotateScene, setRotateScene] = useState(true)

  useEffect(() => {
    setContent(contentMap[currentModel])
    setShowQuiz(false)
    setQuizProgress(0)
  }, [currentModel])

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) return <Loader />

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-dark overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl"
          animate={{ x: [-100, 100], y: [0, 50] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          style={{ top: '10%', right: '5%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl"
          animate={{ x: [100, -100], y: [50, -50] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          style={{ bottom: '10%', left: '5%' }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-8 relative z-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">{content.icon}</div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">{content.title}</h1>
            <p className="text-slate-400">Interactive 3D Learning Experience</p>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6 relative z-10">
        {/* Left: 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-4"
        >
          {/* 3D Viewer */}
          <div className="rounded-2xl overflow-hidden glass border border-slate-700 shadow-2xl" style={{ minHeight: '500px' }}>
            <ThreeScene modelType={content.modelType} />
          </div>

          {/* Scene Controls */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-4 rounded-2xl border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Scene Controls</h3>
              <motion.button
                onClick={() => setRotateScene(!rotateScene)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg transition-all ${
                  rotateScene
                    ? 'bg-primary/20 border border-primary text-primary'
                    : 'bg-slate-800/50 border border-slate-700 text-slate-300'
                }`}
              >
                {rotateScene ? '🔄 Auto Rotate' : '⏸️ Paused'}
              </motion.button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {scenes.map((scene) => (
                <motion.button
                  key={scene.type}
                  onClick={() => setCurrentModel(scene.type)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl transition-all border-2 ${
                    currentModel === scene.type
                      ? 'glass border-primary bg-primary/20'
                      : 'glass border-slate-700 bg-slate-800/30'
                  }`}
                >
                  <div className="text-2xl mb-1">{scene.icon}</div>
                  <div className="text-xs font-semibold">{scene.title}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          {content.details.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass p-6 rounded-2xl border border-slate-700"
            >
              <h3 className="text-lg font-semibold mb-4">Learn More</h3>
              <div className="space-y-3">
                {content.details.map((detail, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex gap-3"
                  >
                    <div className="text-primary text-xl">✓</div>
                    <p className="text-slate-300 text-sm">{detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Right: Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {/* Stats */}
          <div className="glass p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>📊</span> Key Stats
            </h3>
            <div className="space-y-3">
              {content.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass bg-slate-800/50 p-3 rounded-lg border border-slate-700"
                >
                  <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
                  <div className="text-xl font-bold gradient-text">{stat.value}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-6 rounded-2xl border border-slate-700"
          >
            <h2 className="text-xl font-bold mb-2">{content.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed">{content.description}</p>
          </motion.div>

          {/* Voice Assistant */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <VoiceAssistant content={content} />
          </motion.div>

          {/* Quiz Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <AnimatedButton
              onClick={() => setShowQuiz(!showQuiz)}
              variant={showQuiz ? 'primary' : 'secondary'}
              size="lg"
              className="w-full"
            >
              {showQuiz ? '✓ Quiz Mode Active' : '📝 Start Quiz Challenge'}
            </AnimatedButton>
          </motion.div>

          {/* Quiz Progress */}
          {showQuiz && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-4 rounded-2xl border border-slate-700"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold">Quiz Progress</span>
                <span className="text-xs text-slate-400">{quizProgress}/{content.quizzes.length}</span>
              </div>
              <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${(quizProgress / content.quizzes.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          )}

          {/* Quiz */}
          {showQuiz && content.quizzes && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar"
            >
              {content.quizzes.map((quiz, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <QuizCard
                    question={quiz}
                    index={i}
                    onAnswered={() => setQuizProgress(i + 1)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.8);
        }
      `}</style>
    </div>
  )
}
