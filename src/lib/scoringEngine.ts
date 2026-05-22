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
