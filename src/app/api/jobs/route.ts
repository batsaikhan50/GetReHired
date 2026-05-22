import { NextRequest, NextResponse } from 'next/server'

// ── A03: Whitelist of valid career values ─────────────────────────────────────
const VALID_CAREERS = new Set([
  'Project Manager', 'UX / Product Designer', 'Data Analyst',
  'Sales Representative', 'HR Specialist', 'Content Creator / Copywriter',
  'Logistics Coordinator', 'Customer Success Manager', 'Operations Analyst',
  'Social Media Manager', 'Corporate Trainer', 'Cybersecurity Analyst',
  'Software Developer',
  // New careers
  'Financial Analyst', 'Healthcare Administrator', 'IT Support Specialist',
  'Graphic Designer', 'Video Editor', 'Supply Chain Analyst',
  'Business Development Manager', 'Account Manager', 'E-commerce Specialist',
  'Instructional Designer', 'QA Analyst', 'Event Coordinator',
  'Technical Recruiter', 'SEO Specialist', 'Real Estate Agent',
  'DevOps Engineer', 'Non-profit Program Coordinator',
])

// ── A03: Whitelist of valid country values ────────────────────────────────────
const VALID_COUNTRIES = new Set([
  'Mongolia', 'United States', 'United Kingdom', 'Australia', 'Canada',
  'Germany', 'France', 'Japan', 'South Korea', 'India', 'China',
  'Brazil', 'Mexico', 'South Africa', 'Other', '',
])

// ── A09: Simple in-memory rate limiter ───────────────────────────────────────
// Max 30 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT   = 30
const RATE_WINDOW  = 60_000

function isRateLimited(ip: string): boolean {
  const now    = Date.now()
  const record = rateLimitMap.get(ip)
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return false
  }
  record.count++
  return record.count > RATE_LIMIT
}

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  rateLimitMap.forEach((v, k) => { if (now > v.resetAt) rateLimitMap.delete(k) })
}, 5 * 60_000)

// ── Career → Remotive search term ────────────────────────────────────────────
const remotiveSearch: Record<string, string> = {
  'Project Manager':              'project manager',
  'UX / Product Designer':        'ux designer',
  'Data Analyst':                 'data analyst',
  'Sales Representative':         'sales',
  'HR Specialist':                'human resources',
  'Content Creator / Copywriter': 'copywriter',
  'Logistics Coordinator':        'logistics',
  'Customer Success Manager':     'customer success',
  'Operations Analyst':           'operations analyst',
  'Social Media Manager':         'social media manager',
  'Corporate Trainer':            'trainer',
  'Cybersecurity Analyst':        'cybersecurity',
  'Software Developer':           'software developer',
}

// ── Career → The Muse category ────────────────────────────────────────────────
const museCategory: Record<string, string> = {
  'Project Manager':              'Project Management',
  'UX / Product Designer':        'Design & UX',
  'Data Analyst':                 'Data Science',
  'Sales Representative':         'Sales',
  'HR Specialist':                'HR & Recruiting',
  'Content Creator / Copywriter': 'Content & Writing',
  'Logistics Coordinator':        'Operations',
  'Customer Success Manager':     'Customer Service',
  'Operations Analyst':           'Operations',
  'Social Media Manager':         'Marketing & PR',
  'Corporate Trainer':            'Education',
  'Cybersecurity Analyst':        'IT',
  'Software Developer':           'Engineering',
}

// ── Career → Adzuna search term ───────────────────────────────────────────────
const adzunaSearch: Record<string, string> = {
  'Project Manager':              'project manager',
  'UX / Product Designer':        'ux designer',
  'Data Analyst':                 'data analyst',
  'Sales Representative':         'sales representative',
  'HR Specialist':                'hr specialist',
  'Content Creator / Copywriter': 'copywriter',
  'Logistics Coordinator':        'logistics coordinator',
  'Customer Success Manager':     'customer success manager',
  'Operations Analyst':           'operations analyst',
  'Social Media Manager':         'social media manager',
  'Corporate Trainer':            'corporate trainer',
  'Cybersecurity Analyst':        'cybersecurity analyst',
  'Software Developer':           'software developer',
}

export interface JobListing {
  id: string
  title: string
  company: string
  logo: string | null
  location: string
  type: string
  url: string
  source: 'remotive' | 'muse' | 'adzuna'
}

// ── Fetch from Remotive ───────────────────────────────────────────────────────
async function fetchRemotive(career: string): Promise<JobListing[]> {
  const search = remotiveSearch[career] || ''
  if (!search) return []
  try {
    const res = await fetch(
      `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(search)}&limit=4`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.jobs || []).map((j: any) => ({
      id:       `remotive-${j.id}`,
      title:    String(j.title || '').slice(0, 120),
      company:  String(j.company_name || 'Unknown').slice(0, 80),
      logo:     j.company_logo || null,
      location: String(j.candidate_required_location || 'Remote').slice(0, 60),
      type:     String(j.job_type || 'full_time').slice(0, 40),
      url:      j.url,
      source:   'remotive' as const,
    }))
  } catch { return [] }
}

// ── Fetch from The Muse ───────────────────────────────────────────────────────
async function fetchMuse(career: string): Promise<JobListing[]> {
  const category = museCategory[career]
  if (!category) return []
  try {
    const res = await fetch(
      `https://www.themuse.com/api/public/jobs?category=${encodeURIComponent(category)}&page=0&descending=true`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.results || []).slice(0, 4).map((j: any) => ({
      id:       `muse-${j.id}`,
      title:    String(j.name || '').slice(0, 120),
      company:  String(j.company?.name || 'Unknown').slice(0, 80),
      logo:     null,
      location: String(j.locations?.[0]?.name || 'Flexible').slice(0, 60),
      type:     String(j.levels?.[0]?.name || 'Full-time').slice(0, 40),
      url:      j.refs?.landing_page || '#',
      source:   'muse' as const,
    }))
  } catch { return [] }
}

// ── Country → Adzuna country code ────────────────────────────────────────────
const countryToAdzuna: Record<string, string> = {
  'United States':  'us',
  'United Kingdom': 'gb',
  'Australia':      'au',
  'Canada':         'ca',
  'Germany':        'de',
  'France':         'fr',
  'India':          'in',
  'Brazil':         'br',
}

// ── Fetch from Adzuna ─────────────────────────────────────────────────────────
async function fetchAdzuna(career: string, userCountry: string): Promise<JobListing[]> {
  const appId  = process.env.ADZUNA_APP_ID
  const appKey = process.env.ADZUNA_APP_KEY
  if (!appId || !appKey) return []

  const search  = adzunaSearch[career] || ''
  if (!search) return []
  const country = countryToAdzuna[userCountry] || process.env.ADZUNA_COUNTRY || 'us'

  try {
    const res = await fetch(
      `https://api.adzuna.com/v1/api/jobs/${country}/search/1` +
      `?app_id=${encodeURIComponent(appId)}&app_key=${encodeURIComponent(appKey)}` +
      `&results_per_page=4&what=${encodeURIComponent(search)}&content-type=application/json`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.results || []).map((j: any) => ({
      id:       `adzuna-${j.id}`,
      title:    String(j.title || '').slice(0, 120),
      company:  String(j.company?.display_name || 'Unknown').slice(0, 80),
      logo:     null,
      location: String(j.location?.display_name || j.location?.area?.[0] || 'Unknown').slice(0, 60),
      type:     String(j.contract_time || 'full_time').slice(0, 40),
      url:      j.redirect_url,
      source:   'adzuna' as const,
    }))
  } catch { return [] }
}

// ── Main route ────────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  // A09: rate limit by IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
           || request.headers.get('x-real-ip')
           || 'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  // A03: strict whitelist — reject anything not in the allowed lists
  const career  = request.nextUrl.searchParams.get('career')  || ''
  const country = request.nextUrl.searchParams.get('country') || ''

  if (!VALID_CAREERS.has(career)) {
    return NextResponse.json({ error: 'Invalid career' }, { status: 400 })
  }
  if (!VALID_COUNTRIES.has(country)) {
    return NextResponse.json({ error: 'Invalid country' }, { status: 400 })
  }

  const [remotive, muse, adzuna] = await Promise.all([
    fetchRemotive(career),
    fetchMuse(career),
    fetchAdzuna(career, country),
  ])

  // Round-robin interleave
  const seen     = new Set<string>()
  const combined: JobListing[] = []
  const maxLen   = Math.max(adzuna.length, remotive.length, muse.length)

  for (let i = 0; i < maxLen; i++) {
    for (const source of [adzuna, remotive, muse]) {
      if (i < source.length) {
        const job = source[i]
        const key = `${job.title.toLowerCase()}-${job.company.toLowerCase()}`
        if (!seen.has(key)) {
          seen.add(key)
          combined.push(job)
        }
      }
    }
  }

  return NextResponse.json(combined.slice(0, 9), {
    headers: { 'Cache-Control': 'private, max-age=3600' },
  })
}
