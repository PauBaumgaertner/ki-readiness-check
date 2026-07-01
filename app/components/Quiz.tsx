'use client'

import { useEffect, useState } from 'react'
import {
  QUESTIONS,
  CATEGORIES,
  CATEGORY_MAX,
  CATEGORY_FEEDBACK,
  TOTAL_MAX,
  ENCOURAGEMENTS,
  COMPUTING_MESSAGES,
  getResultBand,
  getCategoryScore,
  getCategoryTier,
} from '@/app/lib/quiz-data'
import LeadForm from '@/app/components/LeadForm'

type Stage = 'intro' | 'quiz' | 'computing' | 'results'

const PRIMARY_BUTTON =
  'bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98]'

export default function Quiz() {
  const [stage, setStage] = useState<Stage>('intro')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | string)[]>(
    QUESTIONS.map((q) => (q.type === 'choice' ? -1 : ''))
  )
  const [selectedPoints, setSelectedPoints] = useState<number | null>(null)

  function advance() {
    if (current + 1 < QUESTIONS.length) {
      setCurrent(current + 1)
    } else {
      setStage('computing')
    }
  }

  function handleChoiceAnswer(points: number) {
    const next = [...answers]
    next[current] = points
    setAnswers(next)
    setSelectedPoints(points)
    // Brief tactile confirmation before moving on — gives the click a sense
    // of weight instead of an instant, jarring jump to the next question.
    setTimeout(() => {
      setSelectedPoints(null)
      advance()
    }, 280)
  }

  function handleTextChange(value: string) {
    const next = [...answers]
    next[current] = value
    setAnswers(next)
  }

  function restart() {
    setCurrent(0)
    setAnswers(QUESTIONS.map((q) => (q.type === 'choice' ? -1 : '')))
    setSelectedPoints(null)
    setStage('intro')
  }

  if (stage === 'intro') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 quiz-backdrop">
        <div className="w-full max-w-2xl text-center animate-fade-slide-in">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            KI-Readiness-Check
          </h1>
          <p className="text-foreground/70 text-base md:text-lg leading-relaxed mb-6 max-w-xl mx-auto">
            Finde in {QUESTIONS.length} kurzen Fragen heraus, wie bereit euer Unternehmen
            für KI ist — und erhaltet eine persönliche Einschätzung mit konkreten
            Empfehlungen.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-foreground/50 mb-8">
            <span>🎯 {QUESTIONS.length} Fragen</span>
            <span>⏱ ca. 2 Minuten</span>
            <span>🎁 Kostenloser Report</span>
          </div>
          <button
            onClick={() => setStage('quiz')}
            className={`px-10 py-4 rounded-xl text-base md:text-lg font-semibold transition-all duration-150 cursor-pointer ${PRIMARY_BUTTON}`}
          >
            Quiz starten →
          </button>
        </div>
      </div>
    )
  }

  if (stage === 'computing') {
    return <ComputingScreen onDone={() => setStage('results')} />
  }

  if (stage === 'results') {
    return <Results answers={answers} onRestart={restart} />
  }

  const question = QUESTIONS[current]
  const progress = ((current + (selectedPoints !== null ? 1 : 0)) / QUESTIONS.length) * 100

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pt-6 md:pt-10 quiz-backdrop">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="sticky top-0 z-10 -mx-4 px-4 pt-2 pb-3 mb-4 bg-background/80 backdrop-blur-sm">
          <div className="flex justify-between text-sm text-foreground/60 mb-2">
            <span className="font-medium">
              Frage {current + 1} von {QUESTIONS.length}
            </span>
            <span>{question.category}</span>
          </div>
          <div className="w-full h-2.5 bg-foreground/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs md:text-sm text-indigo-500 font-medium">
            {ENCOURAGEMENTS[current]}
          </p>
        </div>

        {/* Question card */}
        <div
          key={current}
          className="bg-foreground/5 rounded-2xl p-6 md:p-8 mb-4 animate-fade-slide-in"
        >
          <p className="text-lg md:text-xl font-semibold leading-snug mb-6">
            {question.text}
          </p>

          {question.type === 'choice' ? (
            <div className="flex flex-col gap-3">
              {question.options.map((option) => {
                const isSelected = selectedPoints === option.points
                return (
                  <button
                    key={option.points}
                    onClick={() => selectedPoints === null && handleChoiceAnswer(option.points)}
                    disabled={selectedPoints !== null}
                    className={`text-left w-full px-5 py-4 md:py-5 rounded-xl border text-sm md:text-base transition-all duration-150 cursor-pointer disabled:cursor-default ${
                      isSelected
                        ? 'bg-indigo-500 border-indigo-500 text-white animate-option-selected'
                        : 'border-foreground/10 bg-background hover:bg-indigo-500 hover:text-white hover:border-indigo-500 hover:scale-[1.01] active:scale-[0.99]'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      {option.text}
                      {isSelected && <span aria-hidden="true">✓</span>}
                    </span>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <textarea
                value={answers[current] as string}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={question.placeholder}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-sm md:text-base resize-none focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                onClick={advance}
                className={`self-end px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${PRIMARY_BUTTON}`}
              >
                Weiter →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ComputingScreen({ onDone }: { onDone: () => void }) {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, COMPUTING_MESSAGES.length - 1))
    }, 600)
    const timeout = setTimeout(onDone, COMPUTING_MESSAGES.length * 600 + 300)
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 quiz-backdrop">
      <div className="flex gap-2 mb-6" aria-hidden="true">
        <span className="loading-dot w-3 h-3 rounded-full bg-indigo-500 inline-block" />
        <span className="loading-dot w-3 h-3 rounded-full bg-violet-500 inline-block" />
        <span className="loading-dot w-3 h-3 rounded-full bg-fuchsia-500 inline-block" />
      </div>
      <p className="shimmer-text text-lg md:text-xl font-semibold text-center">
        {COMPUTING_MESSAGES[messageIndex]}
      </p>
    </div>
  )
}

function AnimatedBar({ pct, className }: { pct: number; className: string }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <div className="w-full h-full">
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${className}`}
        style={{ width: `${mounted ? pct : 0}%` }}
      />
    </div>
  )
}

function CircularScore({
  total,
  max,
  ring,
  emoji,
}: {
  total: number
  max: number
  ring: string
  emoji: string
}) {
  const [mounted, setMounted] = useState(false)
  const [display, setDisplay] = useState(0)
  const size = 188
  const stroke = 14
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const pct = max > 0 ? total / max : 0

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const duration = 1000
    const start = performance.now()
    let frame: number
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * total))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [mounted, total])

  const offset = circumference * (1 - (mounted ? pct : 0))

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className={`-rotate-90 ${ring}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeOpacity={0.12}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl mb-1" aria-hidden="true">
          {emoji}
        </span>
        <span className="text-4xl font-bold tabular-nums">
          {display}
          <span className="text-lg font-normal text-foreground/40">/{max}</span>
        </span>
      </div>
    </div>
  )
}

function Results({
  answers,
  onRestart,
}: {
  answers: (number | string)[]
  onRestart: () => void
}) {
  const total = answers.reduce<number>(
    (sum, a) => sum + (typeof a === 'number' && a >= 0 ? a : 0),
    0
  )
  const band = getResultBand(total)

  const categoryScores = CATEGORIES.map((cat) => {
    const score = getCategoryScore(answers, cat)
    const max = CATEGORY_MAX[cat]
    return { category: cat, score, max, tier: getCategoryTier(score, max) }
  })

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 pt-10 quiz-backdrop">
      <div className="w-full max-w-2xl space-y-6">
        {/* Big visual score reveal — the reciprocity "free gift" moment */}
        <div className="bg-foreground/5 rounded-2xl p-6 md:p-8 text-center animate-pop-in">
          <p className="text-sm text-foreground/50 uppercase tracking-widest mb-4">
            Euer Gesamtergebnis
          </p>
          <div className="flex justify-center mb-4">
            <CircularScore total={total} max={TOTAL_MAX} ring={band.ring} emoji={band.emoji} />
          </div>
          <div className={`inline-block px-4 py-1.5 rounded-full text-white text-sm font-semibold ${band.color}`}>
            {band.label}
          </div>
          <p className="mt-4 text-sm text-foreground/70 leading-relaxed max-w-md mx-auto">
            {band.description}
          </p>
        </div>

        {/* Category breakdown */}
        <div className="bg-foreground/5 rounded-2xl p-6 md:p-8">
          <h2 className="font-semibold text-base mb-4">Score nach Kategorie</h2>
          <div className="space-y-4">
            {categoryScores.map(({ category, score, max, tier }) => {
              const pct = (score / max) * 100
              const barColor =
                tier === 'low' ? 'bg-red-400' : tier === 'medium' ? 'bg-yellow-400' : 'bg-green-500'
              const labelColor =
                tier === 'low'
                  ? 'text-red-500 font-medium'
                  : tier === 'medium'
                    ? 'text-amber-500'
                    : 'text-green-600'
              return (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={labelColor}>
                      {tier === 'low' && '⚠ '}{category}
                    </span>
                    <span className="text-foreground/50 text-xs">{score}/{max}</span>
                  </div>
                  <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                    <AnimatedBar pct={pct} className={barColor} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Per-category feedback */}
        <div className="bg-foreground/5 rounded-2xl p-6 md:p-8">
          <h2 className="font-semibold text-base mb-4">Empfehlungen nach Kategorie</h2>
          <div className="space-y-4">
            {categoryScores.map(({ category, tier }) => {
              const borderColor =
                tier === 'low' ? 'border-red-400' : tier === 'medium' ? 'border-yellow-400' : 'border-green-500'
              const titleColor =
                tier === 'low' ? 'text-red-500' : tier === 'medium' ? 'text-amber-500' : 'text-green-600'
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

        {/* Lead form — the curiosity hook for the next, deeper layer */}
        <LeadForm answers={answers} />

        {/* Restart */}
        <div className="flex justify-center pb-10">
          <button
            onClick={onRestart}
            className="px-6 py-3 rounded-xl bg-foreground/10 text-foreground/70 text-sm font-semibold hover:bg-foreground/20 transition-colors cursor-pointer"
          >
            Quiz neu starten
          </button>
        </div>
      </div>
    </div>
  )
}
