import { type NextRequest } from 'next/server'
import { createServerSupabase } from '@/app/lib/supabase-server'
import { QUESTIONS } from '@/app/lib/quiz-data'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Ungültiges JSON' }, { status: 400 })
  }

  const { email, phone, answers } = body as {
    email: unknown
    phone: unknown
    answers: unknown
  }

  // Serverseitige Validierung
  if (typeof email !== 'string' || !email.trim()) {
    return Response.json({ error: 'E-Mail fehlt' }, { status: 422 })
  }
  if (!Array.isArray(answers) || answers.length !== QUESTIONS.length) {
    return Response.json({ error: 'Ungültige Antworten' }, { status: 422 })
  }

  const payload: Record<string, unknown> = {
    email: email.trim(),
    phone: typeof phone === 'string' && phone.trim() ? phone.trim() : null,
  }

  QUESTIONS.forEach((q) => {
    const answer = answers[q.id - 1]
    const key = q.type === 'text' ? `q${q.id}_text` : `q${q.id}_answer`
    payload[key] = answer === '' || answer === -1 ? null : answer
  })

  const supabase = createServerSupabase()
  const { error } = await supabase.from('quiz_responses').insert(payload)

  if (error) {
    console.error('[submit-quiz]', error)
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ ok: true }, { status: 201 })
}
