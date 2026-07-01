'use client'

import { useState } from 'react'
import { SOCIAL_PROOF_COUNT } from '@/app/lib/quiz-data'

interface Props {
  answers: (number | string)[]
}

const CTA_BUTTON =
  'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 hover:scale-[1.01] active:scale-[0.99]'

// Enthält ein @, davor mind. 1 Zeichen, danach eine Domain mit Punkt
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LeadForm({ answers }: Props) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [report, setReport] = useState<string | null>(null)

  async function handleSubmit() {
    if (!email.trim() || !consent) return

    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Bitte gib eine gültige E-Mail-Adresse ein')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/submit-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, answers }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? `HTTP ${res.status}`)
      }

      const data = await res.json().catch(() => ({}))
      setReport(typeof data.report === 'string' ? data.report : null)
      setSuccess(true)
    } catch (err) {
      console.error('[LeadForm]', err)
      setError('Fehler beim Speichern. Bitte versuche es später erneut.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="space-y-4 animate-pop-in">
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 md:p-8 text-center">
          <p className="text-3xl mb-2" aria-hidden="true">
            🎉
          </p>
          <p className="text-green-700 dark:text-green-400 font-semibold leading-relaxed mb-1">
            Geschafft! Dein persönlicher Report ist da.
          </p>
          <p className="text-sm text-green-700/70 dark:text-green-400/70 leading-relaxed">
            Wir haben ihn zusätzlich an deine E-Mail-Adresse geschickt.
          </p>
        </div>

        <div className="bg-foreground/5 rounded-2xl p-6 md:p-8">
          <h2 className="font-semibold text-base mb-3">Dein KI-Report</h2>
          {report ? (
            <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
              {report}
            </div>
          ) : (
            <p className="text-sm text-foreground/60 leading-relaxed">
              Dein Report wird gerade individuell erstellt und kommt innerhalb von 24h
              per E-Mail nach — die Auswertung oben hast du ja schon.
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-foreground/5 rounded-2xl p-6 md:p-8">
      <h2 className="font-semibold text-lg md:text-xl mb-2">
        Dein persönlicher KI-Report wartet 🎁
      </h2>
      <p className="text-sm text-foreground/60 mb-4 leading-relaxed">
        Wir haben deine Antworten bereits ausgewertet. Trag deine E-Mail ein, und wir
        schicken dir die vollständige Analyse mit konkreten nächsten Schritten für euer
        Unternehmen.
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/50 mb-6">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true">⭐</span>
          Schon {SOCIAL_PROOF_COUNT} Unternehmen haben ihren Report erhalten
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true">⏱</span>
          Wird innerhalb von 24h individuell erstellt
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="lf-email" className="block text-sm font-medium mb-1">
            E-Mail <span className="text-red-500">*</span>
          </label>
          <input
            id="lf-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError(null)
            }}
            placeholder="deine@email.de"
            className="w-full px-4 py-3.5 rounded-xl border border-foreground/10 bg-background text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="lf-phone" className="block text-sm font-medium mb-1">
            Telefon{' '}
            <span className="text-foreground/40 text-xs font-normal">(optional)</span>
          </label>
          <input
            id="lf-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+49 ..."
            className="w-full px-4 py-3.5 rounded-xl border border-foreground/10 bg-background text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <p className="text-xs text-foreground/40 mt-1">
            Hilft uns, dir schneller zu antworten — bleibt aber optional.
          </p>
        </div>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-indigo-500 flex-shrink-0 cursor-pointer"
          />
          <span className="text-sm leading-relaxed">
            <span className="font-medium text-foreground/90 group-hover:text-foreground transition-colors">
              Schreib mir meinen persönlichen Report
            </span>
            <span className="block text-foreground/50 text-xs mt-0.5">
              Deine Angaben werden gespeichert und für die Zusendung sowie eine
              Kontaktaufnahme genutzt — jederzeit widerrufbar.
            </span>
          </span>
        </label>

        {error && <div className="text-sm text-red-500">{error}</div>}

        <button
          onClick={handleSubmit}
          disabled={loading || !email.trim() || !consent}
          className={`w-full px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${CTA_BUTTON}`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="loading-dot w-1.5 h-1.5 rounded-full bg-white inline-block" />
              <span className="loading-dot w-1.5 h-1.5 rounded-full bg-white inline-block" />
              <span className="loading-dot w-1.5 h-1.5 rounded-full bg-white inline-block" />
              <span className="ml-1">Dein Report wird erstellt ...</span>
            </span>
          ) : (
            'Report jetzt erhalten →'
          )}
        </button>

        <p className="text-center text-xs text-foreground/40">
          🔒 Deine Daten sind sicher und werden nicht weitergegeben.
        </p>
      </div>
    </div>
  )
}
