import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Instantiated lazily inside the handler so the module imports cleanly at build
// time even when RESEND_API_KEY isn't set in the build environment.
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  return key ? new Resend(key) : null
}

interface Match {
  title: string
  emoji: string
  score: number
  salaryRange: string
  timeToHire: string
  reasons: string[]
  skills: string[]
  interviewQuestions: string[]
  retrainingRoadmap: { skill: string; url: string; platform: string }[]
}

function buildEmailHtml(name: string, matches: Match[]): string {
  const top3 = matches.slice(0, 3)

  const cardsHtml = top3.map((m, i) => `
    <div style="background:#161b25;border:1px solid #1f2937;border-radius:16px;padding:20px;margin-bottom:20px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
        <span style="font-size:28px;">${m.emoji}</span>
        <div>
          <p style="color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0;">#${i + 1} Match</p>
          <h2 style="color:#ffffff;font-size:18px;margin:2px 0 0;">${m.title}</h2>
        </div>
        <span style="margin-left:auto;color:#f97316;font-size:20px;font-weight:700;">${m.score}%</span>
      </div>

      <div style="display:flex;gap:10px;margin-bottom:14px;">
        <div style="flex:1;background:#1f2937;border-radius:10px;padding:8px 12px;">
          <p style="color:#6b7280;font-size:11px;margin:0;">Salary</p>
          <p style="color:#ffffff;font-size:13px;font-weight:600;margin:2px 0 0;">${m.salaryRange}</p>
        </div>
        <div style="flex:1;background:#1f2937;border-radius:10px;padding:8px 12px;">
          <p style="color:#6b7280;font-size:11px;margin:0;">Time to hire</p>
          <p style="color:#ffffff;font-size:13px;font-weight:600;margin:2px 0 0;">${m.timeToHire}</p>
        </div>
      </div>

      <p style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 6px;">Why it fits</p>
      ${m.reasons.map(r => `<p style="color:#d1d5db;font-size:13px;margin:0 0 4px;">→ ${r}</p>`).join('')}

      <p style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:14px 0 6px;">Skills to build</p>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;">
        ${m.skills.map(s => `<span style="background:#1f2937;border:1px solid #374151;border-radius:20px;padding:3px 10px;color:#d1d5db;font-size:12px;">${s}</span>`).join('')}
      </div>

      <p style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 6px;">Interview questions to prepare</p>
      ${m.interviewQuestions.map((q, qi) => `<p style="color:#d1d5db;font-size:13px;margin:0 0 4px;"><span style="color:#f97316;">${qi + 1}.</span> ${q}</p>`).join('')}

      <p style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:14px 0 6px;">Free learning resources</p>
      ${m.retrainingRoadmap.map(r => `
        <a href="${r.url}" style="display:flex;align-items:center;justify-content:space-between;background:#1f2937;border:1px solid #374151;border-radius:10px;padding:10px 12px;margin-bottom:6px;text-decoration:none;">
          <div>
            <p style="color:#ffffff;font-size:13px;margin:0;">${r.skill}</p>
            <p style="color:#6b7280;font-size:11px;margin:2px 0 0;">${r.platform} · Free</p>
          </div>
          <span style="color:#f97316;font-size:14px;">→</span>
        </a>
      `).join('')}
    </div>
  `).join('')

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="background:#0d0f14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;padding:24px;">
      <div style="max-width:560px;margin:0 auto;">

        <div style="text-align:center;margin-bottom:32px;">
          <p style="color:#f97316;font-size:11px;text-transform:uppercase;letter-spacing:3px;margin:0 0 8px;">GetReHired</p>
          <h1 style="color:#ffffff;font-size:26px;font-weight:300;margin:0;">
            ${name}<span style="color:#f97316;font-weight:600;">'s Career Matches</span>
          </h1>
          <p style="color:#6b7280;font-size:13px;margin:8px 0 0;">Ranked by compatibility with your background</p>
        </div>

        ${cardsHtml}

        <div style="text-align:center;padding-top:24px;border-top:1px solid #1f2937;">
          <p style="color:#4b5563;font-size:12px;margin:0;">getrehired.com · Results saved for you</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  try {
    const { email, name, matches } = await request.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    if (!Array.isArray(matches) || matches.length === 0) {
      return NextResponse.json({ error: 'No matches provided' }, { status: 400 })
    }

    const resend = getResend()
    if (!resend) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json({ error: 'Email service unavailable' }, { status: 503 })
    }

    const { error } = await resend.emails.send({
      from:    'GetReHired <results@getrehired.com>',
      to:      email,
      subject: `${name || 'Your'} career matches are ready`,
      html:    buildEmailHtml(name || 'You', matches),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Send results error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
