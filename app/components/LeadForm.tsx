'use client'

import { useState } from 'react'

interface Props {
  answers: (number | string)[]
}

export default function LeadForm({ answers }: Props) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    if (!email.trim() || !consent) return

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

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 md:p-8 text-center">
        <p className="text-green-600 dark:text-green-400 font-semibold leading-relaxed">
          Danke! Deine Daten werden verarbeitet. Du erhältst in Kürze eine E-Mail mit deinem
          personalisierten Report.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-foreground/5 rounded-2xl p-6 md:p-8">
      <h2 className="font-semibold text-base mb-1">Dein persönlicher Report</h2>
      <p className="text-sm text-foreground/60 mb-5 leading-relaxed">
        Gib deine Kontaktdaten an — wir schicken dir eine ausführliche Auswertung per E-Mail.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="lf-email" className="block text-sm font-medium mb-1">
            E-Mail <span className="text-red-500">*</span>
          </label>
          <input
            id="lf-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="deine@email.de"
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-sm focus:outline-none focus:border-blue-500 transition-colors"
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
            placeholder="+49..."
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-blue-500 flex-shrink-0 cursor-pointer"
          />
          <span className="text-sm text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors">
            Ich bin einverstanden, dass meine Daten gespeichert und für eine Kontaktaufnahme
            genutzt werden
          </span>
        </label>

        {error && (
          <div className="text-sm text-red-500">
            Fehler beim Speichern. Bitte versuche es später erneut.
            <span className="block text-xs text-red-400 mt-1">{error}</span>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !email.trim() || !consent}
          className="w-full px-6 py-3 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Speichern...' : 'Meine Daten speichern'}
        </button>
      </div>
    </div>
  )
}
