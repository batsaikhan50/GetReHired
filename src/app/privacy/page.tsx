'use client'

import { MarketingShell } from '@/components/site/MarketingShell'
import { Prose } from '@/components/site/Prose'

const LAST_UPDATED = 'May 2026'

export default function PrivacyPage() {
  return (
    <MarketingShell>
      <Prose title="Privacy Policy" subtitle={`Last updated: ${LAST_UPDATED}`}>
        <p>
          This Privacy Policy explains what information GetReHired collects, how we use it, and the
          choices you have. We built this tool to help people find their next career — protecting
          your information is part of that.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Assessment answers.</strong> The responses you give during the career
            assessment (industry, role, skills, preferences). These are stored in your browser to
            generate your results.
          </li>
          <li>
            <strong>Email address.</strong> Only if you choose to have your results emailed to you.
          </li>
          <li>
            <strong>Payment information.</strong> If you unlock the full results, payment is
            processed by our payment provider. We never see or store your card details.
          </li>
          <li>
            <strong>Basic usage data.</strong> Anonymous analytics about how the site is used, to
            improve it.
          </li>
        </ul>

        <h2>How we use your information</h2>
        <ul>
          <li>To calculate and show your career matches.</li>
          <li>To email your results when you request it.</li>
          <li>To process payments for unlocking full results.</li>
          <li>To improve the assessment and the product.</li>
        </ul>

        <h2>What we don&apos;t do</h2>
        <ul>
          <li>We don&apos;t sell your personal information.</li>
          <li>We don&apos;t share your answers with employers.</li>
          <li>We don&apos;t store payment card numbers.</li>
        </ul>

        <h2>Your choices</h2>
        <p>
          Your assessment answers live in your own browser session. You can clear them at any time
          by clearing your browser data. If you created an account, you can request deletion of your
          stored results by contacting us.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Email <a href="mailto:privacy@getrehired.app">privacy@getrehired.app</a>.
        </p>
      </Prose>
    </MarketingShell>
  )
}
