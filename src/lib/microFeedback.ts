const feedback: Record<string, string> = {
  // ── Age ──────────────────────────────────────────────────────────────────────
  'Under 20':  '🌱 Young and early — huge advantage.',
  '20–25':     '🚀 Perfect time to pivot.',
  '26–30':     '💡 Prime career-building years.',
  '31–35':     '⚡ Experience meets energy.',
  '36–40':     '🎯 You know exactly what you want.',
  '41–45':     '💎 Depth of experience is rare.',
  '46–50':     '🧠 Wisdom + skills = strong combo.',
  '51–55':     '🏆 Decades of knowledge. Still going.',
  '55+':       '👑 Irreplaceable experience.',

  // ── Experience ───────────────────────────────────────────────────────────────
  'Under 1 year': '🌱 Everyone starts here.',
  '1–2 years':    '📈 Enough to transfer skills.',
  '3–5 years':    '💡 Sweet spot for career pivots.',
  '6–10 years':   '💎 Deep expertise. High value.',
  '10+ years':    '👑 A decade of real-world knowledge.',

  // ── Education ────────────────────────────────────────────────────────────────
  'High School':                    '💡 Skills beat certificates. Always.',
  'Vocational / Trade School':      '🔧 Trades are booming right now.',
  'Some College':                   '📚 More than you think transfers.',
  "Bachelor's Degree":              '🎓 Solid foundation.',
  "Master's Degree":                '🧠 High-value profile.',
  'PhD / Doctorate':                '🔬 Elite knowledge base.',
  'Self-taught / No formal degree': '🚀 The most impressive path of all.',

  // ── Job type ─────────────────────────────────────────────────────────────────
  'Stable office job':          '🛡️ Stability first. Solid.',
  'Remote / work from home':    '🌍 Opens up global opportunities.',
  'Physical, hands-on work':    '🔧 Hands-on roles are still in demand.',
  'People-facing role':         '🤝 People skills are hard to automate.',
  'Technical / analytical':     '⚙️ Technical roles age well.',
  'Creative (design, writing)': '🎨 Creative work is increasingly valued.',
  'Freelance / own business':   '🚀 Entrepreneur mode on.',
  'Open — just need income':    '🎯 Pragmatic. We can work with that.',

  // ── Salary ───────────────────────────────────────────────────────────────────
  'Under $30k / year':   '📍 Good entry point.',
  '$30k–$50k / year':    '📈 Stable and achievable.',
  '$50k–$70k / year':    '💡 Realistic for most mid-level roles.',
  '$70k–$100k / year':   '💎 Matches experienced candidates.',
  '$100k+ / year':       '🔥 High ceiling — matches well.',

  // ── Remote ───────────────────────────────────────────────────────────────────
  'Yes, I prefer it':         '🌍 Doubles your options immediately.',
  "Yes, open to it":          '📈 Opens up a lot more matches.',
  "Maybe — never tried it":   '💡 You might surprise yourself.',
  'No — need to be on-site':  '👍 Plenty of on-site matches too.',

  // ── Urgency ──────────────────────────────────────────────────────────────────
  '🔴 ASAP — need income now': '⚡ Fast matches prioritized.',
  '🟡 Within 3 months':        '🎯 Good window to find the right fit.',
  '🟢 No rush, just exploring':'🌿 No pressure. Best results come this way.',

  // ── Superpower ───────────────────────────────────────────────────────────────
  'Fix technical problems':         '⚙️ Technical problem-solvers are rare.',
  'Handle difficult customers':     '🤝 Conflict resolution is a premium skill.',
  'Organize & get things on track': '📋 Operational thinkers run the world.',
  'Write, design, or create':       '🎨 Creative output has real market value.',
  'Make sense of data':             '📊 Analytical thinkers are always in demand.',
  'Lead & motivate the team':       '👥 Leadership is the hardest thing to hire for.',
  'Get things done physically':     '🔧 Execution matters more than ideas.',
  'Follow instructions reliably':   '💼 Reliability is underrated.',

  // ── Retraining ───────────────────────────────────────────────────────────────
  "🚀 Yes — already doing it":   '🔥 That mindset separates you from everyone else.',
  '👍 Yes, if it leads to a job': "✅ That's exactly what we're matching for.",
  "🤔 Maybe, if it's quick":      '⏱️ Most in-demand certs take under 3 months.',
  "❌ Prefer my current skills":  '💼 Your existing skills transfer further than you think.',
}

export function getMicroFeedback(value: string): string | null {
  return feedback[value] ?? null
}
