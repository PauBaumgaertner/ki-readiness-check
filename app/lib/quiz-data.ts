export type Category =
  | 'AI Knowledge'
  | 'AI Implementation'
  | 'Requirements & Mandate'
  | 'Data Readiness'
  | 'Culture'

export interface Option {
  text: string
  points: number
}

export interface Question {
  id: number
  text: string
  category: Category
  options: Option[]
}

export const CATEGORIES: Category[] = [
  'AI Knowledge',
  'AI Implementation',
  'Requirements & Mandate',
  'Data Readiness',
  'Culture',
]

export const CATEGORY_MAX: Record<Category, number> = {
  'AI Knowledge': 12,
  'AI Implementation': 15,
  'Requirements & Mandate': 9,
  'Data Readiness': 12,
  'Culture': 12,
}

export const QUESTIONS: Question[] = [
  // --- AI Knowledge (Q1-4) ---
  {
    id: 1,
    text: 'How well does your leadership team understand AI and its business applications?',
    category: 'AI Knowledge',
    options: [
      { text: 'No understanding – AI is a black box to us', points: 0 },
      { text: 'Basic awareness, but no practical knowledge', points: 1 },
      { text: 'Good understanding of key concepts and use cases', points: 2 },
      { text: 'Deep expertise; leadership can evaluate AI solutions critically', points: 3 },
    ],
  },
  {
    id: 2,
    text: 'Do your employees have the skills needed to work with AI tools?',
    category: 'AI Knowledge',
    options: [
      { text: 'No AI-related skills exist in our organization', points: 0 },
      { text: 'A few individuals have basic familiarity', points: 1 },
      { text: 'Multiple teams have practical AI experience', points: 2 },
      { text: 'Organization-wide AI literacy with dedicated experts', points: 3 },
    ],
  },
  {
    id: 3,
    text: 'How familiar is your organization with AI regulations and ethical guidelines relevant to your industry?',
    category: 'AI Knowledge',
    options: [
      { text: 'Not aware of any relevant regulations', points: 0 },
      { text: 'Aware of regulations but not yet compliant', points: 1 },
      { text: 'Working toward compliance with known requirements', points: 2 },
      { text: 'Fully compliant and proactively monitoring changes', points: 3 },
    ],
  },
  {
    id: 4,
    text: 'How well does your organization understand what data AI systems require?',
    category: 'AI Knowledge',
    options: [
      { text: 'No understanding of data requirements for AI', points: 0 },
      { text: 'Basic awareness but unclear on specifics', points: 1 },
      { text: 'Clear understanding for specific use cases', points: 2 },
      { text: 'Comprehensive understanding across all planned AI use cases', points: 3 },
    ],
  },
  // --- AI Implementation (Q5-9) ---
  {
    id: 5,
    text: 'Has your organization run any AI pilots or proof-of-concept projects?',
    category: 'AI Implementation',
    options: [
      { text: 'No AI projects of any kind', points: 0 },
      { text: 'Explored ideas but no formal projects yet', points: 1 },
      { text: 'One or two pilots completed', points: 2 },
      { text: 'Multiple pilots completed with measurable outcomes', points: 3 },
    ],
  },
  {
    id: 6,
    text: 'Do you have a documented AI strategy or roadmap?',
    category: 'AI Implementation',
    options: [
      { text: 'No strategy or roadmap exists', points: 0 },
      { text: 'Informal discussions have taken place', points: 1 },
      { text: 'A draft strategy exists but is not formalized', points: 2 },
      { text: 'Formal AI strategy with milestones and clear ownership', points: 3 },
    ],
  },
  {
    id: 7,
    text: 'How integrated is AI into your existing workflows and processes?',
    category: 'AI Implementation',
    options: [
      { text: 'Not integrated at all', points: 0 },
      { text: 'Being tested in isolated areas only', points: 1 },
      { text: 'Integrated in one or two workflows', points: 2 },
      { text: 'AI is embedded across multiple key workflows', points: 3 },
    ],
  },
  {
    id: 8,
    text: 'Do you have the technical infrastructure to support AI (compute, APIs, platforms)?',
    category: 'AI Implementation',
    options: [
      { text: 'No relevant infrastructure in place', points: 0 },
      { text: 'Some infrastructure but significant gaps remain', points: 1 },
      { text: 'Adequate infrastructure for initial use cases', points: 2 },
      { text: 'Scalable, production-ready AI infrastructure', points: 3 },
    ],
  },
  {
    id: 9,
    text: 'How do you measure the success of AI initiatives?',
    category: 'AI Implementation',
    options: [
      { text: 'We do not measure AI outcomes', points: 0 },
      { text: 'Informal feedback only', points: 1 },
      { text: 'Basic KPIs defined for some projects', points: 2 },
      { text: 'Comprehensive measurement framework across all AI projects', points: 3 },
    ],
  },
  // --- Requirements & Mandate (Q10-12) ---
  {
    id: 10,
    text: 'Is there clear executive sponsorship for AI initiatives?',
    category: 'Requirements & Mandate',
    options: [
      { text: 'No executive interest or support', points: 0 },
      { text: 'Some interest but no formal sponsorship', points: 1 },
      { text: 'One executive champion identified', points: 2 },
      { text: 'Strong, active sponsorship at C-suite level', points: 3 },
    ],
  },
  {
    id: 11,
    text: 'Is there a dedicated budget for AI investment?',
    category: 'Requirements & Mandate',
    options: [
      { text: 'No budget allocated', points: 0 },
      { text: 'Budget discussions have started', points: 1 },
      { text: 'Limited budget approved for pilots', points: 2 },
      { text: 'Significant budget committed with multi-year planning', points: 3 },
    ],
  },
  {
    id: 12,
    text: 'Does your organization have defined AI use cases with formal business cases?',
    category: 'Requirements & Mandate',
    options: [
      { text: 'No use cases identified', points: 0 },
      { text: 'Some ideas floated but nothing documented', points: 1 },
      { text: 'Use cases identified but without business cases', points: 2 },
      { text: 'Prioritized use cases with full business cases and ROI estimates', points: 3 },
    ],
  },
  // --- Data Readiness (Q13-16) ---
  {
    id: 13,
    text: 'How would you describe the quality and completeness of your organization\'s data?',
    category: 'Data Readiness',
    options: [
      { text: 'Data is siloed, inconsistent, or largely inaccessible', points: 0 },
      { text: 'Data exists but quality is poor in many areas', points: 1 },
      { text: 'Data is reasonably clean in key areas', points: 2 },
      { text: 'High-quality, well-governed data across the organization', points: 3 },
    ],
  },
  {
    id: 14,
    text: 'Do you have data governance policies in place?',
    category: 'Data Readiness',
    options: [
      { text: 'No data governance at all', points: 0 },
      { text: 'Informal practices only', points: 1 },
      { text: 'Policies exist but are inconsistently applied', points: 2 },
      { text: 'Mature data governance with clear ownership and enforcement', points: 3 },
    ],
  },
  {
    id: 15,
    text: 'How accessible is your data for AI workloads?',
    category: 'Data Readiness',
    options: [
      { text: 'Data is not accessible for analysis or ML', points: 0 },
      { text: 'Some data is accessible but requires significant manual effort', points: 1 },
      { text: 'Key datasets are accessible and documented', points: 2 },
      { text: 'Data is centralized, documented, and readily accessible', points: 3 },
    ],
  },
  {
    id: 16,
    text: 'Do you have robust processes to ensure data privacy and security?',
    category: 'Data Readiness',
    options: [
      { text: 'No data privacy or security controls', points: 0 },
      { text: 'Basic controls in place but many gaps', points: 1 },
      { text: 'Standard controls in place for most data', points: 2 },
      { text: 'Comprehensive, audited data privacy and security framework', points: 3 },
    ],
  },
  // --- Culture (Q17-20) ---
  {
    id: 17,
    text: 'How open is your organization\'s culture to adopting new technology like AI?',
    category: 'Culture',
    options: [
      { text: 'Strong resistance or fear of change', points: 0 },
      { text: 'Mixed feelings; some champions but many skeptics', points: 1 },
      { text: 'Generally open with pockets of resistance', points: 2 },
      { text: 'Enthusiastic and actively seeking AI opportunities', points: 3 },
    ],
  },
  {
    id: 18,
    text: 'Does your organization promote a culture of data-driven decision making?',
    category: 'Culture',
    options: [
      { text: 'Decisions are mainly intuition-based', points: 0 },
      { text: 'Some data use, but not systematic', points: 1 },
      { text: 'Data is regularly used in key decisions', points: 2 },
      { text: 'Data-driven culture is embedded at all levels', points: 3 },
    ],
  },
  {
    id: 19,
    text: 'How does your organization handle failure and experimentation?',
    category: 'Culture',
    options: [
      { text: 'Failure is penalized; experimentation is discouraged', points: 0 },
      { text: 'Tolerance for failure exists in theory but not in practice', points: 1 },
      { text: 'Experimentation is encouraged in specific areas', points: 2 },
      { text: 'Fail-fast culture with clear processes for learning from experiments', points: 3 },
    ],
  },
  {
    id: 20,
    text: 'Does your organization invest in continuous learning and AI upskilling?',
    category: 'Culture',
    options: [
      { text: 'No investment in employee learning', points: 0 },
      { text: 'Occasional training, mostly reactive', points: 1 },
      { text: 'Regular training programs, some AI-focused', points: 2 },
      { text: 'Ongoing AI upskilling programs embedded in career development', points: 3 },
    ],
  },
]

export interface ResultBand {
  label: string
  description: string
  color: string
}

export const RESULT_BANDS: ResultBand[] = [
  {
    label: 'Not Ready',
    description:
      'Your organization is at the very beginning of its AI journey. Foundational work is needed before meaningful AI adoption can happen.',
    color: 'bg-red-500',
  },
  {
    label: 'Getting Started',
    description:
      'You have taken some first steps, but significant gaps remain. A structured approach to AI readiness will accelerate your progress.',
    color: 'bg-orange-400',
  },
  {
    label: 'On Track',
    description:
      'Good progress overall. You have solid foundations in several areas — address the remaining gaps to move toward full AI readiness.',
    color: 'bg-yellow-400',
  },
  {
    label: 'AI Ready',
    description:
      'Your organization is well-positioned to adopt and scale AI. Keep building on your strengths and maintain momentum.',
    color: 'bg-green-500',
  },
]

export function getResultBand(total: number): ResultBand {
  if (total <= 15) return RESULT_BANDS[0]
  if (total <= 30) return RESULT_BANDS[1]
  if (total <= 45) return RESULT_BANDS[2]
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
  'AI Knowledge': {
    low: 'Critical gap — almost no AI literacy exists. Act now: run AI workshops for leadership, appoint an AI Learning Lead, and schedule foundational training for key teams.',
    medium: 'Good start. Deepen knowledge with targeted AI training programs, a regulatory overview (e.g. EU AI Act), and practical use-case workshops across departments.',
    high: 'Excellent foundation. Keep expertise current through AI conferences, internal communities of practice, and systematic monitoring of new regulations and model releases.',
  },
  'AI Implementation': {
    low: 'No projects running yet. Start with one tightly scoped pilot in a low-risk area, document every learning, and use that as the evidence base to justify broader investment.',
    medium: 'Good progress. Formalize your AI strategy with clear milestones and ownership, define KPIs for each initiative, and begin scaling the pilots that have shown results.',
    high: 'Excellent execution. Focus now on rigorous ROI measurement, cross-project knowledge transfer, and embedding proven AI workflows more deeply across the organization.',
  },
  'Requirements & Mandate': {
    low: 'No visible mandate. Prioritize securing executive sponsorship, defining at least two concrete use cases, and ring-fencing a dedicated AI budget — without these, AI stays an experiment.',
    medium: 'Foundations are forming but not yet solid. Formalize sponsorship at C-suite level, commit a multi-year budget, and back each use case with a documented business case.',
    high: 'Strong mandate in place. Use it to drive multi-year AI planning, establish clear AI governance structures, and communicate the AI vision consistently across the organization.',
  },
  'Data Readiness': {
    low: 'Critical action needed. Run a full data audit, define clear data ownership, and invest in data quality and accessibility — AI is only as good as the data it runs on.',
    medium: 'Progress is visible. Invest in a centralized data platform, strengthen data governance, and ensure privacy and compliance requirements are met for all planned AI applications.',
    high: 'Excellent data foundation. Maintain momentum with continuous data quality monitoring, extend governance to new data sources, and prepare curated datasets for ML workloads.',
  },
  'Culture': {
    low: 'High resistance or indifference detected. Prioritize change management, create safe spaces for experimentation, and frame AI as an opportunity rather than a threat to jobs.',
    medium: 'Basic openness exists. Build on internal champions, visibly celebrate data-driven wins, and embed AI upskilling into formal career development paths.',
    high: 'Strong AI culture. Capitalize on this energy: establish an internal AI champions network and use your cultural strength as a competitive advantage in recruiting and innovation.',
  },
}

export function getCategoryScore(
  answers: number[],
  category: Category
): number {
  return QUESTIONS.filter((q) => q.category === category).reduce(
    (sum, q) => sum + (answers[q.id - 1] ?? 0),
    0
  )
}
