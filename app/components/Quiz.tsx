'use client'

import { useState } from 'react'
import {
  QUESTIONS,
  CATEGORIES,
  CATEGORY_MAX,
  CATEGORY_FEEDBACK,
  getResultBand,
  getCategoryScore,
  getCategoryTier,
} from '@/app/lib/quiz-data'

export default function Quiz() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(-1))
  const [done, setDone] = useState(false)

  function handleAnswer(points: number) {
    const next = [...answers]
    next[current] = points
    setAnswers(next)
    if (current + 1 < QUESTIONS.length) {
      setCurrent(current + 1)
    } else {
      setDone(true)
    }
  }

  function restart() {
    setCurrent(0)
    setAnswers(Array(QUESTIONS.length).fill(-1))
    setDone(false)
  }

  if (done) {
    return <Results answers={answers} onRestart={restart} />
  }

  const question = QUESTIONS[current]
  const progress = ((current) / QUESTIONS.length) * 100

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-foreground/60 mb-2">
            <span>Frage {current + 1} von {QUESTIONS.length}</span>
            <span>{question.category}</span>
          </div>
          <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-foreground/5 rounded-2xl p-6 md:p-8 mb-4">
          <p className="text-lg md:text-xl font-semibold leading-snug mb-6">
            {question.text}
          </p>

          <div className="flex flex-col gap-3">
            {question.options.map((option) => (
              <button
                key={option.points}
                onClick={() => handleAnswer(option.points)}
                className="text-left w-full px-5 py-4 rounded-xl border border-foreground/10 bg-background hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-150 text-sm md:text-base cursor-pointer"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Results({
  answers,
  onRestart,
}: {
  answers: number[]
  onRestart: () => void
}) {
  const total = answers.reduce((sum, a) => sum + Math.max(a, 0), 0)
  const band = getResultBand(total)

  const categoryScores = CATEGORIES.map((cat) => {
    const score = getCategoryScore(answers, cat)
    const max = CATEGORY_MAX[cat]
    return { category: cat, score, max, tier: getCategoryTier(score, max) }
  })

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 pt-10 bg-background">
      <div className="w-full max-w-2xl space-y-6">
        {/* Total score */}
        <div className="bg-foreground/5 rounded-2xl p-6 md:p-8 text-center">
          <p className="text-sm text-foreground/50 uppercase tracking-widest mb-1">Gesamtergebnis</p>
          <p className="text-6xl font-bold mb-1">
            {total}
            <span className="text-2xl font-normal text-foreground/40">/60</span>
          </p>
          <div className={`inline-block mt-2 px-4 py-1 rounded-full text-white text-sm font-semibold ${band.color}`}>
            {band.label}
          </div>
          <p className="mt-4 text-sm text-foreground/70 leading-relaxed">{band.description}</p>

          {/* Score bar */}
          <div className="mt-5 w-full h-3 bg-foreground/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${band.color}`}
              style={{ width: `${(total / 60) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-foreground/40 mt-1">
            <span>0</span>
            <span>15</span>
            <span>30</span>
            <span>45</span>
            <span>60</span>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="bg-foreground/5 rounded-2xl p-6 md:p-8">
          <h2 className="font-semibold text-base mb-4">Ergebnis nach Kategorie</h2>
          <div className="space-y-4">
            {categoryScores.map(({ category, score, max, tier }) => {
              const pct = (score / max) * 100
              const barColor = tier === 'low' ? 'bg-red-400' : tier === 'medium' ? 'bg-yellow-400' : 'bg-green-500'
              const labelColor = tier === 'low' ? 'text-red-500 font-medium' : tier === 'medium' ? 'text-amber-500' : 'text-green-600'
              return (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={labelColor}>
                      {tier === 'low' && '⚠ '}{category}
                    </span>
                    <span className="text-foreground/50 text-xs">{score}/{max}</span>
                  </div>
                  <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barColor}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Per-category feedback */}
        <div className="bg-foreground/5 rounded-2xl p-6 md:p-8">
          <h2 className="font-semibold text-base mb-4">Empfehlungen je Kategorie</h2>
          <div className="space-y-4">
            {categoryScores.map(({ category, tier }) => {
              const borderColor = tier === 'low' ? 'border-red-400' : tier === 'medium' ? 'border-yellow-400' : 'border-green-500'
              const titleColor = tier === 'low' ? 'text-red-500' : tier === 'medium' ? 'text-amber-500' : 'text-green-600'
              return (
                <div key={category} className={`border-l-2 ${borderColor} pl-4`}>
                  <p className={`text-sm font-semibold mb-1 ${titleColor}`}>{category}</p>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {CATEGORY_FEEDBACK[category][tier]}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Restart */}
        <div className="flex justify-center pb-10">
          <button
            onClick={onRestart}
            className="px-6 py-3 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Quiz neu starten
          </button>
        </div>
      </div>
    </div>
  )
}
