const MISTRAL_MODEL = 'mistral-small-latest'
const MISTRAL_URL = 'https://api.mistral.ai/v1/chat/completions'

/**
 * Calls the Mistral chat/completions endpoint with a single user prompt and
 * returns the generated text. Server-only — relies on MISTRAL_API_KEY, which
 * must never be exposed to the browser.
 */
export async function generateAiReport(prompt: string): Promise<string> {
  const apiKey = process.env.MISTRAL_API_KEY
  if (!apiKey) {
    throw new Error('MISTRAL_API_KEY ist nicht gesetzt')
  }

  const res = await fetch(MISTRAL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MISTRAL_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 800,
    }),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    throw new Error(`Mistral API Fehler ${res.status}: ${errText.slice(0, 300)}`)
  }

  const data = await res.json()
  const text = data?.choices?.[0]?.message?.content

  if (typeof text !== 'string' || !text.trim()) {
    throw new Error('Mistral hat keinen verwertbaren Text zurückgegeben')
  }

  return text.trim()
}
