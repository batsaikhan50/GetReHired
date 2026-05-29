type Answers = Record<string, string | string[]>

export interface RewardContent {
  emoji: string
  headline: string
  stats: { value: string; label: string }[]
  message: string
  teaser?: string
}

export function getRewardContent(blockId: number, answers: Answers): RewardContent {
  const name       = (answers.firstName as string)    || 'you'
  const dailyTasks = (answers.dailyTasks as string[]) || []
  const skills     = (answers.skills    as string[]) || []
  const tools      = (answers.tools     as string[]) || []

  const rewards: Record<number, RewardContent> = {
    // ── After Block 1: Identity ───────────────────────────────────────────────
    1: {
      emoji: '👋',
      headline: `Nice to meet you, ${name}.`,
      stats: [
        { value: '1/5',   label: 'blocks done' },
        { value: '~3',    label: 'min left' },
        { value: '100%',  label: 'free' },
      ],
      message: `You're off to a great start. Next we'll look at your work history — the more specific you are, the better your matches.`,
      teaser: 'Next: your work history...',
    },

    // ── After Block 2: Work History ───────────────────────────────────────────
    2: {
      emoji: '💼',
      headline: `Work history locked in.`,
      stats: [
        { value: `${dailyTasks.length || 0}`, label: 'tasks mapped' },
        { value: '2/5',                       label: 'blocks done' },
        { value: '~2',                         label: 'min left' },
      ],
      message: `${dailyTasks.length > 4 ? 'Strong profile' : 'Good start'} — ${dailyTasks.length} daily tasks identified. Next we'll confirm what you can do from day one.`,
      teaser: 'Next: your skills & tools...',
    },

    // ── After Block 3: Skills & Tools ─────────────────────────────────────────
    3: {
      emoji: '💡',
      headline: `${name}, your skills are more portable than you think.`,
      stats: [
        { value: `${dailyTasks.length || 0}`, label: 'tasks from your job' },
        { value: `${skills.length || 0}`,     label: 'skills confirmed' },
        { value: `${tools.length || 0}`,      label: 'tools you know' },
      ],
      message: `We've mapped what you actually do and know. Most of it transfers directly — employers in other industries are actively looking for people with your exact background.`,
      teaser: 'Next: what you want in your next role...',
    },

    // ── After Block 4: Preferences ────────────────────────────────────────────
    4: {
      emoji: '🎯',
      headline: `Almost there — one block left.`,
      stats: [
        { value: '4/5',  label: 'blocks done' },
        { value: '< 1',  label: 'min left' },
        { value: '30',   label: 'careers to score' },
      ],
      message: `Your work preferences are set. Last block: your edge and what makes you stand out. This is what separates a 60% match from a 90% match.`,
      teaser: 'Next: your edge...',
    },

    // ── After Block 5: Final ──────────────────────────────────────────────────
    5: {
      emoji: '🎉',
      headline: '✨ Profile complete.',
      stats: [
        { value: String(dailyTasks.length + skills.length + tools.length), label: 'data points collected' },
        { value: '30',   label: 'career paths scored' },
        { value: 'Now',  label: 'matches ready' },
      ],
      message: `Every match was calculated from your actual work history — your tasks, your skills, your tools. This is not a generic result. It is built specifically for you, ${name}.`,
    },
  }

  return rewards[blockId] || rewards[5]
}
