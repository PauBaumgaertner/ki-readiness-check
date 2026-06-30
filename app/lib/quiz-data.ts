export type Category = 'Wissen & Kultur' | 'Umsetzung & Tools' | 'Daten & Infrastruktur'

export interface Option {
  text: string
  points: number
}

export interface ChoiceQuestion {
  type: 'choice'
  id: number
  text: string
  category: Category
  options: Option[]
}

export interface TextQuestion {
  type: 'text'
  id: number
  text: string
  category: Category
  placeholder?: string
}

export type Question = ChoiceQuestion | TextQuestion

export const CATEGORIES: Category[] = [
  'Wissen & Kultur',
  'Umsetzung & Tools',
  'Daten & Infrastruktur',
]

export const QUESTIONS: Question[] = [
  // --- Wissen & Kultur ---
  {
    id: 1,
    type: 'choice',
    text: 'Wie gut versteht euer Team, was KI kann und was nicht?',
    category: 'Wissen & Kultur',
    options: [
      { text: 'Gar nicht — KI ist für uns eine Blackbox', points: 0 },
      { text: 'Grundlegendes Bewusstsein, aber wenig praktisches Wissen', points: 1 },
      { text: 'Gutes Verständnis der wichtigsten Konzepte', points: 2 },
      { text: 'Tiefes Wissen, wir können KI-Lösungen kritisch bewerten', points: 3 },
    ],
  },
  {
    id: 2,
    type: 'choice',
    text: 'Wie offen ist euer Unternehmen für neue Technologie wie KI?',
    category: 'Wissen & Kultur',
    options: [
      { text: 'Starker Widerstand oder Angst vor Veränderung', points: 0 },
      { text: 'Gemischt — einige dafür, viele skeptisch', points: 1 },
      { text: 'Grundsätzlich offen, mit einzelnen Bedenken', points: 2 },
      { text: 'Begeistert und aktiv auf der Suche nach KI-Chancen', points: 3 },
    ],
  },
  {
    id: 3,
    type: 'text',
    text: 'Was ist gerade eure größte Herausforderung oder Unsicherheit beim Thema KI?',
    category: 'Wissen & Kultur',
    placeholder: 'Schreibt hier eure Antwort ...',
  },
  // --- Umsetzung & Tools ---
  {
    id: 4,
    type: 'choice',
    text: 'Nutzt ihr aktuell schon KI-Tools im Arbeitsalltag?',
    category: 'Umsetzung & Tools',
    options: [
      { text: 'Nein, gar nicht', points: 0 },
      { text: 'Einzelne Personen experimentieren privat damit', points: 1 },
      { text: 'Ja, in ein oder zwei Bereichen', points: 2 },
      { text: 'Ja, fest in mehrere Arbeitsabläufe eingebunden', points: 3 },
    ],
  },
  {
    id: 5,
    type: 'choice',
    text: 'Habt ihr eine klare Strategie oder einen Plan für KI?',
    category: 'Umsetzung & Tools',
    options: [
      { text: 'Keine Strategie vorhanden', points: 0 },
      { text: 'Erste informelle Gespräche haben stattgefunden', points: 1 },
      { text: 'Ein Entwurf existiert, aber nichts Festes', points: 2 },
      { text: 'Formale KI-Strategie mit klaren Zielen und Verantwortlichen', points: 3 },
    ],
  },
  {
    id: 6,
    type: 'choice',
    text: 'Gibt es bei euch jemanden, der KI aktiv vorantreibt (z.B. Geschäftsführung)?',
    category: 'Umsetzung & Tools',
    options: [
      { text: 'Niemand, kein Interesse von oben', points: 0 },
      { text: 'Etwas Interesse, aber keine echte Unterstützung', points: 1 },
      { text: 'Eine Person treibt es voran', points: 2 },
      { text: 'Starke, aktive Unterstützung auf Führungsebene', points: 3 },
    ],
  },
  {
    id: 7,
    type: 'text',
    text: 'In welcher Branche seid ihr tätig und wie groß ist euer Team? Wo würdet ihr euch am meisten Unterstützung durch KI wünschen?',
    category: 'Umsetzung & Tools',
    placeholder: 'z.B. Wir sind ein 20-köpfiges Marketingteam und würden uns Hilfe bei der Content-Erstellung wünschen ...',
  },
  // --- Daten & Infrastruktur ---
  {
    id: 8,
    type: 'choice',
    text: 'Wie würdet ihr die Qualität und Ordnung eurer Daten beschreiben?',
    category: 'Daten & Infrastruktur',
    options: [
      { text: 'Verstreut, unstrukturiert oder kaum zugänglich', points: 0 },
      { text: 'Daten existieren, aber Qualität ist oft schlecht', points: 1 },
      { text: 'In den wichtigen Bereichen recht sauber', points: 2 },
      { text: 'Hohe Qualität, gut organisiert im ganzen Unternehmen', points: 3 },
    ],
  },
  {
    id: 9,
    type: 'choice',
    text: 'Habt ihr die technische Basis für KI (Systeme, Tools, Zugänge)?',
    category: 'Daten & Infrastruktur',
    options: [
      { text: 'Keine passende Infrastruktur', points: 0 },
      { text: 'Etwas vorhanden, aber große Lücken', points: 1 },
      { text: 'Ausreichend für erste Anwendungen', points: 2 },
      { text: 'Skalierbar und produktionsreif', points: 3 },
    ],
  },
  {
    id: 10,
    type: 'text',
    text: 'Wenn ihr in den nächsten 6 Monaten EINE Sache mit KI verbessern könntet — was wäre das?',
    category: 'Daten & Infrastruktur',
    placeholder: 'Schreibt hier eure Antwort ...',
  },
]

export const TOTAL_MAX = QUESTIONS.filter(
  (q): q is ChoiceQuestion => q.type === 'choice'
).length * 3

export function getCategoryMax(category: Category): number {
  return QUESTIONS.filter(
    (q): q is ChoiceQuestion => q.type === 'choice' && q.category === category
  ).length * 3
}

export const CATEGORY_MAX: Record<Category, number> = {
  'Wissen & Kultur': getCategoryMax('Wissen & Kultur'),
  'Umsetzung & Tools': getCategoryMax('Umsetzung & Tools'),
  'Daten & Infrastruktur': getCategoryMax('Daten & Infrastruktur'),
}

export interface ResultBand {
  label: string
  description: string
  color: string
}

export const RESULT_BANDS: ResultBand[] = [
  {
    label: 'Noch nicht bereit',
    description:
      'Euer Unternehmen steht am Anfang der KI-Reise. Bevor eine sinnvolle KI-Nutzung möglich wird, braucht es grundlegende Vorarbeit in Wissen, Struktur und Daten.',
    color: 'bg-red-500',
  },
  {
    label: 'Erste Schritte',
    description:
      'Ihr habt begonnen, aber es gibt noch erhebliche Lücken. Ein strukturierter Ansatz wird euch deutlich schneller voranbringen.',
    color: 'bg-orange-400',
  },
  {
    label: 'Auf dem Weg',
    description:
      'Gute Fortschritte in mehreren Bereichen. Adressiert die verbleibenden Schwachstellen — und ihr seid bereit für echte KI-Projekte.',
    color: 'bg-yellow-400',
  },
  {
    label: 'KI-bereit',
    description:
      'Euer Unternehmen ist gut aufgestellt, um KI einzuführen und zu skalieren. Baut auf euren Stärken auf und haltet den Schwung.',
    color: 'bg-green-500',
  },
]

export function getResultBand(total: number): ResultBand {
  if (total <= 5) return RESULT_BANDS[0]
  if (total <= 10) return RESULT_BANDS[1]
  if (total <= 15) return RESULT_BANDS[2]
  return RESULT_BANDS[3]
}

export type FeedbackTier = 'low' | 'medium' | 'high'

export function getCategoryTier(score: number, max: number): FeedbackTier {
  const pct = score / max
  if (pct < 0.33) return 'low'
  if (pct < 0.67) return 'medium'
  return 'high'
}

export const CATEGORY_FEEDBACK: Record<Category, Record<FeedbackTier, string>> = {
  'Wissen & Kultur': {
    low: 'Kritischer Nachholbedarf: Kaum KI-Wissen und wenig Offenheit bremsen jeden Fortschritt. Startet mit gezielten Workshops für Führung und Teams — und schafft einen offenen Raum für Fragen und Bedenken.',
    medium: 'Solide Basis. Vertieft das Wissen mit praxisnahen Trainings und nutzt interne Erfolgsgeschichten, um Skepsis in Neugier zu wandeln.',
    high: 'Starke Kombination aus Wissen und Offenheit. Baut eine interne KI-Community auf und gebt euer Know-how systematisch weiter.',
  },
  'Umsetzung & Tools': {
    low: 'Noch kein KI-Einsatz im Alltag. Startet mit einem überschaubaren Pilotprojekt in einem konkreten Bereich — erste Erfolgserlebnisse schaffen die Grundlage für mehr.',
    medium: 'Erste Schritte sind gemacht. Formalisiert die KI-Strategie, definiert klare Ziele und stellt sicher, dass jemand die Verantwortung für die Umsetzung übernimmt.',
    high: 'Gut aufgestellt. Messt jetzt konsequent den Nutzen eurer KI-Initiativen und skaliert, was funktioniert.',
  },
  'Daten & Infrastruktur': {
    low: 'Dringender Handlungsbedarf: Ohne strukturierte, zugängliche Daten und passende Tools ist KI nicht skalierbar. Beginnt mit einem Daten-Audit und klärt Zuständigkeiten.',
    medium: 'Fortschritte sichtbar. Investiert in Datenqualität und eine zentrale Datenhaltung — das ist die entscheidende Voraussetzung für leistungsfähige KI.',
    high: 'Starke Datenbasis und gute Infrastruktur. Bereitet eure Daten gezielt für KI-Workloads auf und stellt sicher, dass Datenschutz mitgedacht wird.',
  },
}

export function getCategoryScore(
  answers: (number | string)[],
  category: Category
): number {
  return QUESTIONS.filter(
    (q): q is ChoiceQuestion => q.type === 'choice' && q.category === category
  ).reduce((sum, q) => {
    const answer = answers[q.id - 1]
    return sum + (typeof answer === 'number' && answer >= 0 ? answer : 0)
  }, 0)
}
