import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allCareerSlugs, getCareerDetail } from '@/lib/scoringEngine'
import { CareerDetailView } from './CareerDetailView'

// Pre-render a static page per career — great for SEO and sharing.
export function generateStaticParams() {
  return allCareerSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const detail = getCareerDetail(slug)
  if (!detail) return { title: 'Career not found — GetReHired' }

  const title = `${detail.title} — career path, salary & skills | GetReHired`
  const description = `What a ${detail.title} does, typical salary (${detail.salaryRange}), time-to-hire, the skills to build, and live job openings. See if it fits your background.`
  return {
    title,
    description,
    openGraph: { title, description },
  }
}

export default async function CareerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const detail = getCareerDetail(slug)
  if (!detail) notFound()

  return <CareerDetailView detail={detail} />
}
