import { Resend } from 'resend'
import { buildReportEmailHtml } from '@/app/lib/email-template'

const FROM_ADDRESS = 'onboarding@resend.dev'
const SUBJECT = 'Dein persönlicher KI-Readiness Report'

/**
 * Sends the generated report to the user's email via Resend.
 * Server-only — relies on RESEND_API_KEY, which must never be exposed to
 * the browser. `onboarding@resend.dev` is Resend's shared sandbox sender:
 * it only delivers to the address on the Resend account until a real
 * domain is verified.
 */
export async function sendReportEmail(to: string, report: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY ist nicht gesetzt')
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: SUBJECT,
    html: buildReportEmailHtml(report),
  })

  if (error) {
    throw new Error(`Resend Fehler: ${error.message}`)
  }
}
