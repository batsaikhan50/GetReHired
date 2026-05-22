export type QuestionType = 'text' | 'single' | 'multi' | 'rating5' | 'dropdown'

export interface Question {
  id: string
  text: string
  subtitle?: string
  type: QuestionType
  options?: string[]
  field: string
}

export interface Block {
  id: number
  questions: Question[]
}

export const industries = [
  'Manufacturing / Factory', 'Customer Service', 'Retail / Sales',
  'Information Technology', 'Healthcare / Medical', 'Finance / Accounting',
  'Education / Teaching', 'Transportation / Delivery', 'Construction / Trades',
  'Food Service / Hospitality', 'Administrative / Office', 'Marketing / Media',
  'Legal / Law', 'Agriculture', 'Arts / Design', 'Engineering',
  'Government / Public Service', 'Non-profit / Social Work', 'Other',
]

export const countries = [
  'Mongolia', 'United States', 'United Kingdom', 'Australia', 'Canada',
  'Germany', 'France', 'Japan', 'South Korea', 'India', 'China',
  'Brazil', 'Mexico', 'South Africa', 'Other',
]

export const blocks: Block[] = [
  // ── Block 1: Identity ───────────────────────────────────────────────────────
  {
    id: 1,
    questions: [
      {
        id: 'firstName', text: "What's your first name?",
        subtitle: "We'll use this to personalize your results.",
        type: 'text', field: 'firstName',
      },
      {
        id: 'age', text: 'How old are you?',
        type: 'single', field: 'age',
        options: ['Under 20', '20–25', '26–30', '31–35', '36–40', '41–45', '46–50', '51–55', '55+'],
      },
      {
        id: 'country', text: 'Which country are you in?',
        type: 'dropdown', field: 'country', options: countries,
      },
    ],
  },

  // ── Block 2: Your Work ──────────────────────────────────────────────────────
  {
    id: 2,
    questions: [
      {
        id: 'jobTitle',
        text: 'What was your most recent job title?',
        subtitle: "E.g. 'cashier', 'warehouse worker', 'site manager'. Be specific.",
        type: 'text', field: 'jobTitle',
      },
      {
        id: 'industry', text: 'Which industry?',
        type: 'dropdown', field: 'industry', options: industries,
      },
      {
        id: 'experience', text: 'Total years of work experience?',
        type: 'single', field: 'experience',
        options: ['Under 1 year', '1–2 years', '3–5 years', '6–10 years', '10+ years'],
      },
      {
        id: 'dailyTasks',
        text: 'What did you actually do most of the time?',
        subtitle: 'Regular tasks only — not things you did once or twice.',
        type: 'multi', field: 'dailyTasks',
        options: [
          '👥 Managed people or a team',
          '🎧 Customer service & complaints',
          '📋 Paperwork & data entry',
          '🔧 Fixed or operated machinery',
          '📊 Analyzed data & reports',
          '⌨️ Wrote reports & documents',
          '🎨 Created designs or visual content',
          '🤝 Sold products or services',
          '📅 Planned & coordinated projects',
          '🎓 Trained or taught others',
          '🚚 Drove or delivered goods',
          '🔍 Inspected & quality-checked work',
          '💼 Negotiated with clients or vendors',
          '🔨 Built or assembled things',
          '🔬 Researched & gathered info',
          '💰 Handled money & finances',
          '💻 Coded or developed software',
        ],
      },
    ],
  },

  // ── Block 3: Skills & Tools ─────────────────────────────────────────────────
  {
    id: 3,
    questions: [
      {
        id: 'skills',
        text: 'What can you do without being trained?',
        subtitle: 'Only pick what you could do confidently from day 1.',
        type: 'multi', field: 'skills',
        options: [
          '👥 Managing people',
          '🎧 Customer service',
          '📋 Data entry & records',
          '⚙️ Operating machinery',
          '📊 Excel & spreadsheets',
          '📈 Data analysis & reports',
          '✍️ Clear writing',
          '🎨 Graphic design',
          '🖥️ CRM software',
          '🚗 Licensed driving',
          '🏥 Medical procedures',
          '🎓 Teaching & training',
          '💻 Programming & coding',
          '🤝 Sales & persuasion',
          '💪 Physical labor',
          '💰 Budgeting & finance',
          '📅 Logistics & scheduling',
          '📱 Social media',
          '⚖️ Legal & compliance',
          '🧩 Problem-solving',
        ],
      },
      {
        id: 'tools',
        text: 'Which tools have you used at work?',
        subtitle: 'Only select tools you have real experience with.',
        type: 'multi', field: 'tools',
        options: [
          '📄 Microsoft Office',
          '☁️ Google Workspace',
          '🔗 CRM software (Salesforce, HubSpot)',
          '🧾 Accounting software (QuickBooks, SAP)',
          '🎨 Design tools (Canva, Figma, Photoshop)',
          '📦 Warehouse / inventory systems',
          '🖥️ POS / cash register',
          '🏭 Industrial machinery',
          '🏥 Medical equipment',
          '📋 Project mgmt tools (Trello, Asana)',
          '🏗️ Construction tools & machinery',
          '🎬 Video / audio editing',
          '💻 Code editors (VS Code, GitHub)',
          '📱 Social media platforms',
          '⚙️ ERP systems (SAP, Oracle)',
        ],
      },
    ],
  },

  // ── Block 4: What You Want ──────────────────────────────────────────────────
  {
    id: 4,
    questions: [
      {
        id: 'jobType',
        text: 'What kind of work are you looking for?',
        type: 'single', field: 'jobType',
        options: [
          'Stable office job',
          'Remote / work from home',
          'Physical, hands-on work',
          'People-facing role',
          'Technical / analytical',
          'Creative (design, writing)',
          'Freelance / own business',
          'Open — just need income',
        ],
      },
      {
        id: 'salaryExpect',
        text: 'What salary are you targeting?',
        subtitle: 'Select all ranges you\'d accept.',
        type: 'multi', field: 'salaryExpect',
        options: [
          'Under $30k / year',
          '$30k–$50k / year',
          '$50k–$70k / year',
          '$70k–$100k / year',
          '$100k+ / year',
        ],
      },
      {
        id: 'remoteOpen', text: 'Open to remote work?',
        type: 'single', field: 'remoteOpen',
        options: [
          'Yes, I prefer it',
          "Yes, open to it",
          "Maybe — never tried it",
          'No — need to be on-site',
        ],
      },
      {
        id: 'urgency', text: 'How soon do you need to start?',
        type: 'single', field: 'urgency',
        options: [
          '🔴 ASAP — need income now',
          '🟡 Within 3 months',
          '🟢 No rush, just exploring',
        ],
      },
    ],
  },

  // ── Block 5: Your Edge ──────────────────────────────────────────────────────
  {
    id: 5,
    questions: [
      {
        id: 'superpower',
        text: 'What do people at work consistently come to you for?',
        subtitle: 'Pick the one that fits best.',
        type: 'single', field: 'superpower',
        options: [
          'Fix technical problems',
          'Handle difficult customers',
          'Organize & get things on track',
          'Write, design, or create',
          'Make sense of data',
          'Lead & motivate the team',
          'Get things done physically',
          'Follow instructions reliably',
          'Build & ship software',
        ],
      },
      {
        id: 'education', text: 'Highest level of education?',
        type: 'single', field: 'education',
        options: [
          'High School', 'Vocational / Trade School', 'Some College',
          "Bachelor's Degree", "Master's Degree", 'PhD / Doctorate',
          'Self-taught / No formal degree',
        ],
      },
      {
        id: 'retraining',
        text: 'Willing to do a short course to get a better job?',
        subtitle: 'Most in-demand certs take 1–3 months online.',
        type: 'single', field: 'retraining',
        options: [
          "🚀 Yes — already doing it",
          '👍 Yes, if it leads to a job',
          "🤔 Maybe, if it's quick",
          "❌ Prefer my current skills",
        ],
      },
    ],
  },
]

export const totalQuestions = blocks.reduce((sum, b) => sum + b.questions.length, 0)
