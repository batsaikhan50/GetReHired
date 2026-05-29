'use client'

import { MarketingShell } from '@/components/site/MarketingShell'
import { Prose } from '@/components/site/Prose'

const LAST_UPDATED = 'May 2026'

export default function TermsPage() {
  return (
    <MarketingShell>
      <Prose title="Terms of Service" subtitle={`Last updated: ${LAST_UPDATED}`}>
        <p>
          By using GetReHired, you agree to these terms. Please read them — they&apos;re written to
          be clear rather than clever.
        </p>

        <h2>What GetReHired is</h2>
        <p>
          GetReHired is a career guidance tool. It analyzes the information you provide and suggests
          career paths that may fit your skills and experience, along with learning resources and
          live job listings from third parties.
        </p>

        <h2>What it isn&apos;t</h2>
        <ul>
          <li>It is <strong>not</strong> a guarantee of employment, income, or any specific outcome.</li>
          <li>It is <strong>not</strong> professional financial, legal, or career counseling advice.</li>
          <li>Job listings come from third-party sources and we don&apos;t control their accuracy.</li>
        </ul>

        <h2>Payments</h2>
        <p>
          The assessment and your top matches are free. Unlocking the full set of matches is a
          one-time payment. Because results are delivered instantly and digitally, payments are
          generally non-refundable — but if something went wrong, contact us and we&apos;ll make it
          right.
        </p>

        <h2>Acceptable use</h2>
        <ul>
          <li>Don&apos;t misuse, scrape, or attempt to disrupt the service.</li>
          <li>Provide accurate information so your results are meaningful.</li>
          <li>Don&apos;t use the service for any unlawful purpose.</li>
        </ul>

        <h2>Limitation of liability</h2>
        <p>
          The service is provided &quot;as is.&quot; To the extent permitted by law, GetReHired is
          not liable for decisions you make based on your results. Always use your own judgment when
          making career and financial decisions.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms over time. Continued use after changes means you accept the
          updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? Email <a href="mailto:hello@getrehired.app">hello@getrehired.app</a>.
        </p>
      </Prose>
    </MarketingShell>
  )
}
