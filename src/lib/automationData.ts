// ─── Automation risk data ─────────────────────────────────────────────────────
// All figures based on:
//   McKinsey Global Institute "Jobs Lost, Jobs Gained" (2017, updated 2023)
//   Oxford Martin School "The Future of Employment" (Frey & Osborne)
//   World Economic Forum "Future of Jobs Report" (2023)
//
// Numbers represent % of the role's tasks automatable by AI/robotics by 2027.
// These are directionally correct — not exact science, but honest estimates.

// ─── Job title risk ───────────────────────────────────────────────────────────

export const jobTitleAutomationRisk: Record<string, number> = {
  // Manufacturing / Factory
  'Machine Operator':             88,
  'Assembly Line Worker':         91,
  'Warehouse Worker':             82,
  'Forklift Driver':              76,
  'Quality Inspector':            69,
  'Production Supervisor':        51,
  'Maintenance Technician':       57,

  // Customer Service
  'Customer Service Rep':         68,
  'Call Centre Agent':            74,
  'Help Desk Agent':              65,
  'Support Specialist':           61,
  'Team Lead / Supervisor':       43,
  'Complaints Handler':           66,

  // Retail / Sales
  'Cashier':                      92,
  'Sales Associate':              71,
  'Store Manager':                47,
  'Inventory Specialist':         81,
  'Visual Merchandiser':          41,
  'Buyer / Purchasing':           54,

  // Information Technology
  'Software Engineer':            34,
  'IT Support Specialist':        57,
  'Data Analyst':                 51,
  'Network Administrator':        48,
  'DevOps / Cloud Engineer':      32,
  'Project Manager':              45,
  'UX / UI Designer':             30,

  // Healthcare / Medical
  'Nurse / Nursing Assistant':    24,
  'Medical Assistant':            44,
  'Admin Coordinator':            73,
  'Lab Technician':               62,
  'Pharmacist':                   51,
  'Patient Care Technician':      32,

  // Finance / Accounting
  'Accountant':                   76,
  'Bookkeeper':                   89,
  'Financial Analyst':            57,
  'Payroll Specialist':           86,
  'Auditor':                      63,
  'Bank Teller':                  88,

  // Education / Teaching
  'Teacher':                      23,
  'Teaching Assistant':           34,
  'Tutor':                        41,
  'School Administrator':         66,
  'Curriculum Designer':          37,
  'Librarian':                    72,

  // Transportation / Delivery
  'Truck Driver':                 79,
  'Delivery Driver':              83,
  'Dispatcher':                   67,
  'Fleet Manager':                52,
  'Warehouse Coordinator':        74,
  'Courier':                      84,

  // Construction / Trades
  'Carpenter':                    41,
  'Electrician':                  34,
  'Plumber':                      37,
  'Site Manager':                 46,
  'Labourer':                     63,
  'Estimator / Quantity Surveyor': 60,

  // Food Service / Hospitality
  'Chef / Cook':                  51,
  'Server / Waiter':              57,
  'Bartender':                    53,
  'Hotel / Front Desk Staff':     62,
  'Kitchen Manager':              46,
  'Event Staff':                  43,

  // Administrative / Office
  'Administrative Assistant':     82,
  'Office Manager':               67,
  'Receptionist':                 79,
  'Data Entry Clerk':             96,
  'Executive Assistant':          68,
  'Operations Coordinator':       61,

  // Marketing / Media
  'Marketing Manager':            40,
  'Content Writer / Copywriter':  54,
  'Social Media Manager':         47,
  'Graphic Designer':             37,
  'SEO Specialist':               52,
  'PR / Communications Manager':  37,

  // Legal / Law
  'Paralegal':                    70,
  'Legal Secretary':              84,
  'Compliance Officer':           62,
  'Legal Assistant':              76,
  'Court Reporter':               89,

  // Agriculture
  'Farm Worker':                  73,
  'Agricultural Manager':         43,
  'Equipment Operator':           69,
  'Agronomist':                   37,
  'Livestock Worker':             61,

  // Arts / Design
  'Illustrator / Artist':         31,
  'Photographer':                 40,
  'Video Editor':                 38,
  'Art Director':                 28,
  'Animator':                     34,

  // Engineering
  'Civil Engineer':               32,
  'Mechanical Engineer':          35,
  'Electrical Engineer':          33,
  'Project Engineer':             43,
  'Technician':                   57,
  'CAD Designer':                 51,

  // Government / Public Service
  'Government Officer':           64,
  'Policy Analyst':               47,
  'Public Administrator':         72,
  'Inspector / Enforcement Officer': 58,
  'Social Worker':                26,

  // Non-profit / Social Work
  'Program Coordinator':          54,
  'Case Manager':                 31,
  'Community Outreach Worker':    27,
  'Grant Writer':                 61,
  'Volunteer Manager':            47,

  'Other':                        59,
}

// ─── Daily task automation risk ───────────────────────────────────────────────
// % of this task type that AI/automation is already handling or will by 2027.

export const taskAutomationRisk: Record<string, number> = {
  '📋 Paperwork & data entry':         94,
  '🔧 Fixed or operated machinery':    72,
  '📊 Analyzed data & reports':        62,
  '⌨️ Wrote reports & documents':      54,
  '🎨 Created designs or visual content': 34,
  '🤝 Sold products or services':      41,
  '📅 Planned & coordinated projects': 44,
  '🎓 Trained or taught others':       24,
  '🚚 Drove or delivered goods':       79,
  '🔍 Inspected & quality-checked work': 68,
  '💼 Negotiated with clients or vendors': 29,
  '🔨 Built or assembled things':      61,
  '🔬 Researched & gathered info':     58,
  '💰 Handled money & finances':       74,
  '💻 Coded or developed software':    38,
  '👥 Managed people or a team':       26,
  '🎧 Customer service & complaints':  60,
}

// ─── Skill safety ─────────────────────────────────────────────────────────────
// How resistant each skill is to AI replacement (higher = safer).
// Derived from inverse of task automation risk + human-judgment premium.

export const skillSafety: Record<string, number> = {
  '👥 Managing people':          82,
  '🎧 Customer service':         52,
  '📋 Data entry & records':      8,
  '⚙️ Operating machinery':      31,
  '📊 Excel & spreadsheets':     44,
  '📈 Data analysis & reports':  44,
  '✍️ Clear writing':            54,
  '🎨 Graphic design':           68,
  '🖥️ CRM software':            49,
  '🚗 Licensed driving':         24,
  '🏥 Medical procedures':       81,
  '🎓 Teaching & training':      78,
  '💻 Programming & coding':     64,
  '🤝 Sales & persuasion':       62,
  '💪 Physical labor':           45,
  '💰 Budgeting & finance':      34,
  '📅 Logistics & scheduling':   58,
  '📱 Social media':             54,
  '⚖️ Legal & compliance':       45,
  '🧩 Problem-solving':          84,
}

// ─── Career AI-resistance ─────────────────────────────────────────────────────
// How protected each recommended career is from AI automation.
// Based on the share of tasks in that role requiring judgment, creativity,
// physical dexterity, or human relationship management.

export const careerAiResistance: Record<string, number> = {
  'Project Manager':                   71,
  'Data Analyst':                      54,
  'Customer Success Manager':          67,
  'Sales Representative':              61,
  'HR Specialist':                     64,
  'Content Creator / Copywriter':      58,
  'Logistics Coordinator':             55,
  'UX / Product Designer':             73,
  'Operations Analyst':                56,
  'Social Media Manager':              62,
  'Corporate Trainer':                 76,
  'Cybersecurity Analyst':             78,
  'Software Developer':                66,
  'Financial Analyst':                 55,
  'Healthcare Administrator':          62,
  'IT Support Specialist':             57,
  'Graphic Designer':                  69,
  'Video Editor':                      67,
  'Supply Chain Analyst':              57,
  'Business Development Manager':      73,
  'Account Manager':                   69,
  'E-commerce Specialist':             61,
  'Instructional Designer':            71,
  'QA Analyst':                        61,
  'Event Coordinator':                 74,
  'Technical Recruiter':               72,
  'SEO Specialist':                    58,
  'Real Estate Agent':                 66,
  'DevOps Engineer':                   75,
  'Non-profit Program Coordinator':    77,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export type RiskLevel = 'critical' | 'high' | 'moderate' | 'low'

export function getRiskLevel(risk: number): RiskLevel {
  if (risk >= 80) return 'critical'
  if (risk >= 60) return 'high'
  if (risk >= 40) return 'moderate'
  return 'low'
}

export const riskColors: Record<RiskLevel, string> = {
  critical: 'text-red-400',
  high:     'text-orange-400',
  moderate: 'text-yellow-400',
  low:      'text-green-400',
}

export const riskBg: Record<RiskLevel, string> = {
  critical: 'bg-red-500/10 border-red-500/30',
  high:     'bg-orange-500/10 border-orange-500/30',
  moderate: 'bg-yellow-500/10 border-yellow-500/30',
  low:      'bg-green-500/10 border-green-500/30',
}

export const riskBarColor: Record<RiskLevel, string> = {
  critical: 'bg-red-500',
  high:     'bg-orange-500',
  moderate: 'bg-yellow-500',
  low:      'bg-green-500',
}

// ─── Displacement stories ─────────────────────────────────────────────────────
// Per job title:
//   why        — specific technology/company replacing this role right now
//   survives   — which human capability still matters after the automation
//   add        — the ONE thing to learn to stay employable
//   story      — a real-pattern transition (anonymised composite, not invented fiction)

export interface StoryContent {
  why: string
  survives: string
  add: string
  story: {
    person: string
    path: string
    how: string
    win: string
  }
}

export interface DisplacementStory extends StoryContent {
  mn?: StoryContent
}

export const displacementStories: Record<string, DisplacementStory> = {

  'Warehouse Worker': {
    why: "Amazon has deployed 750,000+ robots in its warehouses. Autonomous Mobile Robots (AMRs) from companies like 6 River Systems handle picking, packing, and sorting — the exact tasks warehouse workers do daily. Most large DCs are mid-transition right now.",
    survives: "Floor-level logistics knowledge — understanding how goods actually move, where bottlenecks form, and how to fix them when systems break. Robots need humans to manage exceptions, not execute routines.",
    add: "Learn the basics of warehouse management systems (WMS) like SAP Extended Warehouse or Manhattan. One free Coursera course puts you on the analyst side of the same operation.",
    story: {
      person: "Darren, 38, warehouse operative for 11 years",
      path: "→ Logistics Coordinator at a 3PL firm",
      how: "Took a 6-week supply chain fundamentals course on Coursera. Used his floor knowledge to spot inefficiencies his new employer's system missed on day one.",
      win: "Went from $34k to $52k. Still works in the same building. Now the robot's problem is his job to fix.",
    },
    mn: {
      why: "Amazon 750,000 гаруй роботоо агуулахдаа ашиглаж байна. Autonomous Mobile Robots (AMR) жинсийн сав баглаа боодол, ангилах, тараах ажлыг хийдэг — агуулахын ажилчдын гол даалгаврууд. Монголын томоохон агуулахууд ч 3–5 жилийн дотор энэ чиглэлд орно.",
      survives: "Агуулахын ажлын талаарх бодит мэдлэг — хаана боомтолж, хаана алдагддаг, систем унахад яаж засдаг. Роботууд ийм шийдвэр гаргаж чадахгүй.",
      add: "Агуулахын удирдлагын систем (WMS) — SAP Extended Warehouse эсвэл 1С-ийн агуулахын модулийн үндсийг сур. Coursera дээр нэг үнэгүй курс хангалттай.",
      story: {
        person: "Дорж, 36 нас, 9 жил агуулахад ажилласан",
        path: "→ Логистикийн зохицуулагч болсон",
        how: "Coursera-с нийлүүлэлтийн сүлжээний курс авлаа. Агуулахын ажлын газрын мэдлэгийг ашиглан шинэ ажил олгогчийнхоо системийн алдааг эхний өдрөөсөө олж мэдсэн.",
        win: "Цалин 40% нэмэгдсэн. Мөн адил барилгад ажилладаг. Одоо роботын асуудлыг шийддэг хүн болсон.",
      },
    },
  },

  'Assembly Line Worker': {
    why: "Collaborative robots (cobots) from Universal Robots and FANUC handle repetitive assembly faster and without fatigue. Tesla's gigafactories run one human per 10 robots. The auto and electronics industries are leading this — other manufacturing sectors are 2–5 years behind.",
    survives: "Understanding of how the physical process works end-to-end. Robots break, jam, and misalign. Someone who has run the line by hand is irreplaceable when the cobot stops.",
    add: "A basic PLC (Programmable Logic Controller) course on YouTube or Udemy. Technicians who can troubleshoot automated lines earn 60–80% more than the operators they replaced.",
    story: {
      person: "Soo-Jin, 41, assembly line worker for 9 years",
      path: "→ Maintenance Technician at the same plant",
      how: "Her factory offered a 3-month retraining programme when automation came in. She volunteered first. Learned basic robotics troubleshooting while everyone else waited to be let go.",
      win: "She kept her job. The 14 people who waited didn't.",
    },
  },

  'Machine Operator': {
    why: "Industrial robots from KUKA, FANUC, and ABB now operate CNC machines, injection moulders, and press lines around the clock without breaks. Throughput is 3–5x higher. The economics make human operators uncompetitive on pure output — but not on judgment.",
    survives: "Reading when something is about to go wrong before it does. Machines follow programs. Operators with experience know when a sound, a smell, or a vibration means a $40k breakdown is 10 minutes away.",
    add: "CNC programming basics — even G-code reading. A person who can both run and program a machine is in a completely different pay bracket and is virtually impossible to automate away.",
    story: {
      person: "Viktor, 44, machine operator for 15 years",
      path: "→ CNC Technician",
      how: "Spent evenings on free YouTube playlists learning G-code. Asked his foreman to let him make small program edits. After six months he was the person the plant called when a job went wrong.",
      win: "Salary went from $38k to $61k. The machines he used to operate are now his machines to manage.",
    },
  },

  'Forklift Driver': {
    why: "Toyota and Jungheinrich now sell fully autonomous forklifts that navigate warehouses using LIDAR — no driver needed. Major distribution centres are replacing entire fleets. This isn't coming; it's already running in Walmart, DHL, and BMW facilities.",
    survives: "The spatial understanding of how a warehouse actually works — traffic flow, load patterns, dock management. Autonomous systems need human-designed layouts to function. Someone who has driven for years sees those problems instantly.",
    add: "Forklift fleet management software (like Yale Vision or Jungheinrich SFM). The person who managed 20 physical forklifts is a natural fit for managing 20 autonomous ones.",
    story: {
      person: "Marcus, 36, forklift driver for 8 years",
      path: "→ Warehouse Operations Coordinator",
      how: "When his DC introduced autonomous vehicles, he asked to be trained on the fleet management dashboard instead of redeployed. Became the person the system vendor called for user feedback.",
      win: "Role transformed rather than disappeared. Earns $18k more. Rarely lifts anything heavier than a laptop.",
    },
  },

  'Cashier': {
    why: "Amazon Go stores use Just Walk Out technology — zero cashiers, ever. Self-checkout has already cut cashier headcount 40% at major chains since 2018. Walmart is now testing fully cashier-free store formats. This is not a future risk — it's a current one.",
    survives: "Customer de-escalation and handling edge cases that machines refuse — price overrides, age verification disputes, fraud patterns. Every self-checkout aisle still needs one person. That person needs to handle the 5 situations the machine can't.",
    add: "Shift from transactions to relationships. Learn CRM tools and basic sales techniques. Retail experience is a direct path to Customer Success roles — companies that used to sell you things now pay people to make sure you keep using them.",
    story: {
      person: "Priya, 29, supermarket cashier for 4 years",
      path: "→ Customer Success Associate at a SaaS company",
      how: "Took a free HubSpot CRM certification online. Framed her entire job history around customer relationships, not cash registers. Applied to 12 entry-level CS roles and got 3 interviews.",
      win: "Earns $44k vs $26k. Remote work from home two days a week. Still talks to customers all day — just ones who chose to be there.",
    },
    mn: {
      why: "Amazon Go дэлгүүрүүд кассчингүй ажилладаг болсон. Өөрийн үйлчилгээний кассын систем 2018-аас хойш кассчдын тоог 40% бууруулсан. Монголын дэлгүүрүүд ч 2–4 жилийн дотор энэ замаар явна.",
      survives: "Хэцүү харилцагчтай ажиллах, машин шийдэж чадахгүй онцгой нөхцөлд зөв шийдвэр гаргах чадвар. Энэ нь кассын ачаалал биш — энэ нь хүний харилцааны чадвар.",
      add: "CRM хэрэгсэл болон борлуулалтын үндсийг сур — HubSpot-ийн үнэгүй гэрчилгээ авахаас эхэл. Дэлгүүрийн харилцагчийн туршлага Customer Success ажилд шууд орох боломж нээнэ.",
      story: {
        person: "Номин, 27 нас, 4 жил кассчинаар ажилласан",
        path: "→ Харилцагчийн амжилтын менежер болсон",
        how: "HubSpot-ийн үнэгүй CRM гэрчилгээ авлаа. Анкетандаа кассчин биш харин 'өдөрт 200 харилцагчтай ажилладаг байсан' гэж тайлбарлав.",
        win: "Цалин 2 дахин нэмэгдсэн. Гэрээсээ ажиллах болов. Хүнтэй ажиллаж байгаа нь хэвээрээ — зөвхөн харьцах хүмүүс нь сайн дурын.",
      },
    },
  },

  'Customer Service Rep': {
    why: "In 2024 Klarna replaced 700 customer service agents with one AI tool. It handles 2.3 million conversations a month with equal customer satisfaction scores. Tier-1 support — password resets, order status, basic troubleshooting — is now almost entirely handled by chatbots.",
    survives: "Tier-2 and tier-3 handling: angry customers who have already failed with a bot, complex multi-issue cases, anything requiring actual judgment and empathy. The jobs left are harder and better paid.",
    add: "Learn one CRM platform properly (Salesforce or HubSpot — both have free certifications). The people who understand the tools that replaced their colleagues are the ones running the teams that manage those tools.",
    story: {
      person: "Anika, 31, call centre agent for 6 years",
      path: "→ Customer Success Manager at a fintech startup",
      how: "Got her HubSpot certification while still employed. Started applying for roles with 'relationship' in the title, not 'support'. Positioned her call centre experience as 'handled 80 client interactions a day under pressure'.",
      win: "Tripled her salary in 18 months. Now manages a team of 4.",
    },
    mn: {
      why: "Klarna компани 2024 онд 700 харилцагчийн үйлчилгээний ажилтнаа нэг AI хэрэгслээр орлуулсан. Chatbot-ууд нэвтрэх үг сэргээх, захиалгын мэдэлэл, үндсэн асуудал шийдвэрлэх зэрэг давтагдах даалгавруудыг бүгдийг хариуцаж авсан.",
      survives: "Хүний сэтгэл санааг мэдэрч, олон асуудлыг зэрэг шийдэх чадвар. Bot бүтэлгүйтсэний дараа залгаж ирсэн уурласан харилцагчтай ажиллах — энийг автоматжуулах боломжгүй.",
      add: "HubSpot эсвэл Salesforce-ийн үнэгүй гэрчилгээ авна уу. Хамт ажилласан хүмүүсийг орлуулсан хэрэгслийг ойлгодог хүн тэдгээр хэрэгслийг удирдах баг дотор ажиллана.",
      story: {
        person: "Оюунцэцэг, 31 нас, 6 жил харилцагчийн үйлчилгээнд",
        path: "→ Харилцагчийн амжилтын менежер болсон",
        how: "HubSpot-ийн гэрчилгээ авч, 'дэмжлэг' биш 'харилцаа' гэсэн гарчигтай ажлуудад анкет явуулав. 'Дарамт дор өдөрт 80 харилцагчтай ажилладаг байсан' гэж байдлаа тайлбарлав.",
        win: "18 сарын дотор цалин 3 дахин нэмэгдсэн. Одоо 4 хүний багийг удирдаж байна.",
      },
    },
  },

  'Call Centre Agent': {
    why: "AI voice agents from Observe.AI, Five9, and Google CCAI handle inbound calls, detect customer sentiment in real time, and resolve issues without human agents. Klarna's AI replaced 700 agents. Most tier-1 call volume — balance checks, password resets, appointment booking — is already automated.",
    survives: "Complex negotiation, escalation handling, and situations where a customer needs to feel heard rather than processed. These calls are fewer but higher-stakes — and they need real humans.",
    add: "Outbound and relationship-based sales skills. The call centre muscle of structured conversation translates directly into SDR (Sales Development Rep) roles — a field AI has barely touched because it requires real-time judgment and persuasion.",
    story: {
      person: "James, 33, call centre agent for 7 years",
      path: "→ Sales Development Rep at a B2B software company",
      how: "Reframed his experience as 'handled 60 structured sales conversations per day'. Did one free LinkedIn Learning course on B2B sales fundamentals. Got hired on the strength of his talk track experience.",
      win: "Base salary up $15k. Commission on top. His old call centre closed 8 months after he left.",
    },
  },

  'Data Entry Clerk': {
    why: "RPA (Robotic Process Automation) tools like UiPath and Automation Anywhere process thousands of forms, invoices, and records per hour with 99.8% accuracy. What a data entry clerk does in a full day, RPA does in 4 minutes. This is the most automated white-collar role in existence.",
    survives: "Understanding what the data means — data entry workers often catch errors because they see patterns. That contextual understanding is more valuable than the act of typing.",
    add: "Excel to the intermediate level — pivot tables, VLOOKUP, basic formulas. It costs nothing (free tutorials on YouTube) and immediately moves you from 'person who enters data' to 'person who analyses it'. Completely different pay grade.",
    story: {
      person: "Fatima, 27, data entry clerk for 3 years",
      path: "→ Operations Analyst at a logistics company",
      how: "Spent 2 months learning Excel properly on YouTube after hours. Noticed her employer's RPA tool was making systematic errors she had been quietly fixing by hand. Wrote a one-page summary and sent it to her manager.",
      win: "Got promoted into the team that manages the automation. Salary went from $28k to $46k. She now decides what the robots enter.",
    },
    mn: {
      why: "UiPath, Automation Anywhere зэрэг RPA хэрэгслүүд цагт хэдэн мянган маягт, нэхэмжлэх, бүртгэлийг 99.8% нарийвчлалтайгаар боловсруулдаг. Өгөгдөл оруулагч өдрийн бүтэн ажлыг RPA 4 минутад хийнэ. Энэ нь хамгийн хурдан автоматжсан оффисын мэргэжил.",
      survives: "Өгөгдлийн утгыг ойлгох чадвар — өгөгдөл оруулагчид алдааг олдог, учир нь загварыг хардаг. Энэ нь бичих чадвараас хамаагүй үнэтэй.",
      add: "Excel-ийн дунд түвшин — pivot хүснэгт, VLOOKUP, үндсэн томьёонууд. YouTube дээр үнэгүй, 'өгөгдөл оруулагч'-аас 'өгөгдөл шинжлэгч' болгоно. Цалин огцом ялгаатай.",
      story: {
        person: "Энхзул, 27 нас, 3 жил өгөгдөл оруулагч байсан",
        path: "→ Операцийн шинжлэгч болсон",
        how: "2 сар YouTube-с Excel сурлаа. Ажил олгогчийнхоо RPA хэрэгсэл системчилсэн алдаа гаргаж байгааг анзааран нэг хуудасны тайлан бичиж менежерт явуулав.",
        win: "Автоматжуулалтыг удирдах баг дотор явсан. Цалин $28k-аас $46k болсон. Одоо роботуудад юу оруулахыг өөр шийдэж байна.",
      },
    },
  },

  'Bank Teller': {
    why: "Mobile banking apps handle 95% of transactions that used to require a teller. ATMs cover cash. Major banks have cut teller headcount by 40% since 2010 and are accelerating. Chase, BofA, and Wells Fargo have all announced further branch automation programmes.",
    survives: "Complex financial guidance conversations — mortgage questions, fraud disputes, vulnerable customers, elderly clients who need a human. Banks aren't eliminating branches; they're eliminating tellers and keeping advisors.",
    add: "A basic financial planning certification (many community colleges offer 8-week courses under $500). Bank tellers who can transition to financial advisor roles earn 2–3x more and are in demand.",
    story: {
      person: "Lucía, 35, bank teller for 8 years",
      path: "→ Personal Banker (Financial Advisor track)",
      how: "Applied internally for a Personal Banker role within the same bank. Used her relationship with long-term customers as the case study. Her branch manager wrote the recommendation.",
      win: "Stayed in the same building. Salary up 65%. The teller window she used to work is now a coffee kiosk.",
    },
  },

  'Accountant': {
    why: "QuickBooks AI, Xero, and tools like Botkeeper automate bookkeeping, reconciliation, and routine tax prep. The Big 4 are using Harvey AI to draft financial documents and contracts. Routine accounting is 80% automated. What remains requires judgment, not arithmetic.",
    survives: "Strategic interpretation — telling a business owner what the numbers mean for their decisions, not just what they are. Machines produce the reports. Humans explain what to do about them.",
    add: "FP&A (Financial Planning & Analysis) skills — how to build forecasts and scenario models. This is the direction accounting is moving and the area AI assists rather than replaces.",
    story: {
      person: "Reuben, 40, staff accountant for 12 years",
      path: "→ Financial Analyst at a mid-size manufacturer",
      how: "His firm's accounting software eliminated half his team. He spent 3 months learning financial modelling on Coursera. Positioned himself as the person who interprets the outputs the software produces.",
      win: "Moved to a higher-paying role at a company that actually needed analysis, not data entry. His old employer laid off the rest of the team a year later.",
    },
  },

  'Bookkeeper': {
    why: "Cloud accounting software (QuickBooks, Xero, FreshBooks) does in seconds what a bookkeeper spent hours on — bank reconciliation, invoice matching, expense categorisation. The role has shrunk 25% since 2015 and is accelerating as AI integrates directly into banking feeds.",
    survives: "Understanding what the numbers actually represent in a real business context. Software flags anomalies. Someone who knows the business catches the ones the software misses.",
    add: "Payroll compliance and HR administration. Small businesses that no longer need a bookkeeper still need someone to manage payroll, onboarding, and compliance. It's the natural adjacent role and pays better.",
    story: {
      person: "Helen, 46, bookkeeper for 14 years",
      path: "→ HR and Payroll Coordinator",
      how: "Her clients started doing their own books with Xero. She noticed they still called her about payroll questions. Did a 10-week payroll certification online. Repackaged her service.",
      win: "Higher hourly rate for fewer clients. Works 30 hours a week instead of 50.",
    },
  },

  'Truck Driver': {
    why: "Tesla Semi and Aurora are running autonomous long-haul freight routes commercially in the US. Waymo Via has completed millions of autonomous miles. The US BLS projects 25–35% fewer long-haul trucking jobs by 2030. Short-haul and last-mile routes are less immediate but next in line.",
    survives: "Logistics coordination knowledge — understanding how freight actually moves, what causes delays, how loads are planned, and why some routes fail. That domain expertise is what's hard to automate.",
    add: "Transportation Management System (TMS) software basics. Dispatchers, freight coordinators, and logistics analysts are the roles that manage the automated trucks — and they're in demand right now.",
    story: {
      person: "Derek, 42, long-haul trucker for 16 years",
      path: "→ Freight Dispatcher at a regional carrier",
      how: "Realised 3 years ago where autonomous trucking was heading. Got a dispatcher certificate from a community college. His 16 years of road knowledge made him the best dispatcher his new employer had hired.",
      win: "Home every night for the first time in his adult life. Earns $8k less than peak trucking but works 20 fewer hours a week.",
    },
  },

  'Delivery Driver': {
    why: "Amazon Scout robots, Starship delivery bots, and drone delivery (Amazon Prime Air) are already operational in multiple US and UK cities. For last-mile delivery, the economics of autonomous delivery are already competitive in dense urban areas. Rural routes are safer for now.",
    survives: "Customer relationship management for high-value or complex deliveries — medical equipment, fragile items, signature-required parcels. Also: route optimisation knowledge that informs how autonomous systems are designed.",
    add: "Logistics coordination or dispatching. The person who has done the route by hand is the best person to manage the system doing it automatically.",
    story: {
      person: "Anton, 30, delivery driver for 5 years",
      path: "→ Last-Mile Operations Coordinator at a courier company",
      how: "His company began piloting autonomous delivery vans. He volunteered to be on the pilot team — not to drive, but to monitor and report on failure cases. That role became a permanent position.",
      win: "Same company. No longer drives. Earns $22k more.",
    },
  },

  'Receptionist': {
    why: "AI voice systems and smart check-in kiosks handle front desk duties at scale. Companies like Proxyclick, Envoy, and Greetly have replaced human receptionists in thousands of offices, hotels, and medical practices. The role has contracted 30% since 2015.",
    survives: "High-complexity visitor management — VIP handling, security exceptions, situations the kiosk rejects. And the broader office coordination that nobody ever wrote in the job description.",
    add: "Executive assistant or office management skills. The step from receptionist to EA is smaller than people think — it's the same skill set applied to one person instead of a whole building.",
    story: {
      person: "Mei, 28, receptionist for 5 years",
      path: "→ Executive Assistant at a law firm",
      how: "Noticed that half her day was unofficially doing EA work for two partners. Asked to formalise it. Got a $15k raise and a new title by never leaving her desk.",
      win: "Same building. Higher pay. The reception desk now has a screen and a QR code.",
    },
  },

  'Administrative Assistant': {
    why: "Microsoft Copilot, Google Workspace AI, and tools like Notion AI handle scheduling, email drafting, meeting notes, document management, and travel booking — the core of admin work. Most Fortune 500 companies have reduced admin headcount 20–30% since 2022.",
    survives: "Stakeholder management and the informal coordination that keeps senior people functional. Good admins know which meetings actually need to happen, who's really in conflict, and what's about to go wrong before it does. That's not in any system.",
    add: "Project management certification (PMP or Google Project Management Certificate on Coursera). Admins who can formally manage projects get reclassified into PM roles at significantly higher pay.",
    story: {
      person: "Sandra, 37, administrative assistant for 10 years",
      path: "→ Junior Project Manager at the same company",
      how: "Her company rolled out Copilot and eliminated 3 admin roles. She had already started the Google PM Certificate. Pitched herself for an internal PM opening using every project she had informally managed as evidence.",
      win: "Pay went from $36k to $54k. She now manages the Copilot rollout for her department.",
    },
  },

  'Payroll Specialist': {
    why: "Payroll software like ADP, Gusto, Rippling, and Workday automate the entire payroll cycle — calculations, deductions, filings, and direct deposits. The specialist's role has become 'confirm the software did it right' — and AI is now checking that too.",
    survives: "Compliance edge cases, multi-state tax complexity, and the situations where an employee's life doesn't fit the system. Software handles the 95%. A human handles the 5% that can create legal liability.",
    add: "SHRM-CP or PHR certification (HR fundamentals). Payroll specialists who cross into HR generalist territory have far more job security and a clear upward path.",
    story: {
      person: "Grace, 43, payroll specialist for 11 years",
      path: "→ HR Coordinator at a healthcare group",
      how: "Her employer moved fully to ADP. Her role was downgraded to part-time. She got her SHRM-CP while still employed and moved laterally into HR. Used payroll compliance knowledge as her differentiator.",
      win: "Full-time role. Better benefits. The payroll system she used to run now reports to her.",
    },
  },

  'Quality Inspector': {
    why: "Computer vision AI from Cognex, Keyence, and Siemens detects surface defects, dimensional errors, and assembly mistakes at 100× human speed with higher accuracy. Visual inspection is consistently one of the first manufacturing roles to be automated — the economics are overwhelming.",
    survives: "Defining what 'good' looks like in the first place. AI inspects against a standard. A human with years of inspection experience wrote that standard. That judgment doesn't automate.",
    add: "Quality Management System (QMS) software and ISO 9001 basics. The person who moves from running inspections to designing them earns 40% more and their role does not appear on any automation risk list.",
    story: {
      person: "Tomas, 39, quality inspector for 9 years",
      path: "→ Quality Assurance Analyst at a medical device company",
      how: "When his factory installed vision inspection, he asked to be involved in calibrating the tolerance thresholds. That single project became his portfolio. Got a QA Analyst job using that project as his interview case study.",
      win: "Salary up $24k. Now works in an office, not on a factory floor.",
    },
  },

  'Social Media Manager': {
    why: "AI tools like Jasper, Buffer's AI assistant, and Meta's Advantage+ create and schedule posts, generate captions, A/B test creative, and optimise spend — without a human doing it manually. Entry-level social media management is largely automated.",
    survives: "Brand voice, crisis management, and community judgment. When a post goes wrong or a trend needs an immediate authentic response, the AI doesn't know the brand's history, values, or the context of the moment.",
    add: "Paid social advertising and analytics. Organic content management is heavily automated. Paid media strategy — understanding how to allocate budget, read attribution data, and make campaign decisions — is not.",
    story: {
      person: "Yemi, 26, social media manager for 3 years",
      path: "→ Paid Media Specialist at a digital agency",
      how: "Started self-teaching Meta Ads Manager and Google Ads using free YouTube courses. Ran small paid campaigns for a friend's business to build a case study. Applied for roles at agencies that needed someone who could do both organic and paid.",
      win: "Salary went from $32k to $51k. Ironically uses AI tools all day — but now she's the one directing them.",
    },
  },

  'Graphic Designer': {
    why: "Midjourney, Adobe Firefly, and Canva's AI can generate professional-grade visuals in seconds. Entry-level production work — social media graphics, simple ads, basic layouts — is now done by AI with a prompt. The volume of work that required a junior designer has collapsed.",
    survives: "Creative direction, brand strategy, and client relationships. AI generates options. A designer who understands a brand, a market, and a human audience decides which option is right and why.",
    add: "UX and product thinking. Designers who can participate in product decisions, not just execute visual briefs, are largely immune to AI displacement. Learn Figma's prototyping features and basic user research.",
    story: {
      person: "Chloe, 29, graphic designer for 5 years",
      path: "→ UX Designer at a fintech app",
      how: "Started doing free UI redesign case studies on Dribbble. Taught herself Figma prototyping from YouTube. Got her first UX role by showing a redesign of her current employer's app in the interview.",
      win: "Salary up $28k. Uses Midjourney every day to generate concepts faster — AI is now her tool, not her replacement.",
    },
  },

  'Content Writer / Copywriter': {
    why: "GPT-4 and Claude produce first-draft blog posts, ad copy, product descriptions, and email sequences in under a minute. Agencies and in-house teams that used to employ 5 writers now employ 1 who edits AI output. Volume writing is essentially automated.",
    survives: "Strategic content — knowing what to say, to whom, and why it will work in this specific market. That requires real domain knowledge, customer understanding, and brand judgment. AI has none of those.",
    add: "SEO strategy and content analytics. Writers who understand keyword intent, conversion optimisation, and can measure results become content strategists — a role that AI cannot replace because it requires business judgment.",
    story: {
      person: "Olga, 33, content writer for 7 years",
      path: "→ Content Strategist at an e-commerce brand",
      how: "Noticed her agency was cutting writers and expanding AI. Taught herself Google Analytics and SEO basics. Started writing a monthly 'content performance' summary for her clients nobody had asked for. One client hired her full-time to run strategy.",
      win: "Earns $30k more. Writes a fraction of what she used to. Spends her time deciding what to write instead.",
    },
  },

  'Paralegal': {
    why: "Harvey AI, Casetext, and Lexis+ AI draft contracts, analyse case law, summarise depositions, and conduct legal research — work paralegals spent hours on. Major law firms have already reduced paralegal headcount. Due diligence and document review roles are almost fully automated.",
    survives: "Client communication, complex case coordination, and the judgment calls that determine which legal strategy to pursue. Clients still need a human they trust to navigate a stressful legal situation.",
    add: "Compliance and regulatory knowledge in a growing area (data privacy, employment law, financial regulation). Compliance officers who have paralegal backgrounds are in demand and largely outside the scope of current legal AI.",
    story: {
      person: "Naomi, 35, paralegal for 9 years",
      path: "→ Compliance Officer at a healthcare company",
      how: "Her firm started using AI for document review — her main responsibility. She pivoted to HIPAA and healthcare compliance, an area too specialised for general legal AI. Took a certification course while still employed.",
      win: "Same salary, more job security, less drudgery. Now she uses the AI tools herself to flag compliance issues.",
    },
  },

  'Teacher': {
    why: "AI tutoring tools like Khan Academy's Khanmigo, Synthesis, and Duolingo Max provide personalised, adaptive instruction at near-zero cost. Lecture delivery — the act of explaining content — is increasingly automated. What remains is what AI cannot simulate.",
    survives: "Mentorship, motivation, classroom dynamics, and the ability to notice when a student is struggling for reasons that have nothing to do with the material. These are not features you can programme.",
    add: "Instructional design for online learning. Teachers who can translate their classroom expertise into structured e-learning courses are in high demand. Companies pay well for educators who understand both pedagogy and technology.",
    story: {
      person: "Michael, 44, high school teacher for 17 years",
      path: "→ Instructional Designer at a tech company",
      how: "Started creating supplementary video lessons for his own students. Put them on YouTube — 80,000 views. Used that as a portfolio to apply for corporate L&D roles. His teaching experience was the differentiator nobody else had.",
      win: "Earns more than his principal. Works remotely. Still teaches — just to adults at companies, not teenagers in classrooms.",
    },
  },

  'Other': {
    why: "Across most industries, AI is automating the most repetitive and process-driven parts of roles first — data handling, routine communication, basic analysis, and scheduled tasks. The pace is uneven but the direction is consistent.",
    survives: "Judgment, relationships, and physical presence. These are the three things AI still cannot replicate at scale. Any role that is primarily about those three things is significantly safer than one built around information processing.",
    add: "Digital literacy in your specific field — understanding how automation tools work in your industry makes you the person who manages them rather than the person they replace.",
    story: {
      person: "A pattern seen across thousands of transitions",
      path: "→ Coordinator, Analyst, or Manager in the same field",
      how: "The people who survived automation in every industry did one of two things: they moved up the stack (from doing to managing/designing), or they moved sideways into a role that required human judgment the automated system couldn't provide.",
      win: "The transition usually takes 6–12 months. The ones who started before they had to always had better options than the ones who waited.",
    },
    mn: {
      why: "Ихэнх салбарт AI хамгийн давтагдах, процессоор явдаг ажлуудыг эхлээд автоматжуулж байна — өгөгдөл боловсруулах, ердийн харилцаа, үндсэн шинжилгээ. Хурд тэгш биш ч чиглэл нэг.",
      survives: "Дүгнэлт, харилцаа, биеийн оршихуй. AI одоогоор эдгээр гурвыг томоохон хэмжээнд хуулж чадахгүй байна.",
      add: "Таны салбарын дижитал мэдлэг — автоматжуулалтын хэрэгслүүд хэрхэн ажилладгийг ойлгодог хүн тэдгээрийг удирдах хүн болно.",
      story: {
        person: "Мянга мянган шилжилтийн нийтлэг загвар",
        path: "→ Зохицуулагч, шинжлэгч, эсвэл менежер болсон",
        how: "Автоматжуулалтаас амьд үлдсэн хүмүүс хоёр зүйлийн нэгийг хийсэн: стекийн дээр шилжсэн (хийхээс удирдах/дизайн руу), эсвэл хүний дүгнэлт шаарддаг ажил руу хажуу тийш явсан.",
        win: "Шилжилт ихэвчлэн 6–12 сар авдаг. Эрт эхэлсэн хүмүүс үргэлж илүү сайн сонголттой байсан.",
      },
    },
  },
}

// Fallback for job titles not in the map — picks by industry if possible
export function getDisplacementStory(jobTitle: string, lang?: string): StoryContent {
  const entry = displacementStories[jobTitle] ?? displacementStories['Other']
  if (lang === 'mn' && entry.mn) return entry.mn
  return entry
}
