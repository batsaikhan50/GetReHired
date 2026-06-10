// Dev-only sample job listings, shown when NEXT_PUBLIC_PAYMENT_MOCK=1 (mobile
// builds before the API server is deployed — see lib/api.ts). The cards link
// to a real LinkedIn search for the career so taps still go somewhere useful.
// Once the site is live the flag goes away and real Adzuna/Remotive jobs load.

export interface SampleJob {
  id: string
  url: string
  title: string
  company: string
  logo: string | null
  location: string
  type: string
  source: 'remotive' | 'muse' | 'adzuna'
}

const COMPANIES = ['Northwind Group', 'Brightline Co', 'Atlas Partners', 'Meridian Labs']
const LOCATIONS = ['Remote', 'New York, NY', 'Austin, TX', 'Chicago, IL']
const SOURCES: SampleJob['source'][] = ['adzuna', 'remotive', 'muse', 'adzuna']
const SENIORITY = ['', 'Senior ', 'Junior ', 'Lead ']

export function sampleJobs(career: string): SampleJob[] {
  const search = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(career)}`
  return COMPANIES.map((company, i) => ({
    id: `sample-${career}-${i}`,
    url: search,
    title: `${SENIORITY[i]}${career}`,
    company,
    logo: null,
    location: LOCATIONS[i],
    type: 'Full-time',
    source: SOURCES[i],
  }))
}
