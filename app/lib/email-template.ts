import { COMPANY_NAME_PLACEHOLDER, BOOKING_URL_PLACEHOLDER } from '@/app/lib/constants'

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Turns the report's lightweight text formatting (blank-line paragraphs,
 * "- " list items, "**bold**", "---" dividers) into inline-styled HTML
 * suitable for an email client. All dynamic text is HTML-escaped first —
 * the report text originates from an LLM and must not be trusted as markup.
 */
function reportTextToHtml(report: string): string {
  const blocks = report.trim().split(/\n\n+/)

  const html = blocks
    .map((block) => {
      const trimmed = block.trim()
      if (/^-{3,}$/.test(trimmed)) {
        return '<hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;">'
      }

      const lines = trimmed
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
      const isList = lines.length > 0 && lines.every((l) => l.startsWith('- '))

      if (isList) {
        const items = lines.map((l) => `<li>${escapeHtml(l.slice(2))}</li>`).join('')
        return `<ul style="margin: 0 0 16px; padding-left: 20px; color: #171717;">${items}</ul>`
      }

      return `<p style="margin: 0 0 16px; line-height: 1.6; color: #171717;">${escapeHtml(
        trimmed
      ).replace(/\n/g, '<br>')}</p>`
    })
    .join('')

  // **bold** -> <strong>; sicher, da escapeHtml die Sternchen unangetastet lässt
  return html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

export function buildReportEmailHtml(report: string): string {
  const reportHtml = reportTextToHtml(report)

  return `
<div style="font-family: -apple-system, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px 16px;">
  <h1 style="font-size: 20px; margin: 0 0 8px; color: #171717;">Dein persönlicher KI-Readiness Report</h1>
  <p style="color: #666; margin: 0 0 24px; line-height: 1.5;">
    Hier ist die vollständige Auswertung deines KI-Readiness-Checks.
  </p>

  ${reportHtml}

  <div style="margin-top: 32px; padding: 20px; background: #f5f5f7; border-radius: 12px; text-align: center;">
    <p style="margin: 0 0 12px; font-weight: 600; color: #171717;">Bereit für den nächsten Schritt?</p>
    <a
      href="${BOOKING_URL_PLACEHOLDER}"
      style="display: inline-block; padding: 12px 24px; background: linear-gradient(90deg, #f59e0b, #ea580c); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;"
    >
      Kostenloses Erstgespräch buchen →
    </a>
  </div>

  <p style="color: #999; font-size: 12px; margin-top: 24px;">${COMPANY_NAME_PLACEHOLDER}</p>
</div>`.trim()
}
