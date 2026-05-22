import { createTranslator, Lang } from './translations'

type Answers = Record<string, string | string[]>

export interface CareerMatch {
  title: string
  emoji: string
  score: number
  reasons: string[]
  skills: string[]
  salaryRange: string
  timeToHire: string
  field: string
  interviewQuestions: string[]
  retrainingRoadmap: { skill: string; url: string; platform: string }[]
}

// ─── Career profiles ──────────────────────────────────────────────────────────
// Each profile describes what the job ACTUALLY requires, using the same
// concrete options that appear in the assessment questions.
// Scoring is purely overlap-based — no hardcoded personality weights.

interface CareerProfile {
  title: string
  emoji: string
  field: string
  salaryMin: number
  salaryMax: number
  timeToHire: string
  // What tasks the role requires (from dailyTasks options)
  tasks: string[]
  // What skills the role needs (from skills options)
  skills: string[]
  // What tools the role uses (from tools options)
  tools: string[]
  // Superpower signals that strongly fit this role
  superpowers: string[]
  // Job type preferences that align
  preferredJobTypes: string[]
  // Industries where this role is common
  industries: string[]
  // Static fallback reasons (used if no dynamic reasons can be generated)
  staticReasons: string[]
  // What to learn next
  skillsNeeded: string[]
  // 5 common interview questions for this role
  interviewQuestions: string[]
  // Free learning resources mapped to skill gaps
  retrainingRoadmap: { skill: string; url: string; platform: string }[]
}

const careerProfiles: CareerProfile[] = [
  {
    title: 'Project Manager',
    emoji: '📋', field: 'Management',
    salaryMin: 45000, salaryMax: 90000, timeToHire: '1–3 months',
    tasks: [
      '👥 Managed people or a team',
      '📅 Planned & coordinated projects',
      '⌨️ Wrote reports & documents',
      '💼 Negotiated with clients or vendors',
      '💰 Handled money & finances',
    ],
    skills: [
      '👥 Managing people',
      '✍️ Clear writing',
      '🧩 Problem-solving',
      '📅 Logistics & scheduling',
    ],
    tools: [
      '📋 Project mgmt tools (Trello, Asana)',
      '📄 Microsoft Office',
      '☁️ Google Workspace',
    ],
    superpowers: [
      'Organize & get things on track',
      'Lead & motivate the team',
    ],
    preferredJobTypes: [
      'Stable office job',
      'Remote / work from home',
    ],
    industries: ['Manufacturing / Factory', 'Information Technology', 'Engineering', 'Construction / Trades', 'Administrative / Office'],
    staticReasons: [
      'Cross-industry demand — every company needs project managers',
      'Leadership experience is the hardest thing to replace',
      'Average salary climbs fast with each year of experience',
    ],
    skillsNeeded: ['PMP basics or CAPM cert', 'Stakeholder communication', 'Risk management'],
    interviewQuestions: [
      'Tell me about a project that went off track — how did you recover it?',
      'How do you prioritize tasks when everything feels urgent?',
      'Describe how you handle conflict between team members.',
      'How do you manage stakeholder expectations when scope changes?',
      'Walk me through how you track progress and report to leadership.',
    ],
    retrainingRoadmap: [
      { skill: 'Project management fundamentals', url: 'https://grow.google/certificates/project-management/', platform: 'Google' },
      { skill: 'Agile & Scrum basics', url: 'https://www.coursera.org/learn/agile-development-and-scrum', platform: 'Coursera' },
      { skill: 'Risk management', url: 'https://www.youtube.com/watch?v=RKh7oRahEok', platform: 'YouTube' },
    ],
  },

  {
    title: 'Data Analyst',
    emoji: '📊', field: 'Technology',
    salaryMin: 50000, salaryMax: 95000, timeToHire: '1–3 months',
    tasks: [
      '📊 Analyzed data & reports',
      '⌨️ Wrote reports & documents',
      '🔬 Researched & gathered info',
      '📋 Paperwork & data entry',
    ],
    skills: [
      '📊 Excel & spreadsheets',
      '📈 Data analysis & reports',
      '✍️ Clear writing',
      '💻 Programming & coding',
    ],
    tools: [
      '📄 Microsoft Office',
      '☁️ Google Workspace',
      '💻 Code editors (VS Code, GitHub)',
      '⚙️ ERP systems (SAP, Oracle)',
    ],
    superpowers: [
      'Make sense of data',
      'Fix technical problems',
    ],
    preferredJobTypes: [
      'Technical / analytical',
      'Remote / work from home',
    ],
    industries: ['Finance / Accounting', 'Information Technology', 'Healthcare / Medical', 'Marketing / Media', 'Engineering'],
    staticReasons: [
      'One of the fastest-growing roles worldwide',
      'AI tools are built by analysts — not replaced by them',
      'Your background makes your findings credible to operations teams',
    ],
    skillsNeeded: ['SQL basics', 'Power BI or Tableau', 'Statistical thinking'],
    interviewQuestions: [
      'Walk me through how you used data to solve a real business problem.',
      'How do you handle missing or messy data in your analysis?',
      'How do you explain a complex finding to a non-technical audience?',
      'What is your process for validating your results before presenting?',
      'Which tools do you use for data visualization and why?',
    ],
    retrainingRoadmap: [
      { skill: 'SQL', url: 'https://www.kaggle.com/learn/intro-to-sql', platform: 'Kaggle' },
      { skill: 'Power BI', url: 'https://learn.microsoft.com/en-us/training/powerbi/', platform: 'Microsoft' },
      { skill: 'Data analysis with Python', url: 'https://www.kaggle.com/learn/pandas', platform: 'Kaggle' },
    ],
  },

  {
    title: 'Customer Success Manager',
    emoji: '🌟', field: 'Customer Relations',
    salaryMin: 40000, salaryMax: 75000, timeToHire: '2–4 weeks',
    tasks: [
      '🎧 Customer service & complaints',
      '⌨️ Wrote reports & documents',
      '🤝 Sold products or services',
      '🎓 Trained or taught others',
      '💼 Negotiated with clients or vendors',
    ],
    skills: [
      '🎧 Customer service',
      '🖥️ CRM software',
      '🤝 Sales & persuasion',
      '✍️ Clear writing',
    ],
    tools: [
      '🔗 CRM software (Salesforce, HubSpot)',
      '☁️ Google Workspace',
      '📄 Microsoft Office',
    ],
    superpowers: [
      'Handle difficult customers',
      'Organize & get things on track',
    ],
    preferredJobTypes: [
      'People-facing role',
      'Remote / work from home',
    ],
    industries: ['Customer Service', 'Information Technology', 'Retail / Sales', 'Administrative / Office'],
    staticReasons: [
      'Tech companies are hiring CSMs faster than any other role',
      'Your customer-facing experience is exactly what they want',
      'Clear progression path to Account Manager or VP of Customer Success',
    ],
    skillsNeeded: ['CRM tools (HubSpot free cert)', 'Churn prevention basics', 'Account health tracking'],
    interviewQuestions: [
      'How do you handle a customer who is about to cancel?',
      'Describe a time you turned a frustrated customer into a loyal one.',
      'How do you manage 30+ accounts without dropping the ball on any?',
      'What metrics do you use to measure customer health?',
      'Tell me about a time you spotted a problem before the customer did.',
    ],
    retrainingRoadmap: [
      { skill: 'HubSpot CRM', url: 'https://academy.hubspot.com/courses/hubspot-crm-training', platform: 'HubSpot' },
      { skill: 'Customer success fundamentals', url: 'https://www.coursera.org/learn/customer-experiences-with-contact-center-ai-designing', platform: 'Coursera' },
      { skill: 'Customer retention strategies', url: 'https://www.youtube.com/watch?v=UCFDFp5KdMY', platform: 'YouTube' },
    ],
  },

  {
    title: 'Sales Representative',
    emoji: '🤝', field: 'Sales',
    salaryMin: 35000, salaryMax: 85000, timeToHire: '1–3 weeks',
    tasks: [
      '🤝 Sold products or services',
      '🎧 Customer service & complaints',
      '💼 Negotiated with clients or vendors',
      '⌨️ Wrote reports & documents',
    ],
    skills: [
      '🤝 Sales & persuasion',
      '🎧 Customer service',
      '🖥️ CRM software',
      '✍️ Clear writing',
    ],
    tools: [
      '🔗 CRM software (Salesforce, HubSpot)',
      '📄 Microsoft Office',
    ],
    superpowers: [
      'Handle difficult customers',
    ],
    preferredJobTypes: [
      'People-facing role',
      'Freelance / own business',
      'Open — just need income',
    ],
    industries: ['Retail / Sales', 'Customer Service', 'Marketing / Media', 'Food Service / Hospitality'],
    staticReasons: [
      'Fastest hiring cycle of any office role — companies always need salespeople',
      'Commission structures mean your income is controlled by you',
      'Experience in almost any service industry transfers directly',
    ],
    skillsNeeded: ['CRM basics', 'Objection handling', 'Discovery call structure'],
    interviewQuestions: [
      'Walk me through your sales process from first contact to close.',
      'How do you handle rejection and keep your energy up?',
      'Tell me about your biggest deal — how did you close it?',
      'How do you research a prospect before a call?',
      'What do you do when you are behind on your monthly quota?',
    ],
    retrainingRoadmap: [
      { skill: 'Sales fundamentals', url: 'https://academy.hubspot.com/courses/inbound-sales', platform: 'HubSpot' },
      { skill: 'Cold outreach & prospecting', url: 'https://www.coursera.org/learn/sales-training', platform: 'Coursera' },
      { skill: 'Objection handling', url: 'https://www.youtube.com/watch?v=oGRiCkBHLFc', platform: 'YouTube' },
    ],
  },

  {
    title: 'HR Specialist',
    emoji: '👥', field: 'Human Resources',
    salaryMin: 40000, salaryMax: 75000, timeToHire: '1–2 months',
    tasks: [
      '👥 Managed people or a team',
      '🎓 Trained or taught others',
      '⌨️ Wrote reports & documents',
      '📋 Paperwork & data entry',
      '💰 Handled money & finances',
    ],
    skills: [
      '👥 Managing people',
      '🎧 Customer service',
      '✍️ Clear writing',
      '⚖️ Legal & compliance',
      '📋 Data entry & records',
    ],
    tools: [
      '📄 Microsoft Office',
      '☁️ Google Workspace',
    ],
    superpowers: [
      'Handle difficult customers',
      'Lead & motivate the team',
    ],
    preferredJobTypes: [
      'Stable office job',
      'People-facing role',
    ],
    industries: ['Administrative / Office', 'Education / Teaching', 'Healthcare / Medical', 'Government / Public Service', 'Manufacturing / Factory'],
    staticReasons: [
      'Every company with more than 20 employees needs HR',
      'Real-world operational experience makes you better than HR grads',
      'Strong job security — even in recessions, compliance never stops',
    ],
    skillsNeeded: ['Employment law basics', 'SHRM-CP cert path', 'Interviewing techniques'],
    interviewQuestions: [
      'How do you handle a sensitive employee complaint confidentially?',
      'Describe your experience with the full recruitment cycle.',
      'How do you stay current with employment law changes?',
      'Tell me about a time you had to deliver difficult news to an employee.',
      'How do you balance employee advocacy with company policy?',
    ],
    retrainingRoadmap: [
      { skill: 'HR fundamentals', url: 'https://www.coursera.org/learn/human-resources-management-capstone', platform: 'Coursera' },
      { skill: 'Employment law basics', url: 'https://www.youtube.com/watch?v=jqMbQDl3KA8', platform: 'YouTube' },
      { skill: 'SHRM cert prep', url: 'https://www.shrm.org/certification', platform: 'SHRM' },
    ],
  },

  {
    title: 'Content Creator / Copywriter',
    emoji: '✍️', field: 'Media',
    salaryMin: 30000, salaryMax: 70000, timeToHire: '2–6 weeks',
    tasks: [
      '⌨️ Wrote reports & documents',
      '🎨 Created designs or visual content',
      '🔬 Researched & gathered info',
      '🎓 Trained or taught others',
    ],
    skills: [
      '✍️ Clear writing',
      '🎨 Graphic design',
      '📱 Social media',
      '🧩 Problem-solving',
    ],
    tools: [
      '🎨 Design tools (Canva, Figma, Photoshop)',
      '📱 Social media platforms',
      '☁️ Google Workspace',
      '📄 Microsoft Office',
    ],
    superpowers: [
      'Write, design, or create',
    ],
    preferredJobTypes: [
      'Creative (design, writing)',
      'Remote / work from home',
      'Freelance / own business',
    ],
    industries: ['Marketing / Media', 'Education / Teaching', 'Arts / Design', 'Non-profit / Social Work'],
    staticReasons: [
      'Low barrier to entry — a portfolio matters more than a degree',
      'Freelance or full-time — both paths are well-paid',
      'Business writing and communication skills are always in demand',
    ],
    skillsNeeded: ['Copywriting fundamentals', 'SEO basics', 'Building a portfolio'],
    interviewQuestions: [
      'Walk me through your best piece of work — why does it work?',
      'How do you adapt your tone for different brands and audiences?',
      'How do you handle feedback that asks you to change everything?',
      'What is your process for writing under a tight deadline?',
      'How do you approach SEO without making copy sound robotic?',
    ],
    retrainingRoadmap: [
      { skill: 'Copywriting fundamentals', url: 'https://www.coursera.org/learn/copywriting', platform: 'Coursera' },
      { skill: 'SEO writing', url: 'https://www.semrush.com/academy/courses/seo-writing/', platform: 'SEMrush' },
      { skill: 'Portfolio building', url: 'https://www.youtube.com/watch?v=ZJYzDMB4fes', platform: 'YouTube' },
    ],
  },

  {
    title: 'Logistics Coordinator',
    emoji: '🚚', field: 'Operations',
    salaryMin: 38000, salaryMax: 65000, timeToHire: '2–4 weeks',
    tasks: [
      '📅 Planned & coordinated projects',
      '🚚 Drove or delivered goods',
      '🔍 Inspected & quality-checked work',
      '📋 Paperwork & data entry',
      '💼 Negotiated with clients or vendors',
      '🔧 Fixed or operated machinery',
    ],
    skills: [
      '📅 Logistics & scheduling',
      '🚗 Licensed driving',
      '⚙️ Operating machinery',
      '📋 Data entry & records',
      '🧩 Problem-solving',
    ],
    tools: [
      '📦 Warehouse / inventory systems',
      '📄 Microsoft Office',
      '🏭 Industrial machinery',
      '⚙️ ERP systems (SAP, Oracle)',
    ],
    superpowers: [
      'Organize & get things on track',
      'Get things done physically',
    ],
    preferredJobTypes: [
      'Stable office job',
      'Physical, hands-on work',
    ],
    industries: ['Transportation / Delivery', 'Manufacturing / Factory', 'Retail / Sales', 'Construction / Trades'],
    staticReasons: [
      'Global supply chain demand means logistics jobs are never scarce',
      'Your physical work experience is exactly the background they want',
      'Short path from coordinator to operations manager',
    ],
    skillsNeeded: ['Supply chain fundamentals', 'Inventory software', 'Freight and customs basics'],
    interviewQuestions: [
      'Tell me about a logistics crisis you solved under pressure.',
      'How do you manage relationships with unreliable vendors?',
      'Describe how you have optimized a supply chain or delivery route.',
      'How do you prioritize when multiple urgent shipments conflict?',
      'What systems or tools do you use to track inventory in real time?',
    ],
    retrainingRoadmap: [
      { skill: 'Supply chain fundamentals', url: 'https://www.coursera.org/learn/supply-chain-logistics', platform: 'Coursera' },
      { skill: 'Inventory management', url: 'https://www.youtube.com/watch?v=RCTHhwWlGz4', platform: 'YouTube' },
      { skill: 'Freight & customs basics', url: 'https://www.flexport.com/learn/', platform: 'Flexport' },
    ],
  },

  {
    title: 'UX / Product Designer',
    emoji: '🎨', field: 'Design',
    salaryMin: 50000, salaryMax: 100000, timeToHire: '2–4 months',
    tasks: [
      '🎨 Created designs or visual content',
      '🔬 Researched & gathered info',
      '⌨️ Wrote reports & documents',
      '🎧 Customer service & complaints',
    ],
    skills: [
      '🎨 Graphic design',
      '🧩 Problem-solving',
      '✍️ Clear writing',
      '🎧 Customer service',
    ],
    tools: [
      '🎨 Design tools (Canva, Figma, Photoshop)',
      '📋 Project mgmt tools (Trello, Asana)',
    ],
    superpowers: [
      'Write, design, or create',
      'Fix technical problems',
    ],
    preferredJobTypes: [
      'Creative (design, writing)',
      'Remote / work from home',
      'Technical / analytical',
    ],
    industries: ['Information Technology', 'Marketing / Media', 'Arts / Design'],
    staticReasons: [
      'Growing faster than any other tech role right now',
      'Customer empathy from your background is rare in design teams',
      'Remote-first — most UX jobs never require an office',
    ],
    skillsNeeded: ['Figma (free to learn)', 'User research methods', 'Portfolio with 2–3 case studies'],
    interviewQuestions: [
      'Walk me through your design process from brief to final delivery.',
      'How do you handle stakeholder feedback that conflicts with user research?',
      'Show me a project that failed — what did you learn from it?',
      'How do you conduct user research when time and budget are tight?',
      'How do you justify design decisions to people who disagree?',
    ],
    retrainingRoadmap: [
      { skill: 'Figma', url: 'https://www.figma.com/resources/learn-design/', platform: 'Figma' },
      { skill: 'UX research methods', url: 'https://www.coursera.org/learn/ux-research-at-scale', platform: 'Coursera' },
      { skill: 'Building a UX portfolio', url: 'https://www.youtube.com/watch?v=B3hJ_V0ARPE', platform: 'YouTube' },
    ],
  },

  {
    title: 'Operations Analyst',
    emoji: '⚙️', field: 'Operations',
    salaryMin: 45000, salaryMax: 80000, timeToHire: '1–2 months',
    tasks: [
      '📊 Analyzed data & reports',
      '📋 Paperwork & data entry',
      '📅 Planned & coordinated projects',
      '⌨️ Wrote reports & documents',
      '🔍 Inspected & quality-checked work',
    ],
    skills: [
      '📊 Excel & spreadsheets',
      '📈 Data analysis & reports',
      '📅 Logistics & scheduling',
      '🧩 Problem-solving',
      '✍️ Clear writing',
    ],
    tools: [
      '📄 Microsoft Office',
      '⚙️ ERP systems (SAP, Oracle)',
      '📋 Project mgmt tools (Trello, Asana)',
      '📦 Warehouse / inventory systems',
    ],
    superpowers: [
      'Make sense of data',
      'Organize & get things on track',
    ],
    preferredJobTypes: [
      'Stable office job',
      'Technical / analytical',
    ],
    industries: ['Manufacturing / Factory', 'Finance / Accounting', 'Administrative / Office', 'Engineering', 'Transportation / Delivery'],
    staticReasons: [
      'Companies pay well to find inefficiencies — that is exactly this job',
      'Process knowledge from operations roles transfers directly',
      'Stepping stone to operations director within 4–5 years',
    ],
    skillsNeeded: ['Process mapping', 'Excel pivot tables and Power Query', 'Six Sigma Green Belt basics'],
    interviewQuestions: [
      'Describe a process you improved and quantify the impact.',
      'How do you identify inefficiencies in an operation you are new to?',
      'Walk me through how you would investigate a sudden drop in productivity.',
      'How do you get buy-in from teams that are resistant to change?',
      'What data do you typically rely on to support operational decisions?',
    ],
    retrainingRoadmap: [
      { skill: 'Process mapping & improvement', url: 'https://www.coursera.org/learn/process-improvement', platform: 'Coursera' },
      { skill: 'Excel Power Query', url: 'https://www.youtube.com/watch?v=0KetuiZ7_RI', platform: 'YouTube' },
      { skill: 'Six Sigma Green Belt', url: 'https://www.coursera.org/learn/six-sigma-define-measure-advanced', platform: 'Coursera' },
    ],
  },

  {
    title: 'Social Media Manager',
    emoji: '📱', field: 'Marketing',
    salaryMin: 35000, salaryMax: 65000, timeToHire: '2–4 weeks',
    tasks: [
      '🎨 Created designs or visual content',
      '⌨️ Wrote reports & documents',
      '📊 Analyzed data & reports',
      '🎧 Customer service & complaints',
    ],
    skills: [
      '📱 Social media',
      '✍️ Clear writing',
      '🎨 Graphic design',
      '📈 Data analysis & reports',
    ],
    tools: [
      '📱 Social media platforms',
      '🎨 Design tools (Canva, Figma, Photoshop)',
      '☁️ Google Workspace',
    ],
    superpowers: [
      'Write, design, or create',
    ],
    preferredJobTypes: [
      'Creative (design, writing)',
      'Remote / work from home',
      'Freelance / own business',
    ],
    industries: ['Marketing / Media', 'Retail / Sales', 'Arts / Design', 'Food Service / Hospitality'],
    staticReasons: [
      'Every brand needs this — demand only grows',
      'Entry point to a full digital marketing career',
      'Remote-friendly and often freelance-compatible',
    ],
    skillsNeeded: ['Content calendar strategy', 'Meta Business Suite', 'Basic analytics reading'],
    interviewQuestions: [
      'Show me a campaign you are proud of — what were the actual results?',
      'How do you handle a PR crisis unfolding on social media in real time?',
      'How do you stay on top of algorithm changes across platforms?',
      'How do you measure ROI on organic content with no paid budget?',
      'How do you balance brand voice with what is currently trending?',
    ],
    retrainingRoadmap: [
      { skill: 'Social media marketing', url: 'https://www.coursera.org/learn/social-media-marketing', platform: 'Coursera' },
      { skill: 'Meta Business Suite', url: 'https://www.facebook.com/business/help/train', platform: 'Meta' },
      { skill: 'Analytics & reporting', url: 'https://skillshop.google.com/', platform: 'Google' },
    ],
  },

  {
    title: 'Corporate Trainer',
    emoji: '🎓', field: 'Education',
    salaryMin: 40000, salaryMax: 75000, timeToHire: '1–3 months',
    tasks: [
      '🎓 Trained or taught others',
      '⌨️ Wrote reports & documents',
      '🎨 Created designs or visual content',
      '👥 Managed people or a team',
      '📅 Planned & coordinated projects',
    ],
    skills: [
      '🎓 Teaching & training',
      '✍️ Clear writing',
      '👥 Managing people',
      '🧩 Problem-solving',
    ],
    tools: [
      '📄 Microsoft Office',
      '☁️ Google Workspace',
      '📋 Project mgmt tools (Trello, Asana)',
    ],
    superpowers: [
      'Lead & motivate the team',
      'Write, design, or create',
    ],
    preferredJobTypes: [
      'People-facing role',
      'Stable office job',
    ],
    industries: ['Education / Teaching', 'Healthcare / Medical', 'Non-profit / Social Work', 'Government / Public Service', 'Manufacturing / Factory'],
    staticReasons: [
      'Your real-world experience is more valuable than a teaching degree here',
      'Corporate training budgets are growing as AI changes job roles',
      'Industry expertise from your background is the curriculum',
    ],
    skillsNeeded: ['Instructional design basics', 'Learning management systems (LMS)', 'Public speaking'],
    interviewQuestions: [
      'How do you assess what training an organization actually needs?',
      'Describe how you adapt the same content for different learning styles.',
      'How do you measure whether a training session actually changed behaviour?',
      'Tell me about a training that did not go as planned — what happened?',
      'How do you keep participants engaged during a 6-hour session?',
    ],
    retrainingRoadmap: [
      { skill: 'Instructional design', url: 'https://www.coursera.org/learn/instructional-design', platform: 'Coursera' },
      { skill: 'LMS & e-learning tools', url: 'https://www.youtube.com/watch?v=pS2WQKF7mfE', platform: 'YouTube' },
      { skill: 'Public speaking', url: 'https://www.coursera.org/learn/public-speaking', platform: 'Coursera' },
    ],
  },

  {
    title: 'Cybersecurity Analyst',
    emoji: '🔐', field: 'Technology',
    salaryMin: 60000, salaryMax: 110000, timeToHire: '2–4 months',
    tasks: [
      '🔬 Researched & gathered info',
      '🔍 Inspected & quality-checked work',
      '📊 Analyzed data & reports',
      '⌨️ Wrote reports & documents',
    ],
    skills: [
      '💻 Programming & coding',
      '🧩 Problem-solving',
      '📈 Data analysis & reports',
      '⚖️ Legal & compliance',
    ],
    tools: [
      '💻 Code editors (VS Code, GitHub)',
      '⚙️ ERP systems (SAP, Oracle)',
      '📄 Microsoft Office',
    ],
    superpowers: [
      'Fix technical problems',
      'Make sense of data',
    ],
    preferredJobTypes: [
      'Technical / analytical',
      'Remote / work from home',
    ],
    industries: ['Information Technology', 'Finance / Accounting', 'Government / Public Service', 'Healthcare / Medical'],
    staticReasons: [
      'Fastest-growing tech role globally — 3.5M unfilled jobs worldwide',
      'AI cannot replace the human judgment this role requires',
      'CompTIA Security+ cert opens the door with no degree required',
    ],
    skillsNeeded: ['CompTIA Security+ (entry cert)', 'Networking fundamentals', 'TryHackMe or HackTheBox practice'],
    interviewQuestions: [
      'Walk me through how you would respond to a suspected data breach.',
      'How do you stay current with new threats and CVEs?',
      'Explain what a man-in-the-middle attack is to a non-technical executive.',
      'What is your process when conducting a vulnerability assessment?',
      'How do you balance strong security controls with user convenience?',
    ],
    retrainingRoadmap: [
      { skill: 'CompTIA Security+', url: 'https://www.comptia.org/certifications/security', platform: 'CompTIA' },
      { skill: 'Networking fundamentals', url: 'https://www.youtube.com/watch?v=qiQR5rTSshw', platform: 'YouTube' },
      { skill: 'Hands-on practice', url: 'https://tryhackme.com/', platform: 'TryHackMe' },
    ],
  },
  {
    title: 'Software Developer',
    emoji: '💻', field: 'Technology',
    salaryMin: 55000, salaryMax: 130000, timeToHire: '2–6 weeks',
    tasks: [
      '💻 Coded or developed software',
      '🔬 Researched & gathered info',
      '📊 Analyzed data & reports',
      '🔍 Inspected & quality-checked work',
      '⌨️ Wrote reports & documents',
    ],
    skills: [
      '💻 Programming & coding',
      '🧩 Problem-solving',
      '📊 Excel & spreadsheets',
      '📈 Data analysis & reports',
      '🖥️ CRM software',
    ],
    tools: [
      '💻 Code editors (VS Code, GitHub)',
      '☁️ Google Workspace',
      '📋 Project mgmt tools (Trello, Asana)',
      '⚙️ ERP systems (SAP, Oracle)',
    ],
    superpowers: [
      'Fix technical problems',
      'Make sense of data',
      'Build & ship software',
    ],
    preferredJobTypes: [
      'Technical / analytical',
      'Remote / work from home',
    ],
    industries: ['Information Technology', 'Finance / Accounting', 'Engineering', 'Marketing / Media'],
    staticReasons: [
      'Software development remains one of the highest-paid fields globally',
      'Remote-first — most dev jobs never require an office',
      'AI tools assist developers but have not replaced them',
    ],
    skillsNeeded: ['System design basics', 'Cloud fundamentals (AWS free tier)', 'One framework beyond your current stack'],
    interviewQuestions: [
      'Walk me through how you debug a complex issue you have never seen before.',
      'How do you handle a disagreement with a senior developer about architecture?',
      'Describe a project you built — what would you do differently now?',
      'How do you estimate task complexity when requirements are unclear?',
      'How do you keep your skills sharp given how fast the field moves?',
    ],
    retrainingRoadmap: [
      { skill: 'System design', url: 'https://www.youtube.com/watch?v=i53Gi_K3o7I', platform: 'YouTube' },
      { skill: 'AWS Cloud fundamentals', url: 'https://aws.amazon.com/training/learn-about/cloud-essentials/', platform: 'AWS' },
      { skill: 'Full-stack practice', url: 'https://www.theodinproject.com/', platform: 'The Odin Project' },
    ],
  },

  // ── New careers ──────────────────────────────────────────────────────────────

  {
    title: 'Financial Analyst',
    emoji: '💰', field: 'Finance',
    salaryMin: 50000, salaryMax: 90000, timeToHire: '4–8 weeks',
    tasks: [
      '📊 Analyzed data & reports',
      '📋 Paperwork & data entry',
      '⌨️ Wrote reports & documents',
      '💰 Handled money & finances',
      '🔬 Researched & gathered info',
    ],
    skills: [
      '📊 Excel & spreadsheets',
      '📈 Data analysis & reports',
      '💰 Budgeting & finance',
      '✍️ Clear writing',
      '🧩 Problem-solving',
    ],
    tools: [
      '📄 Microsoft Office',
      '🧾 Accounting software (QuickBooks, SAP)',
      '☁️ Google Workspace',
      '⚙️ ERP systems (SAP, Oracle)',
    ],
    superpowers: ['Make sense of data', 'Follow instructions reliably'],
    preferredJobTypes: ['Stable office job', 'Remote / work from home', 'Technical / analytical'],
    industries: ['Finance / Accounting', 'Administrative / Office', 'Government / Public Service'],
    staticReasons: [
      'Strong demand for finance analysts across every industry',
      'Your data background translates directly to financial modeling',
      'Entry-level roles often require only Excel — no degree needed',
    ],
    skillsNeeded: ['Financial modeling in Excel', 'Basic accounting principles', 'Power BI or Tableau basics'],
    interviewQuestions: [
      'How do you ensure accuracy when working with large datasets?',
      'Describe a time you found an error or inconsistency in a report.',
      'How do you prioritize when you have multiple deadlines at once?',
      'What financial metrics do you think are most important to track, and why?',
      'Walk me through how you would build a basic budget forecast.',
    ],
    retrainingRoadmap: [
      { skill: 'Financial modeling', url: 'https://www.coursera.org/learn/wharton-financial-accounting', platform: 'Coursera' },
      { skill: 'Excel for finance', url: 'https://www.youtube.com/watch?v=RdTozKPY_OQ', platform: 'YouTube' },
      { skill: 'Power BI basics', url: 'https://learn.microsoft.com/en-us/training/powerplatform/power-bi', platform: 'Microsoft Learn' },
    ],
  },

  {
    title: 'Healthcare Administrator',
    emoji: '🏥', field: 'Healthcare',
    salaryMin: 40000, salaryMax: 75000, timeToHire: '4–8 weeks',
    tasks: [
      '📋 Paperwork & data entry',
      '👥 Managed people or a team',
      '📅 Planned & coordinated projects',
      '⌨️ Wrote reports & documents',
      '🎧 Customer service & complaints',
    ],
    skills: [
      '👥 Managing people',
      '📋 Data entry & records',
      '✍️ Clear writing',
      '📅 Logistics & scheduling',
      '🧩 Problem-solving',
    ],
    tools: [
      '📄 Microsoft Office',
      '☁️ Google Workspace',
      '🏥 Medical equipment',
    ],
    superpowers: ['Organize & get things on track', 'Follow instructions reliably'],
    preferredJobTypes: ['Stable office job', 'People-facing role'],
    industries: ['Healthcare / Medical', 'Administrative / Office', 'Government / Public Service'],
    staticReasons: [
      'Healthcare admin roles are growing faster than most fields',
      'Non-clinical roles need zero medical training — just strong organisation',
      'Hospitals and clinics constantly need reliable coordinators',
    ],
    skillsNeeded: ['Medical records systems (Epic basics)', 'Healthcare compliance basics', 'Patient scheduling software'],
    interviewQuestions: [
      'How do you handle a situation where a patient is upset about wait times?',
      'Describe how you would manage conflicting appointments on the same day.',
      'What steps would you take to ensure patient data stays confidential?',
      'How do you stay organised when handling multiple administrative tasks?',
      'Have you ever improved a process at work? Walk me through what you changed.',
    ],
    retrainingRoadmap: [
      { skill: 'Healthcare admin basics', url: 'https://www.coursera.org/learn/healthcare-organization-and-management', platform: 'Coursera' },
      { skill: 'Epic EHR overview', url: 'https://www.youtube.com/results?search_query=epic+ehr+tutorial', platform: 'YouTube' },
      { skill: 'HIPAA compliance', url: 'https://www.hhs.gov/hipaa/for-professionals/training/index.html', platform: 'HHS.gov' },
    ],
  },

  {
    title: 'IT Support Specialist',
    emoji: '🖥️', field: 'Technology',
    salaryMin: 35000, salaryMax: 65000, timeToHire: '2–6 weeks',
    tasks: [
      '🔧 Fixed or operated machinery',
      '🎧 Customer service & complaints',
      '🔍 Inspected & quality-checked work',
      '📋 Paperwork & data entry',
    ],
    skills: [
      '🧩 Problem-solving',
      '🎧 Customer service',
      '💻 Programming & coding',
      '📋 Data entry & records',
    ],
    tools: [
      '📄 Microsoft Office',
      '☁️ Google Workspace',
      '💻 Code editors (VS Code, GitHub)',
    ],
    superpowers: ['Fix technical problems', 'Handle difficult customers'],
    preferredJobTypes: ['Stable office job', 'Technical / analytical', 'People-facing role'],
    industries: ['Information Technology', 'Administrative / Office', 'Manufacturing / Factory', 'Customer Service'],
    staticReasons: [
      'IT support is the fastest entry point into the tech industry',
      'CompTIA A+ certification takes 6–8 weeks and triples your salary options',
      'Every company needs IT support — roles exist in every city',
    ],
    skillsNeeded: ['CompTIA A+ fundamentals', 'Windows/macOS troubleshooting', 'Ticketing systems (Jira, Zendesk)'],
    interviewQuestions: [
      'A user says their computer is "slow" — walk me through your troubleshooting steps.',
      'How do you explain a technical problem to someone with no tech background?',
      'Describe a time you solved a problem you had never seen before.',
      'How do you prioritise tickets when everything seems urgent?',
      'What is your process for escalating an issue you cannot solve yourself?',
    ],
    retrainingRoadmap: [
      { skill: 'CompTIA A+ prep', url: 'https://www.professormesser.com/free-a-plus-training/220-1101/220-1101-video/220-1101-training-course/', platform: 'Professor Messer (Free)' },
      { skill: 'IT fundamentals', url: 'https://www.coursera.org/professional-certificates/google-it-support', platform: 'Coursera' },
      { skill: 'Networking basics', url: 'https://www.youtube.com/watch?v=qiQR5rTSshw', platform: 'YouTube' },
    ],
  },

  {
    title: 'Graphic Designer',
    emoji: '🎨', field: 'Creative',
    salaryMin: 35000, salaryMax: 70000, timeToHire: '2–6 weeks',
    tasks: [
      '🎨 Created designs or visual content',
      '⌨️ Wrote reports & documents',
      '🔬 Researched & gathered info',
    ],
    skills: [
      '🎨 Graphic design',
      '✍️ Clear writing',
      '🧩 Problem-solving',
    ],
    tools: [
      '🎨 Design tools (Canva, Figma, Photoshop)',
      '☁️ Google Workspace',
      '📱 Social media platforms',
    ],
    superpowers: ['Write, design, or create'],
    preferredJobTypes: ['Creative (design, writing)', 'Remote / work from home', 'Freelance / own business'],
    industries: ['Arts / Design', 'Marketing / Media', 'Retail / Sales', 'Education / Teaching'],
    staticReasons: [
      'Design skills are transferable to any industry',
      'Freelance graphic design can start earning income within days',
      'Canva and Figma are free to learn — no expensive software needed',
    ],
    skillsNeeded: ['Brand identity design', 'Typography fundamentals', 'Figma UI basics'],
    interviewQuestions: [
      'Walk me through your design process from brief to final file.',
      'How do you handle feedback when a client wants changes you disagree with?',
      'Describe a project where you had to work within tight brand guidelines.',
      'How do you stay current with design trends without just copying them?',
      'What does your portfolio say about you that your CV does not?',
    ],
    retrainingRoadmap: [
      { skill: 'Graphic design fundamentals', url: 'https://www.coursera.org/specializations/graphic-design', platform: 'Coursera' },
      { skill: 'Figma for beginners', url: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8', platform: 'YouTube' },
      { skill: 'Build a portfolio', url: 'https://www.behance.net/', platform: 'Behance' },
    ],
  },

  {
    title: 'Video Editor',
    emoji: '🎬', field: 'Media',
    salaryMin: 35000, salaryMax: 70000, timeToHire: '2–6 weeks',
    tasks: [
      '🎨 Created designs or visual content',
      '🔬 Researched & gathered info',
      '⌨️ Wrote reports & documents',
    ],
    skills: [
      '🎨 Graphic design',
      '✍️ Clear writing',
      '📱 Social media',
      '🧩 Problem-solving',
    ],
    tools: [
      '🎬 Video / audio editing',
      '🎨 Design tools (Canva, Figma, Photoshop)',
      '📱 Social media platforms',
    ],
    superpowers: ['Write, design, or create'],
    preferredJobTypes: ['Creative (design, writing)', 'Remote / work from home', 'Freelance / own business'],
    industries: ['Arts / Design', 'Marketing / Media', 'Education / Teaching', 'Food Service / Hospitality'],
    staticReasons: [
      'Video content demand has exploded — every brand needs editors',
      'Freelance video editing can be done fully remote from anywhere',
      'DaVinci Resolve is free and industry-standard — no barrier to entry',
    ],
    skillsNeeded: ['DaVinci Resolve or Premiere Pro', 'Color grading basics', 'Short-form content editing (Reels/TikTok)'],
    interviewQuestions: [
      'Walk me through how you approach editing a 3-minute brand video.',
      'How do you handle a brief that is vague or incomplete?',
      'What is your process for syncing audio perfectly with video?',
      'Describe a project where you had a very tight deadline. How did you manage?',
      'How do you make sure your edits match the brand tone and not your personal style?',
    ],
    retrainingRoadmap: [
      { skill: 'DaVinci Resolve basics', url: 'https://www.youtube.com/watch?v=63Ln33O4p4c', platform: 'YouTube' },
      { skill: 'Video storytelling', url: 'https://www.coursera.org/learn/video-and-audio-production', platform: 'Coursera' },
      { skill: 'Short-form editing', url: 'https://www.youtube.com/results?search_query=tiktok+reels+editing+tutorial', platform: 'YouTube' },
    ],
  },

  {
    title: 'Supply Chain Analyst',
    emoji: '📦', field: 'Operations',
    salaryMin: 50000, salaryMax: 90000, timeToHire: '4–10 weeks',
    tasks: [
      '📅 Planned & coordinated projects',
      '💼 Negotiated with clients or vendors',
      '📋 Paperwork & data entry',
      '🚚 Drove or delivered goods',
      '📊 Analyzed data & reports',
    ],
    skills: [
      '📅 Logistics & scheduling',
      '🧩 Problem-solving',
      '📊 Excel & spreadsheets',
      '💰 Budgeting & finance',
    ],
    tools: [
      '📦 Warehouse / inventory systems',
      '⚙️ ERP systems (SAP, Oracle)',
      '📄 Microsoft Office',
    ],
    superpowers: ['Organize & get things on track', 'Make sense of data'],
    preferredJobTypes: ['Stable office job', 'Technical / analytical'],
    industries: ['Manufacturing / Factory', 'Transportation / Delivery', 'Retail / Sales', 'Engineering'],
    staticReasons: [
      'Supply chain disruptions have made this one of the hottest fields globally',
      'Logistics and warehouse experience maps directly to this role',
      'SAP experience from any industry gives you a head start',
    ],
    skillsNeeded: ['SAP or Oracle basics', 'Inventory management principles', 'Demand forecasting in Excel'],
    interviewQuestions: [
      'How would you handle a supplier who suddenly cannot deliver on time?',
      'Describe a time you identified an inefficiency in a process and fixed it.',
      'How do you balance cost reduction with keeping supply chain reliable?',
      'Walk me through how you would track and manage inventory levels.',
      'Have you ever had to negotiate with a vendor? What was the outcome?',
    ],
    retrainingRoadmap: [
      { skill: 'Supply chain fundamentals', url: 'https://www.coursera.org/learn/supply-chain-logistics', platform: 'Coursera' },
      { skill: 'SAP basics', url: 'https://open.sap.com/', platform: 'OpenSAP (Free)' },
      { skill: 'Excel for supply chain', url: 'https://www.youtube.com/watch?v=9NUjHBNWe9M', platform: 'YouTube' },
    ],
  },

  {
    title: 'Business Development Manager',
    emoji: '💼', field: 'Sales & Strategy',
    salaryMin: 55000, salaryMax: 100000, timeToHire: '4–10 weeks',
    tasks: [
      '🤝 Sold products or services',
      '💼 Negotiated with clients or vendors',
      '🔬 Researched & gathered info',
      '📅 Planned & coordinated projects',
      '⌨️ Wrote reports & documents',
    ],
    skills: [
      '🤝 Sales & persuasion',
      '✍️ Clear writing',
      '🧩 Problem-solving',
      '👥 Managing people',
    ],
    tools: [
      '🔗 CRM software (Salesforce, HubSpot)',
      '📄 Microsoft Office',
      '☁️ Google Workspace',
    ],
    superpowers: ['Lead & motivate the team', 'Organize & get things on track'],
    preferredJobTypes: ['People-facing role', 'Stable office job', 'Remote / work from home'],
    industries: ['Retail / Sales', 'Information Technology', 'Finance / Accounting', 'Marketing / Media'],
    staticReasons: [
      'Your sales or negotiation background maps perfectly to BD roles',
      'BD managers are the bridge between companies — people skills are the #1 requirement',
      'Commission structures often mean top performers earn 2× their base salary',
    ],
    skillsNeeded: ['Pipeline management in CRM', 'Writing cold outreach that converts', 'B2B deal structuring'],
    interviewQuestions: [
      'How do you identify a potential new business opportunity from scratch?',
      'Walk me through a deal you closed that required multiple stakeholders.',
      'How do you handle a prospect who goes cold after a promising first meeting?',
      'What is your method for qualifying a lead before spending time on it?',
      'How do you manage your pipeline when you have 30+ active prospects?',
    ],
    retrainingRoadmap: [
      { skill: 'B2B sales fundamentals', url: 'https://www.coursera.org/learn/sales-b2b', platform: 'Coursera' },
      { skill: 'HubSpot CRM free', url: 'https://academy.hubspot.com/courses/hubspot-crm-free', platform: 'HubSpot Academy' },
      { skill: 'Cold outreach writing', url: 'https://www.youtube.com/watch?v=6l3O3KSoSMI', platform: 'YouTube' },
    ],
  },

  {
    title: 'Account Manager',
    emoji: '🤝', field: 'Client Relations',
    salaryMin: 45000, salaryMax: 80000, timeToHire: '2–6 weeks',
    tasks: [
      '🎧 Customer service & complaints',
      '🤝 Sold products or services',
      '💼 Negotiated with clients or vendors',
      '📅 Planned & coordinated projects',
    ],
    skills: [
      '🎧 Customer service',
      '🤝 Sales & persuasion',
      '✍️ Clear writing',
      '🖥️ CRM software',
      '🧩 Problem-solving',
    ],
    tools: [
      '🔗 CRM software (Salesforce, HubSpot)',
      '📄 Microsoft Office',
      '☁️ Google Workspace',
    ],
    superpowers: ['Handle difficult customers', 'Organize & get things on track'],
    preferredJobTypes: ['People-facing role', 'Remote / work from home', 'Stable office job'],
    industries: ['Customer Service', 'Retail / Sales', 'Information Technology', 'Finance / Accounting', 'Marketing / Media'],
    staticReasons: [
      'Customer service experience is exactly what account management requires',
      'You already know how to manage difficult relationships — that is the job',
      'Upselling and renewals mean earnings grow with your client portfolio',
    ],
    skillsNeeded: ['Account growth strategies', 'Salesforce or HubSpot basics', 'Upsell and renewal tactics'],
    interviewQuestions: [
      'How do you build a strong relationship with a client who started off difficult?',
      'Describe a time you retained a client who was about to leave.',
      'How do you identify upsell opportunities without being pushy?',
      'What metrics do you track to know if an account is healthy?',
      'How do you manage 20+ client accounts simultaneously without dropping the ball?',
    ],
    retrainingRoadmap: [
      { skill: 'Account management basics', url: 'https://www.linkedin.com/learning/topics/account-management', platform: 'LinkedIn Learning' },
      { skill: 'Salesforce free training', url: 'https://trailhead.salesforce.com/', platform: 'Salesforce Trailhead' },
      { skill: 'Client retention strategies', url: 'https://www.youtube.com/results?search_query=account+management+strategies', platform: 'YouTube' },
    ],
  },

  {
    title: 'E-commerce Specialist',
    emoji: '🛒', field: 'Digital Commerce',
    salaryMin: 40000, salaryMax: 75000, timeToHire: '2–6 weeks',
    tasks: [
      '🤝 Sold products or services',
      '📊 Analyzed data & reports',
      '📋 Paperwork & data entry',
      '🔬 Researched & gathered info',
      '🎨 Created designs or visual content',
    ],
    skills: [
      '🤝 Sales & persuasion',
      '📊 Excel & spreadsheets',
      '📱 Social media',
      '🧩 Problem-solving',
      '📈 Data analysis & reports',
    ],
    tools: [
      '📱 Social media platforms',
      '☁️ Google Workspace',
      '📄 Microsoft Office',
    ],
    superpowers: ['Make sense of data', 'Write, design, or create'],
    preferredJobTypes: ['Remote / work from home', 'Technical / analytical', 'Stable office job'],
    industries: ['Retail / Sales', 'Marketing / Media', 'Administrative / Office'],
    staticReasons: [
      'Retail experience gives you instant credibility for e-commerce roles',
      'Online stores need people who understand how customers actually think',
      'Shopify and WooCommerce skills can be learned in a weekend',
    ],
    skillsNeeded: ['Shopify store management', 'Google Analytics basics', 'Product listing optimisation'],
    interviewQuestions: [
      'How would you diagnose why a product page has high traffic but low conversions?',
      'Describe your approach to writing a product description that actually sells.',
      'How do you use data to decide which products to promote?',
      'Walk me through how you would set up a new product launch online.',
      'How do you handle customer returns and negative reviews professionally?',
    ],
    retrainingRoadmap: [
      { skill: 'Shopify basics', url: 'https://www.shopify.com/learn/courses/dropshipping', platform: 'Shopify Learn (Free)' },
      { skill: 'Google Analytics 4', url: 'https://skillshop.docebosaas.com/learn/courses/14479/google-analytics-certification', platform: 'Google Skillshop' },
      { skill: 'E-commerce fundamentals', url: 'https://www.coursera.org/learn/ecommerce', platform: 'Coursera' },
    ],
  },

  {
    title: 'Instructional Designer',
    emoji: '📚', field: 'Learning & Development',
    salaryMin: 50000, salaryMax: 85000, timeToHire: '4–8 weeks',
    tasks: [
      '🎓 Trained or taught others',
      '🔬 Researched & gathered info',
      '⌨️ Wrote reports & documents',
      '🎨 Created designs or visual content',
      '📅 Planned & coordinated projects',
    ],
    skills: [
      '🎓 Teaching & training',
      '✍️ Clear writing',
      '🧩 Problem-solving',
      '🎨 Graphic design',
    ],
    tools: [
      '📄 Microsoft Office',
      '☁️ Google Workspace',
      '🎬 Video / audio editing',
      '🎨 Design tools (Canva, Figma, Photoshop)',
    ],
    superpowers: ['Write, design, or create', 'Organize & get things on track'],
    preferredJobTypes: ['Remote / work from home', 'Stable office job', 'Creative (design, writing)'],
    industries: ['Education / Teaching', 'Information Technology', 'Non-profit / Social Work', 'Healthcare / Medical'],
    staticReasons: [
      'Teaching experience translates 1:1 to corporate training design',
      'Remote-first role — most instructional designers never go to an office',
      'Companies pay well for people who can turn complex topics into clear courses',
    ],
    skillsNeeded: ['Articulate Storyline or Rise basics', 'Learning management systems (LMS)', 'Storyboarding for e-learning'],
    interviewQuestions: [
      'How do you decide what learning format to use — video, quiz, or reading?',
      'Describe how you would take a dense technical manual and turn it into a 30-min course.',
      'How do you measure whether your training actually changed behaviour?',
      'Tell me about a time a learner found your content confusing — what did you do?',
      'How do you balance subject matter expert input with what learners actually need?',
    ],
    retrainingRoadmap: [
      { skill: 'Instructional design basics', url: 'https://www.coursera.org/learn/instructional-design-foundations', platform: 'Coursera' },
      { skill: 'Articulate Rise free trial', url: 'https://rise.articulate.com/', platform: 'Articulate' },
      { skill: 'E-learning design', url: 'https://www.youtube.com/results?search_query=instructional+design+tutorial', platform: 'YouTube' },
    ],
  },

  {
    title: 'QA Analyst',
    emoji: '🔍', field: 'Quality Assurance',
    salaryMin: 40000, salaryMax: 75000, timeToHire: '2–6 weeks',
    tasks: [
      '🔍 Inspected & quality-checked work',
      '📋 Paperwork & data entry',
      '⌨️ Wrote reports & documents',
      '📊 Analyzed data & reports',
    ],
    skills: [
      '🧩 Problem-solving',
      '📋 Data entry & records',
      '📊 Excel & spreadsheets',
      '✍️ Clear writing',
    ],
    tools: [
      '📄 Microsoft Office',
      '☁️ Google Workspace',
      '💻 Code editors (VS Code, GitHub)',
    ],
    superpowers: ['Fix technical problems', 'Follow instructions reliably', 'Make sense of data'],
    preferredJobTypes: ['Stable office job', 'Remote / work from home', 'Technical / analytical'],
    industries: ['Manufacturing / Factory', 'Information Technology', 'Engineering', 'Healthcare / Medical'],
    staticReasons: [
      'Your eye for detail and inspection experience are exactly what QA needs',
      'Software QA roles need zero prior coding — just structured, logical thinking',
      'QA is the fastest transition from manufacturing quality roles into tech',
    ],
    skillsNeeded: ['Manual test case writing', 'Bug tracking tools (Jira)', 'Basic SQL for data validation'],
    interviewQuestions: [
      'How do you decide what to test first when time is limited?',
      'Describe a bug you found that no one else noticed. How did you catch it?',
      'How do you write a clear bug report that developers actually act on?',
      'What is your approach to testing a feature with very vague requirements?',
      'How do you stay thorough when you have tested the same feature 20 times?',
    ],
    retrainingRoadmap: [
      { skill: 'Software testing basics', url: 'https://www.coursera.org/learn/introduction-software-testing', platform: 'Coursera' },
      { skill: 'Jira for beginners', url: 'https://www.youtube.com/watch?v=nHuhojfjeUY', platform: 'YouTube' },
      { skill: 'SQL basics for QA', url: 'https://sqlzoo.net/', platform: 'SQLZoo (Free)' },
    ],
  },

  {
    title: 'Event Coordinator',
    emoji: '🎪', field: 'Events & Hospitality',
    salaryMin: 35000, salaryMax: 65000, timeToHire: '2–6 weeks',
    tasks: [
      '📅 Planned & coordinated projects',
      '🎧 Customer service & complaints',
      '💼 Negotiated with clients or vendors',
      '👥 Managed people or a team',
      '💰 Handled money & finances',
    ],
    skills: [
      '📅 Logistics & scheduling',
      '🎧 Customer service',
      '🧩 Problem-solving',
      '✍️ Clear writing',
      '👥 Managing people',
    ],
    tools: [
      '📄 Microsoft Office',
      '☁️ Google Workspace',
      '📋 Project mgmt tools (Trello, Asana)',
    ],
    superpowers: ['Organize & get things on track', 'Handle difficult customers'],
    preferredJobTypes: ['People-facing role', 'Stable office job'],
    industries: ['Food Service / Hospitality', 'Arts / Design', 'Non-profit / Social Work', 'Marketing / Media', 'Government / Public Service'],
    staticReasons: [
      'Hospitality and food service experience maps directly to event coordination',
      'Managing chaotic situations under pressure is the core event skill',
      'Vendor negotiation from any industry gives you a major head start',
    ],
    skillsNeeded: ['Event budgeting basics', 'Vendor contract management', 'Event management platforms (Eventbrite)'],
    interviewQuestions: [
      'A key vendor cancels 48 hours before your event — what do you do?',
      'How do you manage a client whose expectations exceed the budget?',
      'Describe how you coordinate multiple vendors for a single event.',
      'What is your system for tracking all event tasks and deadlines?',
      'How do you do a post-event review and what do you look for?',
    ],
    retrainingRoadmap: [
      { skill: 'Event planning basics', url: 'https://www.coursera.org/learn/event-planning', platform: 'Coursera' },
      { skill: 'Eventbrite walkthrough', url: 'https://www.youtube.com/results?search_query=eventbrite+tutorial', platform: 'YouTube' },
      { skill: 'Budget management for events', url: 'https://www.linkedin.com/learning/event-planning-foundations', platform: 'LinkedIn Learning' },
    ],
  },

  {
    title: 'Technical Recruiter',
    emoji: '👤', field: 'Human Resources',
    salaryMin: 45000, salaryMax: 85000, timeToHire: '2–4 weeks',
    tasks: [
      '🔬 Researched & gathered info',
      '🎧 Customer service & complaints',
      '⌨️ Wrote reports & documents',
      '👥 Managed people or a team',
      '💼 Negotiated with clients or vendors',
    ],
    skills: [
      '👥 Managing people',
      '🎧 Customer service',
      '✍️ Clear writing',
      '🤝 Sales & persuasion',
      '🧩 Problem-solving',
    ],
    tools: [
      '🔗 CRM software (Salesforce, HubSpot)',
      '📄 Microsoft Office',
      '☁️ Google Workspace',
    ],
    superpowers: ['Handle difficult customers', 'Lead & motivate the team'],
    preferredJobTypes: ['People-facing role', 'Remote / work from home', 'Stable office job'],
    industries: ['Information Technology', 'Administrative / Office', 'Human Resources', 'Customer Service'],
    staticReasons: [
      'Recruiting is one of the best-paid roles that requires no technical background',
      'Your people skills are the entire job — everything else can be learned',
      'Most tech companies are always hiring recruiters regardless of the economy',
    ],
    skillsNeeded: ['Boolean search for sourcing candidates', 'Applicant tracking systems (Greenhouse, Lever)', 'Tech stack basics to evaluate candidates'],
    interviewQuestions: [
      'How do you source candidates for a hard-to-fill role when your pipeline is empty?',
      'A strong candidate gets a counter-offer from their current employer — what do you do?',
      'How do you build trust with a hiring manager who is frustrated with the process?',
      'What is your method for qualifying a candidate in a 20-minute phone screen?',
      'How do you ensure your hiring process does not unintentionally screen out good people?',
    ],
    retrainingRoadmap: [
      { skill: 'Recruiting fundamentals', url: 'https://www.coursera.org/learn/recruiting-hiring-onboarding-employees', platform: 'Coursera' },
      { skill: 'LinkedIn Recruiter basics', url: 'https://www.youtube.com/results?search_query=linkedin+recruiter+tutorial', platform: 'YouTube' },
      { skill: 'Boolean search mastery', url: 'https://booleanblackbelt.com/', platform: 'Boolean Blackbelt (Free)' },
    ],
  },

  {
    title: 'SEO Specialist',
    emoji: '🔎', field: 'Digital Marketing',
    salaryMin: 40000, salaryMax: 75000, timeToHire: '2–6 weeks',
    tasks: [
      '🔬 Researched & gathered info',
      '📊 Analyzed data & reports',
      '⌨️ Wrote reports & documents',
      '🎨 Created designs or visual content',
    ],
    skills: [
      '📈 Data analysis & reports',
      '✍️ Clear writing',
      '📱 Social media',
      '🧩 Problem-solving',
      '📊 Excel & spreadsheets',
    ],
    tools: [
      '📱 Social media platforms',
      '☁️ Google Workspace',
      '📄 Microsoft Office',
    ],
    superpowers: ['Make sense of data', 'Write, design, or create'],
    preferredJobTypes: ['Remote / work from home', 'Technical / analytical', 'Freelance / own business'],
    industries: ['Marketing / Media', 'Information Technology', 'Retail / Sales', 'Administrative / Office'],
    staticReasons: [
      'SEO is entirely learnable online — no degree required, results speak for themselves',
      'Writing and research skills are the foundation of good SEO work',
      'Every website owner needs SEO help — freelance demand is enormous',
    ],
    skillsNeeded: ['Keyword research with free tools', 'Google Search Console', 'On-page SEO and technical audits'],
    interviewQuestions: [
      'How would you approach SEO for a brand new website with zero authority?',
      'A key page drops 40% in traffic overnight — walk me through your diagnosis.',
      'How do you balance what search engines want with what readers actually enjoy?',
      'What free tools do you rely on most and why?',
      'How do you show SEO ROI to a client who does not understand search rankings?',
    ],
    retrainingRoadmap: [
      { skill: 'SEO fundamentals', url: 'https://moz.com/beginners-guide-to-seo', platform: 'Moz (Free)' },
      { skill: 'Google Search Console', url: 'https://skillshop.docebosaas.com/learn', platform: 'Google Skillshop' },
      { skill: 'Keyword research', url: 'https://www.youtube.com/watch?v=OMJQSROfGZI', platform: 'YouTube' },
    ],
  },

  {
    title: 'Real Estate Agent',
    emoji: '🏡', field: 'Real Estate',
    salaryMin: 40000, salaryMax: 90000, timeToHire: '2–4 weeks',
    tasks: [
      '🤝 Sold products or services',
      '🎧 Customer service & complaints',
      '💼 Negotiated with clients or vendors',
      '🔬 Researched & gathered info',
      '📋 Paperwork & data entry',
    ],
    skills: [
      '🤝 Sales & persuasion',
      '🎧 Customer service',
      '✍️ Clear writing',
      '🧩 Problem-solving',
      '📅 Logistics & scheduling',
    ],
    tools: [
      '🔗 CRM software (Salesforce, HubSpot)',
      '📄 Microsoft Office',
      '☁️ Google Workspace',
    ],
    superpowers: ['Handle difficult customers', 'Organize & get things on track'],
    preferredJobTypes: ['People-facing role', 'Freelance / own business', 'Open — just need income'],
    industries: ['Retail / Sales', 'Finance / Accounting', 'Administrative / Office', 'Customer Service'],
    staticReasons: [
      'A real estate licence takes 1–3 months to get and costs under $1,000',
      'Commission model means strong performers can earn $100k+ in year two',
      'Customer service and sales skills are the exact skills top agents have',
    ],
    skillsNeeded: ['Real estate licence exam prep', 'Local market research methods', 'CRM for lead management'],
    interviewQuestions: [
      'How do you build trust with a buyer or seller who is meeting you for the first time?',
      'A deal falls through at the last minute — how do you handle the client?',
      'How do you stay informed about local market conditions and price trends?',
      'What is your strategy for generating leads when you are just starting out?',
      'How do you handle a multiple-offer situation to get the best outcome for your client?',
    ],
    retrainingRoadmap: [
      { skill: 'Real estate licence prep', url: 'https://www.youtube.com/results?search_query=real+estate+license+exam+prep', platform: 'YouTube' },
      { skill: 'Real estate fundamentals', url: 'https://www.coursera.org/learn/real-estate', platform: 'Coursera' },
      { skill: 'Lead gen for agents', url: 'https://www.youtube.com/results?search_query=real+estate+lead+generation', platform: 'YouTube' },
    ],
  },

  {
    title: 'DevOps Engineer',
    emoji: '☁️', field: 'Technology',
    salaryMin: 70000, salaryMax: 130000, timeToHire: '6–12 weeks',
    tasks: [
      '💻 Coded or developed software',
      '🔧 Fixed or operated machinery',
      '🔍 Inspected & quality-checked work',
      '📅 Planned & coordinated projects',
    ],
    skills: [
      '💻 Programming & coding',
      '🧩 Problem-solving',
      '📊 Excel & spreadsheets',
    ],
    tools: [
      '💻 Code editors (VS Code, GitHub)',
      '☁️ Google Workspace',
      '⚙️ ERP systems (SAP, Oracle)',
    ],
    superpowers: ['Build & ship software', 'Fix technical problems'],
    preferredJobTypes: ['Remote / work from home', 'Technical / analytical'],
    industries: ['Information Technology', 'Engineering', 'Finance / Accounting'],
    staticReasons: [
      'DevOps is one of the highest-paid tech roles globally — demand far exceeds supply',
      'Cloud certifications (AWS, Azure) are free to study and widely respected',
      'IT support or coding background gives you a strong foundation to build on',
    ],
    skillsNeeded: ['Linux command line basics', 'Docker and containers intro', 'AWS/Azure free tier fundamentals'],
    interviewQuestions: [
      'Explain the difference between continuous integration and continuous deployment.',
      'Walk me through how you would set up a basic CI/CD pipeline from scratch.',
      'How do you monitor a production system and know when something is wrong?',
      'Describe a time an infrastructure change caused an unexpected outage. What did you learn?',
      'How do you balance moving fast for developers while keeping production stable?',
    ],
    retrainingRoadmap: [
      { skill: 'Linux for beginners', url: 'https://www.coursera.org/learn/linux-fundamentals', platform: 'Coursera' },
      { skill: 'Docker basics', url: 'https://www.youtube.com/watch?v=pTFZFxd5hOI', platform: 'YouTube' },
      { skill: 'AWS Cloud Practitioner', url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/', platform: 'AWS' },
    ],
  },

  {
    title: 'Non-profit Program Coordinator',
    emoji: '❤️', field: 'Non-profit & Social Work',
    salaryMin: 35000, salaryMax: 60000, timeToHire: '4–8 weeks',
    tasks: [
      '📅 Planned & coordinated projects',
      '🎓 Trained or taught others',
      '⌨️ Wrote reports & documents',
      '🔬 Researched & gathered info',
      '💰 Handled money & finances',
      '👥 Managed people or a team',
    ],
    skills: [
      '📅 Logistics & scheduling',
      '✍️ Clear writing',
      '👥 Managing people',
      '🧩 Problem-solving',
      '🎓 Teaching & training',
    ],
    tools: [
      '📄 Microsoft Office',
      '☁️ Google Workspace',
      '📋 Project mgmt tools (Trello, Asana)',
    ],
    superpowers: ['Lead & motivate the team', 'Organize & get things on track'],
    preferredJobTypes: ['People-facing role', 'Stable office job'],
    industries: ['Non-profit / Social Work', 'Government / Public Service', 'Education / Teaching', 'Healthcare / Medical'],
    staticReasons: [
      'Non-profits value mission-driven people over specific industry background',
      'Teaching, coordination, or admin experience maps directly to this role',
      'Grant writing skills can significantly increase your salary in this field',
    ],
    skillsNeeded: ['Grant writing basics', 'Program evaluation methods', 'Volunteer management'],
    interviewQuestions: [
      'Why do you want to work in the non-profit sector specifically?',
      'How do you measure whether a program is actually achieving its goals?',
      'Describe a time you had to do a lot with very limited resources.',
      'How do you motivate volunteers who are unpaid and hard to manage?',
      'Walk me through how you would write a basic grant proposal.',
    ],
    retrainingRoadmap: [
      { skill: 'Non-profit management', url: 'https://www.coursera.org/learn/nonprofitmanagement', platform: 'Coursera' },
      { skill: 'Grant writing basics', url: 'https://www.youtube.com/results?search_query=grant+writing+tutorial', platform: 'YouTube' },
      { skill: 'Program evaluation', url: 'https://www.coursera.org/learn/program-evaluation', platform: 'Coursera' },
    ],
  },
]

// ─── Dynamic reason generator ─────────────────────────────────────────────────
// Reasons are built from the user's actual answers — not static copy.

function buildReasons(
  career: CareerProfile,
  userTasks: string[],
  userSkills: string[],
  userIndustry: string,
  userSuperpower: string,
  t: (k: string) => string,
): string[] {
  const reasons: string[] = []

  const matchedTasks = userTasks.filter((task) => career.tasks.includes(task))
  const matchedSkills = userSkills.filter((s) => career.skills.includes(s))

  if (matchedTasks.length >= 2) {
    reasons.push(t('reason_tasks_many')
      .replace('{n}', String(matchedTasks.length))
      .replace('{t1}', t(matchedTasks[0]))
      .replace('{t2}', t(matchedTasks[1])))
  } else if (matchedTasks.length === 1) {
    reasons.push(t('reason_tasks_one').replace('{t1}', t(matchedTasks[0])))
  }

  if (matchedSkills.length >= 1) {
    reasons.push(t('reason_skill').replace('{s1}', t(matchedSkills[0])))
  }

  if (career.industries.includes(userIndustry)) {
    reasons.push(t('reason_industry').replace('{industry}', t(userIndustry)))
  }

  if (career.superpowers.includes(userSuperpower)) {
    reasons.push(t('reason_superpower').replace('{sp}', t(userSuperpower).replace('To ', '')))
  }

  // Fill with static fallbacks if we don't have 3 dynamic ones
  for (const r of career.staticReasons) {
    if (reasons.length >= 3) break
    reasons.push(t(r))
  }

  return reasons.slice(0, 3)
}

// ─── Salary mid-point lookup ──────────────────────────────────────────────────

const salaryMidpoint: Record<string, number> = {
  'Under $30k / year':    25000,
  '$30k–$50k / year':     40000,
  '$50k–$70k / year':     60000,
  '$70k–$100k / year':    85000,
  '$100k+ / year':       120000,
}

// ─── Hire-speed helper ────────────────────────────────────────────────────────
// Returns estimated max weeks to hire from timeToHire string

function hireWeeks(timeToHire: string): number {
  const m = timeToHire.match(/(\d+)[^\d]+(\d+)?\s*(week|month)/i)
  if (!m) return 8
  const hi   = parseInt(m[2] || m[1])
  const unit = m[3].toLowerCase()
  return unit.startsWith('w') ? hi : hi * 4
}

// ─── Maximum possible raw score ───────────────────────────────────────────────
// tasks 40 + skills 30 + tools 10 + industry 8 + superpower 7 + jobType 3 + salary 5 + urgency 5
const MAX_RAW = 108

// ─── Main scoring function ────────────────────────────────────────────────────

export function calculateMatches(answers: Answers, lang: Lang = 'en'): CareerMatch[] {
  const t = createTranslator(lang)
  const userTasks      = (answers.dailyTasks as string[]) || []
  const userSkills     = (answers.skills     as string[]) || []
  const userTools      = (answers.tools      as string[]) || []
  const userIndustry   = (answers.industry   as string)  || ''
  const userSuperpower = (answers.superpower as string)  || ''
  const userJobType    = (answers.jobType    as string)  || ''
  const userUrgency    = (answers.urgency    as string)  || ''
  const userSalaryRaw  = answers.salaryExpect
  const userSalaries   = Array.isArray(userSalaryRaw) ? userSalaryRaw : (userSalaryRaw ? [userSalaryRaw] : [])
  const userMid        = userSalaries.length > 0
    ? userSalaries.reduce((sum, s) => sum + (salaryMidpoint[s] || 55000), 0) / userSalaries.length
    : 55000

  const isAsap      = userUrgency.includes('ASAP')
  const isWithin3mo = userUrgency.includes('3 months')

  return careerProfiles
    .map((career) => {
      let score = 0

      // ── 1. Task overlap (0–40 pts) ───────────────────────────────────────
      if (career.tasks.length > 0) {
        const matched = userTasks.filter((tk) => career.tasks.includes(tk)).length
        score += (matched / career.tasks.length) * 40
      }

      // ── 2. Skill overlap (0–30 pts) ──────────────────────────────────────
      if (career.skills.length > 0) {
        const matched = userSkills.filter((s) => career.skills.includes(s)).length
        score += (matched / career.skills.length) * 30
      }

      // ── 3. Tool overlap (0–10 pts) ───────────────────────────────────────
      if (career.tools.length > 0) {
        const matched = userTools.filter((tk) => career.tools.includes(tk)).length
        score += (matched / career.tools.length) * 10
      }

      // ── 4. Industry match (0–8 pts) ──────────────────────────────────────
      if (career.industries.includes(userIndustry)) score += 8

      // ── 5. Superpower match (0–7 pts) ────────────────────────────────────
      if (career.superpowers.includes(userSuperpower)) score += 7

      // ── 6. Preferred job type (0–3 pts) ──────────────────────────────────
      if (career.preferredJobTypes.includes(userJobType)) score += 3

      // ── 7. Salary fit (0–5 pts) ──────────────────────────────────────────
      // Full points inside range, partial if within 20% of edges, zero if way off.
      if (userMid >= career.salaryMin && userMid <= career.salaryMax) {
        score += 5
      } else if (userMid >= career.salaryMin * 0.8 && userMid <= career.salaryMax * 1.2) {
        score += 2
      }

      // ── 8. Urgency vs hire speed (0–5 pts, or –5 penalty) ────────────────
      const weeks = hireWeeks(career.timeToHire)
      if (isAsap) {
        if (weeks <= 4)       score += 5
        else if (weeks <= 8)  score += 2
        else                  score -= 5   // slow-hire career is bad fit for ASAP
      } else if (isWithin3mo) {
        if (weeks <= 12) score += 3
      }

      // ── Real % score (floor 10, cap 95) ──────────────────────────────────
      const pct = Math.round(Math.max(10, Math.min(95, (score / MAX_RAW) * 100)))

      // ── Personalised skill gap ────────────────────────────────────────────
      // Show what THIS user is missing for THIS career, not generic bullets.
      const gapSkills = career.skills.filter((s) => !userSkills.includes(s))
      const gapTools  = career.tools.filter((tk) => !userTools.includes(tk))
      const gapItems  = [...gapSkills, ...gapTools].slice(0, 3)
      const skillsOutput = gapItems.length >= 2 ? gapItems.map(t) : career.skillsNeeded.map(t)

      return {
        title:               career.title,
        emoji:               career.emoji,
        score:               pct,
        reasons:             buildReasons(career, userTasks, userSkills, userIndustry, userSuperpower, t),
        skills:              skillsOutput,
        salaryRange:         `$${Math.round(career.salaryMin / 1000)}k–$${Math.round(career.salaryMax / 1000)}k`,
        timeToHire:          career.timeToHire,
        field:               career.field,
        interviewQuestions:  career.interviewQuestions,
        retrainingRoadmap:   career.retrainingRoadmap,
      }
    })
    .sort((a, b) => b.score - a.score)
}
