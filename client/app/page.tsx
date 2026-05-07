'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Hero from '@/components/Hero'
import UploadBox from '@/components/UploadBox'
import AnimatedButton from '@/components/AnimatedButton'

export default function Home() {
  const { ref: featureRef, inView } = useInView({ threshold: 0.2 })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section ref={featureRef} className="py-20 px-4 bg-gradient-to-b from-transparent to-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              Learn Like Never Before
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Explore complex topics through interactive 3D visualization, powered by advanced AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🧠',
                title: '3D Visualization',
                desc: 'Explore anatomical structures and concepts in immersive 3D',
              },
              {
                icon: '🤖',
                title: 'AI-Powered Quizzes',
                desc: 'Adaptive learning paths tailored to your understanding',
              },
              {
                icon: '🎤',
                title: 'Voice Assistant',
                desc: 'Interactive voice-guided learning experiences',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="glass p-8 rounded-2xl hover:bg-opacity-20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 gradient-text"
          >
            Start Learning Now
          </motion.h2>
          <UploadBox />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-6">Ready to Transform Your Learning?</h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are discovering new ways to learn with interactive 3D visualization
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <AnimatedButton href="/upload" variant="primary" size="lg">
                🚀 Get Started
              </AnimatedButton>
              <AnimatedButton href="/dashboard" variant="outline" size="lg">
                📊 Explore Dashboard
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
