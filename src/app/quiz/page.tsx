'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const questions = [
  { q: 'How are you feeling right now?', options: ['Happy', 'Sad', 'Anxious', 'Stressed'] },
  { q: 'Pick a color that matches your mood:', options: ['Yellow', 'Blue', 'Red', 'Gray'] },
  { q: 'Which activity appeals most?', options: ['Meditation', 'Journaling', 'Exercise', 'Talking'] },
]

export default function QuizPage() {
  const total = questions.length
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<{ category: string; module: string; link: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAnswer = async (opt: string) => {
    const next = [...answers, opt]
    setAnswers(next)
    if (step + 1 < total) {
      setStep(step + 1)
    } else {
      setLoading(true)
      await new Promise((r) => setTimeout(r, 800))
      const simulated = {
        category: next[0],
        module: next.includes('Meditation') ? 'Mindfulness 101' : 'Stress Management Mastery',
        link: '/courses',
      }
      setResult(simulated)
      setLoading(false)
    }
  }

  // loading
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
      </div>
    )
  }

  // result
  if (result) {
    return (
      <section className="section section-purple-50 center">
        <div className="container-lg">
          <motion.div
            className="section-white p-6 rounded-xl shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="section-title">Your Recommendation</h2>
            <p className="section-text">You’re feeling: <strong>{result.category}</strong></p>
            <p className="section-text">We suggest: <strong>{result.module}</strong></p>
            <Link href={result.link} className="btn-primary">Explore Course</Link>
          </motion.div>
        </div>
      </section>
    )
  }

  // question step
  const { q, options } = questions[step]
  const progress = ((step) / total) * 100

  return (
    <section className="section section-white">
      <div className="container-lg center">
        {/* progress */}
        <div className="progress">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="section-text">
          Question {step + 1} of {total}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="section-title">{q}</h2>
            <div className="options">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className="btn-outline"
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
