export type Lang = 'en' | 'mn'

// ─── Translation map ──────────────────────────────────────────────────────────
// Key   = the English string (also the stored/scored value)
// Value = the display string in the target language

const mn: Record<string, string> = {
  // ── Intro page ───────────────────────────────────────────────────────────────
  'In the last few years, millions of jobs were replaced by AI.':
    'Сүүлийн жилүүдэд AI хэдэн сая хүний ажлыг орлосон.',
  'Maybe yours was one of them.':
    'Магадгүй таны ажил тэдгээрийн нэг байсан байх.',
  "You didn't fail.":
    'Та бүтэлгүйтээгүй.',
  'The world changed faster than anyone expected.':
    'Дэлхий хэтэрхий хурдан өөрчлөгдсөн.',
  'Your skills. Your experience. Your years of hard work.':
    'Таны ур чадвар. Туршлага. Хөдөлмөрийн жилүүд.',
  'They still matter. More than you think.':
    'Одоо ч чухал хэвээрээ. Та бодсоноосоо илүү.',
  "You're not alone.":
    'Та ганцаараа биш.',
  "And you're not done.":
    'Энэ бол төгсгөл биш.',
  "Let's find out where you belong next.":
    'Дараагийн ажлаа олцгооё.',
  'Start Your Journey →':
    'Аяллаа эхлүүлэх →',
  'Free to start. Takes about 15–30 minutes.':
    'Үнэгүй. 15–30 минут зарцуулна.',
  'Skip intro →':
    'Танилцуулга алгасах →',
  'Tap anywhere to continue':
    'Үргэлжлүүлэхийн тулд дарна уу',

  // ── UI ──────────────────────────────────────────────────────────────────────
  'Continue →':                 'Үргэлжлүүлэх →',
  '← Back':                    '← Буцах',
  'Keep Going →':               'Үргэлжлүүлэх →',
  '🎯 See My Career Matches →': '🎯 Тохирлыг харах →',
  'Find My Career Matches →':   'Үр дүн →',
  'Free · No account needed · Takes 3 seconds':
    'Үнэгүй · Бүртгэл шаардлагагүй · 3 секунд',
  'skip block →':               'Алгасах →',
  '→ results':                  '→ үр дүн',
  'Question':                   'Асуулт',
  'Block':                      'Блок',
  'Select an option...':        'Сонгоно уу...',
  'Type your answer...':        'Хариултаа бичнэ үү...',

  // ── Resume prompt ────────────────────────────────────────────────────────────
  'Welcome back':                       'Тавтай морилно уу',
  'You were on block':                  'Та блок',
  'Pick up where you left off?':        'Үргэлжлүүлэх үү?',
  'Continue':                           'Үргэлжлүүлэх',
  'Start over':                         'Дахин эхлэх',

  // ── Summary page ─────────────────────────────────────────────────────────────
  'Profile Complete':           'Профайл бэлэн',
  'This is':                    'Энэ бол',
  'Built from your actual work history — not a personality quiz.':
    'Таны бодит ажлын түүхэд үндэслэсэн.',
  'Answers':       'Хариулт',
  'Tasks Mapped':  'Даалгавар',
  'Skills Found':  'Ур чадвар',
  'Background':    'Ажлын дэвсгэр',
  'Last Role':     'Сүүлд хийж байсан ажил',
  'Industry':      'Салбар',
  'Experience':    'Туршлага',
  'Education':     'Боловсрол',
  'Country':       'Улс',
  'What You Did':         'Юу хийдэг байсан',
  'Confirmed Skills':     'Ур чадварууд',
  'Your Edge & Goals':    'Давуу тал & Зорилго',
  'Superpower:':          'Хамгийн чадварлаг:',
  'Looking for:':         'Хайж байгаа:',
  'Target salary:':       'Зорьсон цалин:',

  // ── Calculating page ─────────────────────────────────────────────────────────
  'Reading your work history':       'Ажлын түүх уншиж байна',
  'Mapping your tasks and skills':   'Даалгавар, ур чадвар тодорхойлж байна',
  'Scoring 30 career paths':         '30 төрлийн ажлын байр оноож байна',
  'Calculating task overlap':        'Давхцалыг тооцоолж байна',
  'Ranking your matches':            'Тохирлыг эрэмбэлж байна',
  'Your results are ready':          'Таны үр дүн бэлэн боллоо',

  // ── Micro feedbacks ──────────────────────────────────────────────────────────
  '🌱 Young and early — huge advantage.':         '🌱 Залуу, эрт эхэлж байна — том давуу тал.',
  '🚀 Perfect time to pivot.':                    '🚀 Өөрчлөлт хийхэд яг тохиромжтой үе.',
  '💡 Prime career-building years.':              '💡 Ажил бүтээх оргил үе.',
  '⚡ Experience meets energy.':                  '⚡ Туршлага хийгээд эрч хүч давхцаж байна.',
  '🎯 You know exactly what you want.':           '🎯 Юу хүсэхээ яг мэдэж байна.',
  '💎 Depth of experience is rare.':              '💎 Гүн туршлага ховор чанар.',
  '🧠 Wisdom + skills = strong combo.':           '🧠 Мэргэн ухаан + ур чадвар = хүчтэй хослол.',
  '🏆 Decades of knowledge. Still going.':        '🏆 Арван жилийн мэдлэг. Одоо ч үргэлжилж байна.',
  '👑 Irreplaceable experience.':                 '👑 Орлуулшгүй туршлага.',
  '🌱 Everyone starts here.':                     '🌱 Хүн бүр ингэж эхэлдэг.',
  '📈 Enough to transfer skills.':                '📈 Ур чадвар шилжүүлэхэд хангалттай.',
  '💡 Sweet spot for career pivots.':             '💡 Ажил өөрчлөлтөд яг тохиромжтой.',
  '💎 Deep expertise. High value.':               '💎 Гүн мэдлэг. Өндөр үнэ цэнэ.',
  '👑 A decade of real-world knowledge.':         '👑 Арван жилийн бодит мэдлэг.',
  '💡 Skills beat certificates. Always.':         '💡 Ур чадвар гэрчилгээнээс давж гардаг. Үргэлж.',
  '🔧 Trades are booming right now.':             '🔧 Мэргэжлийн ажилчдын эрэлт өсч байна.',
  '📚 More than you think transfers.':            '📚 Та бодсоноосоо илүү зүйл шилжүүлж чадна.',
  '🎓 Solid foundation.':                         '🎓 Бат суурь.',
  '🧠 High-value profile.':                       '🧠 Өндөр үнэ цэнэтэй профайл.',
  '🔬 Elite knowledge base.':                     '🔬 Элит мэдлэгийн сан.',
  '🚀 The most impressive path of all.':          '🚀 Хамгийн гайхамшигтай зам.',
  '🛡️ Stability first. Solid.':                   '🛡️ Тогтвортой байдал эхэлдэг. Бат.',
  '🌍 Opens up global opportunities.':            '🌍 Дэлхийн боломжуудыг нээдэг.',
  '🔧 Hands-on roles are still in demand.':       '🔧 Биечлэн ажиллах ажлын байрны эрэлт хэвээр байна.',
  '🤝 People skills are hard to automate.':       '🤝 Хүнтэй харилцах чадварыг автоматжуулах хэцүү.',
  '⚙️ Technical roles age well.':                 '⚙️ Техникийн мэргэжил хөгшрөхгүй.',
  '🎨 Creative work is increasingly valued.':     '🎨 Бүтээлч ажлыг улам их үнэлж байна.',
  '🚀 Entrepreneur mode on.':                     '🚀 Бизнес эрхлэгчийн горим асаалттай.',
  '🎯 Pragmatic. We can work with that.':         '🎯 Практик хандлага. Ажиллаж болно.',
  '📍 Good entry point.':                         '📍 Сайн эхлэлийн цэг.',
  '📈 Stable and achievable.':                    '📈 Тогтвортой бөгөөд хүрч болохуйц.',
  '💡 Realistic for most mid-level roles.':       '💡 Дунд түвшний ажилд бодитой.',
  '💎 Matches experienced candidates.':           '💎 Туршлагатай нэр дэвшигчдэд тохирно.',
  '🔥 High ceiling — matches well.':              '🔥 Өндөр дээд хязгаар — сайн тохирно.',
  '🌍 Doubles your options immediately.':         '🌍 Сонголтыг нэн даруй хоёр дахин нэмнэ.',
  '📈 Opens up a lot more matches.':              '📈 Олон тохирлыг нэмж нээнэ.',
  '💡 You might surprise yourself.':              '💡 Өөрийгөө гайхшруулж магадгүй.',
  '👍 Plenty of on-site matches too.':            '👍 Биечлэн ажиллах тохирол ч олон байна.',
  '⚡ Fast matches prioritized.':                 '⚡ Хурдан тохирлыг эрэмбэлж байна.',
  '🎯 Good window to find the right fit.':        '🎯 Зохих тохирлыг олох сайн цонх.',
  '🌿 No pressure. Best results come this way.':  '🌿 Дарамтгүй. Хамгийн сайн үр дүн ийм байдаг.',
  '⚙️ Technical problem-solvers are rare.':       '⚙️ Техникийн асуудал шийдэгчид ховор.',
  '🤝 Conflict resolution is a premium skill.':   '🤝 Зөрчил шийдвэрлэх чадвар нэн үнэтэй.',
  '📋 Operational thinkers run the world.':       '📋 Операцийн сэтгэгчид дэлхийг удирддаг.',
  '🎨 Creative output has real market value.':    '🎨 Бүтээлч гаралт бодит зах зээлийн үнэ цэнэтэй.',
  '📊 Analytical thinkers are always in demand.': '📊 Аналитик сэтгэгчдийг үргэлж хэрэгтэй байдаг.',
  '👥 Leadership is the hardest thing to hire for.':'👥 Удирдагчийг хамгийн хэцүү авдаг.',
  '🔧 Execution matters more than ideas.':        '🔧 Гүйцэтгэл санаанаас илүү чухал.',
  '💼 Reliability is underrated.':                '💼 Найдвартай байдлыг дутуу үнэлдэг.',
  '🔥 That mindset separates you from everyone else.': '🔥 Тэр сэтгэлгээ таныг бусдаас ялгана.',
  "✅ That's exactly what we're matching for.":   '✅ Яг үүнийг тохируулж байна.',
  '⏱️ Most in-demand certs take under 3 months.': '⏱️ Ихэнх гэрчилгээ 3 сараас бага хугацаа шаарддаг.',
  '💼 Your existing skills transfer further than you think.':
    '💼 Одоогийн ур чадвар та бодсоноосоо хол шилждэг.',

  // ── Scoring engine — dynamic reason templates ────────────────────────────────
  // {n} = count, {t1}/{t2} = task names, {s1} = skill, {industry}, {sp} = superpower
  'reason_tasks_many': 'Та аль хэдийн {n} үндсэн даалгаврыг гүйцэтгэдэг — "{t1}", "{t2}"',
  'reason_tasks_one':  '"{t1}" нь энэ ажил дахь өдөр тутмын үндсэн даалгавар',
  'reason_skill':      '"{s1}" нь энд ажил олгогчдын хайдаг шилдэг ур чадваруудын нэг',
  'reason_industry':   'Таны {industry} салбарын туршлага энэ чиглэлд шууд үнэлэгддэг',
  'reason_superpower': 'Таны давуу тал — "{sp}" — энэ ажилд яг хэрэгтэй зүйл',

  // ── Scoring engine — static reasons ─────────────────────────────────────────
  'Cross-industry demand — every company needs project managers':
    'Бүх салбарт эрэлттэй — аливаа компани менежер хэрэгтэй',
  'Leadership experience is the hardest thing to replace':
    'Удирдлагын туршлага хамгийн орлуулахад хэцүү зүйл',
  'Average salary climbs fast with each year of experience':
    'Цалин туршлага нэмэгдэх тусам хурдан өсдөг',
  'One of the fastest-growing roles worldwide':
    'Дэлхийд хамгийн хурдан өсч буй мэргэжлүүдийн нэг',
  'AI tools are built by analysts — not replaced by them':
    'AI хэрэгслийг аналистууд бүтээдэг — орлуулдаггүй',
  'Your background makes your findings credible to operations teams':
    'Таны туршлага операцийн багуудад итгэлтэй харагдуулдаг',
  'Tech companies are hiring CSMs faster than any other role':
    'Технологийн компаниуд CSM-ийг хамгийн хурдан авч байна',
  'Your customer-facing experience is exactly what they want':
    'Харилцагчтай ажилласан туршлага нь яг тэдний хайж буй зүйл',
  'Clear progression path to Account Manager or VP of Customer Success':
    'Account Manager эсвэл VP хүртэлх тодорхой ажлын зам',
  'Fastest hiring cycle of any office role — companies always need salespeople':
    'Борлуулалтын ажилтнуудыг компаниуд үргэлж хэрэгтэй байдаг',
  'Commission structures mean your income is controlled by you':
    'Комиссын бүтэц нь таны орлогыг өөрөө тодорхойлох боломж',
  'Experience in almost any service industry transfers directly':
    'Үйлчилгээний салбарын туршлага шууд шилждэг',
  'Every company with more than 20 employees needs HR':
    '20-оос дээш ажилтантай аливаа компани HR хэрэгтэй',
  'Real-world operational experience makes you better than HR grads':
    'Бодит туршлага нь HR-ийн төгсөгчдөөс давуу болгодог',
  'Strong job security — even in recessions, compliance never stops':
    'Ажлын байрны аюулгүй байдал — хэдий ч compliance зогсдоггүй',
  'Low barrier to entry — a portfolio matters more than a degree':
    'Орох босго бага — портфолио диплом шиг чухал',
  'Freelance or full-time — both paths are well-paid':
    'Фриланс эсвэл бүтэн цагийн — аль ч зам сайн цалинтай',
  'Business writing and communication skills are always in demand':
    'Бизнесийн бичих чадвар үргэлж эрэлттэй',
  'Global supply chain demand means logistics jobs are never scarce':
    'Дэлхийн хангамжийн сүлжээний эрэлт логистикийн ажлыг хомсдолгүй байлгадаг',
  'Your physical work experience is exactly the background they want':
    'Биеийн хөдөлмөрийн туршлага яг тэдний хайж буй дэвсгэр',
  'Short path from coordinator to operations manager':
    'Зохицуулагчаас операцийн менежер болох богино зам',
  'Growing faster than any other tech role right now':
    'Одоо бусад технологийн мэргэжлээс хурдан өсч байна',
  'Customer empathy from your background is rare in design teams':
    'Таны харилцагчийн эмпати дизайн багуудад ховор чанар',
  'Remote-first — most UX jobs never require an office':
    'Алсаас ажиллах боломжтой — ихэнх UX ажил оффис шаарддаггүй',
  'Companies pay well to find inefficiencies — that is exactly this job':
    'Компаниуд үр ашиггүй байдлыг олоход сайн төлдөг — яг энэ ажил',
  'Process knowledge from operations roles transfers directly':
    'Операцийн үүргийн процессын мэдлэг шууд шилждэг',
  'Stepping stone to operations director within 4–5 years':
    '4–5 жилийн дотор операцийн захирал болох алхам',
  'Every brand needs this — demand only grows':
    'Аливаа брэнд энэ хэрэгтэй — эрэлт л өсч байна',
  'Entry point to a full digital marketing career':
    'Бүрэн дижитал маркетингийн ажлын орох цэг',
  'Remote-friendly and often freelance-compatible':
    'Алсаас ажиллах боломжтой, фриланстай нийцтэй',
  'Your real-world experience is more valuable than a teaching degree here':
    'Бодит туршлага энд багшлах дипломоос илүү үнэтэй',
  'Corporate training budgets are growing as AI changes job roles':
    'AI ажлын байрыг өөрчлөхөд корпорацийн сургалтын төсвүүд өсч байна',
  'Industry expertise from your background is the curriculum':
    'Таны салбарын мэдлэг нь хөтөлбөр',
  'Fastest-growing tech role globally — 3.5M unfilled jobs worldwide':
    'Дэлхийд хамгийн хурдан өсч буй технологийн мэргэжил — 3.5 сая чөлөөт ажлын байр',
  'AI cannot replace the human judgment this role requires':
    'AI энэ үүргийн шаарддаг хүний дүгнэлтийг орлож чадахгүй',
  'CompTIA Security+ cert opens the door with no degree required':
    'CompTIA Security+ гэрчилгээ диплом шаардлагагүйгээр хаалга нээдэг',
  'Software development remains one of the highest-paid fields globally':
    'Программ хөгжүүлэлт дэлхийд хамгийн өндөр цалинтай салбаруудын нэг хэвээр байна',
  'Remote-first — most dev jobs never require an office':
    'Алсаас ажиллах боломжтой — ихэнх хөгжүүлэгчийн ажил оффис шаарддаггүй',
  'AI tools assist developers but have not replaced them':
    'AI хэрэгсэл хөгжүүлэгчдэд тусалдаг боловч орлоогүй байна',

  // ── Scoring engine — skillsNeeded ────────────────────────────────────────────
  'PMP basics or CAPM cert':                        'PMP үндэс эсвэл CAPM гэрчилгээ',
  'Stakeholder communication':                      'Оролцогч талуудтай харилцаа',
  'Risk management':                                'Эрсдэлийн менежмент',
  'SQL basics':                                     'SQL үндэс',
  'Power BI or Tableau':                            'Power BI эсвэл Tableau',
  'Statistical thinking':                           'Статистик сэтгэлгээ',
  'CRM tools (HubSpot free cert)':                  'CRM хэрэгсэл (HubSpot үнэгүй гэрчилгээ)',
  'Churn prevention basics':                        'Харилцагч хадгалах үндэс',
  'Account health tracking':                        'Дансны эрүүл мэндийн хяналт',
  'CRM basics':                                     'CRM үндэс',
  'Objection handling':                             'Эсэргүүцэл шийдвэрлэх',
  'Discovery call structure':                       'Анхны утасны ярианы бүтэц',
  'Employment law basics':                          'Хөдөлмөрийн эрх зүйн үндэс',
  'SHRM-CP cert path':                              'SHRM-CP гэрчилгээний зам',
  'Interviewing techniques':                        'Ярилцлагын техник',
  'Copywriting fundamentals':                       'Копирайтингийн үндэс',
  'SEO basics':                                     'SEO үндэс',
  'Building a portfolio':                           'Портфолио бүтээх',
  'Supply chain fundamentals':                      'Нийлүүлэлтийн сүлжээний үндэс',
  'Inventory software':                             'Агуулахын программ',
  'Freight and customs basics':                     'Тээвэр, гаалийн үндэс',
  'Figma (free to learn)':                          'Figma (үнэгүй сурах боломжтой)',
  'User research methods':                          'Хэрэглэгч судлах аргачлал',
  'Portfolio with 2–3 case studies':                '2–3 кейс судалгаатай портфолио',
  'Process mapping':                                'Процесс зураглал',
  'Excel pivot tables and Power Query':             'Excel pivot хүснэгт ба Power Query',
  'Six Sigma Green Belt basics':                    'Six Sigma Green Belt үндэс',
  'Content calendar strategy':                      'Контент календарийн стратеги',
  'Meta Business Suite':                            'Meta Business Suite',
  'Basic analytics reading':                        'Аналитик уншлагын үндэс',
  'Instructional design basics':                    'Сургалтын дизайны үндэс',
  'Learning management systems (LMS)':              'Сургалт удирдах систем (LMS)',
  'Public speaking':                                'Нийтийн илтгэл',
  'CompTIA Security+ (entry cert)':                 'CompTIA Security+ (орох гэрчилгээ)',
  'Networking fundamentals':                        'Сүлжээний үндэс',
  'TryHackMe or HackTheBox practice':               'TryHackMe эсвэл HackTheBox дадлага',
  'System design basics':                           'Системийн дизайны үндэс',
  'Cloud fundamentals (AWS free tier)':             'Клаудын үндэс (AWS үнэгүй)',
  'One framework beyond your current stack':        'Одоогийн стекийн гадна нэг framework',

  // ── Results page ─────────────────────────────────────────────────────────────
  'Results':              'Үр дүн',
  "'s Career Matches":    '-н ажлын тохирлууд',
  "'s Escape Plan":       '-н гарах зам',
  'Ranked by compatibility · Live roles included':
    'Нийцлээр эрэмбэлэгдсэн · Бодит ажлын байрууд',
  "Here's where you stand — and where you can go":
    'Та хаана байгаа болон хаашаа явж болох',

  // ── Threat assessment ────────────────────────────────────────────────────────
  'The honest picture':               'Үнэн байдал',
  'Critical automation risk':         'Хамгийн өндөр автоматжуулалтын эрсдэл',
  'High automation risk':             'Өндөр автоматжуулалтын эрсдэл',
  'Moderate automation risk':         'Дунд зэргийн автоматжуулалтын эрсдэл',
  'Lower automation risk':            'Харьцангуй бага автоматжуулалтын эрсдэл',
  'of tasks in this role are being automated':
    'даалгавар автоматжиж байна',
  "Why it's happening":               'Яагаад болж байна',
  'Your tasks being replaced':        'Орлогдож байгаа даалгаврууд',
  "What machines still can't take from you":
    'Машин таанаас авч чадахгүй зүйл',
  'The one thing to add':             'Нэмэх ганц зүйл',
  'Someone who made this jump':       'Энэ алхамыг хийсэн хүн',
  'AI-resistant':                     'AI-д тэсвэртэй',
  'Salary':               'Цалин',
  'Time to hire':         'Хугацаа',
  '▼ Why this fits you':  '▼ Яагаад тохирч байна',
  '▲ Less':               '▲ Хураах',
  'Why it fits':          'Яагаад тохирч байна',
  'Skills to build':      'Хөгжүүлэх ур чадварууд',
  'Job Offers':           'Ажлын санал',
  'Apply →':              'Өргөдөл →',
  'One-time payment\nunlocks all':   'Нэг удаагийн төлбөр\nбүгдийг нэгдэнэ',
  'more matches waiting':            'тохирол хүлээж байна',
  'Unlock All Matches — $5':         'Бүх тохирлыг нэгдэх — $5',
  'One-time payment. No subscription.': 'Нэг удаагийн төлбөр.',
  'Interview Questions':               'Ярилцлагын асуултууд',
  'Learning Roadmap':                  'Суралцах зам',
  'Email my results':                  'Үр дүнгээ имэйлээр авах',
  'Get your matches, interview prep and learning roadmap in your inbox.':
    'Тохирол, ярилцлагын бэлтгэл болон суралцах замаа имэйлээр авна уу.',
  'your@email.com':                    'таны@имэйл.com',
  'Send':                              'Илгээх',
  'Sent! Check your inbox.':           'Илгээлээ! Имэйлээ шалгана уу.',
  'Something went wrong. Try again.':  'Алдаа гарлаа. Дахин оролдоно уу.',
  'Share your results':                'Үр дүнгээ хуваалцах',
  'Know someone whose job changed? Send them their own path.':
    'Ажил нь өөрчлөгдсөн хүн таних уу? Тэдэнд өөрсдийн замыг илгээ.',
  'Share':                             'Хуваалцах',
  'Link copied':                       'Холбоос хуулагдлаа',
  'Unlock to reveal':                'Нэгдэх',
  'See every career path ranked for you — plus skills roadmap, salary insights, and live job listings for each.':
    'Таны хувьд эрэмбэлэгдсэн бүх ажлын замыг харах — ур чадварын зам, цалингийн мэдээлэл, бодит ажлын байрууд.',
  'Match':                'Тохирол',
  '#':                    '#',

  // ── Block 1: Identity ────────────────────────────────────────────────────────
  "What's your first name?":
    'Таны нэр хэн бэ?',
  "We'll use this to personalize your results.":
    'Таны үр дүнг хувийн болгоход ашиглана.',
  'How old are you?':
    'Та хэдтэй вэ?',
  'Which country are you in?':
    'Та аль улсад байгаа вэ?',

  // Age
  'Under 20': '20-аас доош',
  '20–25':    '20–25',
  '26–30':    '26–30',
  '31–35':    '31–35',
  '36–40':    '36–40',
  '41–45':    '41–45',
  '46–50':    '46–50',
  '51–55':    '51–55',
  '55+':      '55+',

  // Country
  'Mongolia':       'Монгол',
  'United States':  'Америк',
  'United Kingdom': 'Их Британи',
  'Australia':      'Австрали',
  'Canada':         'Канад',
  'Germany':        'Герман',
  'France':         'Франц',
  'Japan':          'Япон',
  'South Korea':    'Өмнөд Солонгос',
  'India':          'Энэтхэг',
  'China':          'Хятад',
  'Brazil':         'Бразил',
  'Mexico':         'Мексик',
  'South Africa':   'Өмнөд Африк',
  'Other':          'Бусад',

  // ── Block 2: Your Work ───────────────────────────────────────────────────────
  'Which industry did you work in?':
    'Ямар салбарт ажиллаж байсан бэ?',
  'What was your most recent job title?':
    'Сүүлийн ажлын байрны нэр?',
  'What was your most recent role?':
    'Сүүлийн ажлын байр юу байсан бэ?',
  'Pick the closest match — options change based on your industry.':
    'Хамгийн ойрхон сонголтыг сонгоно уу — салбараас хамаарч өөрчлөгдөнө.',
  "E.g. 'cashier', 'warehouse worker', 'site manager'. Be specific.":
    "Жнь: 'кассчин', 'агуулахын ажилчин', 'менежер'",
  'Which industry?':
    'Ямар салбарт?',
  'Total years of work experience?':
    'Нийт ажлын туршлага?',
  'What did you actually do most of the time?':
    'Ажил дээрээ ихэнх цагаа юу хийдэг байсан бэ?',
  'Regular tasks only — not things you did once or twice.':
    'Байнгын ажлуудаа сонгоно уу.',

  // Experience
  'Under 1 year':    '1 жилээс бага',
  '1–2 years':       '1–2 жил',
  '3–5 years':       '3–5 жил',
  '6–10 years':      '6–10 жил',
  '10+ years':       '10+ жил',

  // Industry
  'Manufacturing / Factory':     'Үйлдвэрлэл / Фабрик',
  'Customer Service':            'Харилцагчийн үйлчилгээ',
  'Retail / Sales':              'Жижиглэн / Борлуулалт',
  'Information Technology':      'Мэдээллийн технологи',
  'Healthcare / Medical':        'Эрүүл мэнд / Эмнэлэг',
  'Finance / Accounting':        'Санхүү / Нягтлан бодох',
  'Education / Teaching':        'Боловсрол / Багшлах',
  'Transportation / Delivery':   'Тээвэр / Хүргэлт',
  'Construction / Trades':       'Барилга / Мэргэжлийн ажил',
  'Food Service / Hospitality':  'Хоол / Зочломтгой байдал',
  'Administrative / Office':     'Захиргаа / Оффис',
  'Marketing / Media':           'Маркетинг / Медиа',
  'Legal / Law':                 'Хуулийн / Эрх зүй',
  'Agriculture':                 'Хөдөө аж ахуй',
  'Arts / Design':               'Урлаг / Дизайн',
  'Engineering':                 'Инженерчлэл',
  'Government / Public Service': 'Засгийн газар / Нийтийн үйлчилгээ',
  'Non-profit / Social Work':    'Ашгийн бус / Нийгмийн ажил',

  // Daily task options (short)
  '👥 Managed people or a team':          '👥 Хүмүүс удирдсан',
  '🎧 Customer service & complaints':     '🎧 Харилцагчийн үйлчилгээ',
  '📋 Paperwork & data entry':            '📋 Бичиг баримт, өгөгдөл оруулах',
  '🔧 Fixed or operated machinery':       '🔧 Машин, тоног төхөөрөмж ажиллуулсан',
  '📊 Analyzed data & reports':           '📊 Өгөгдөл, тайлан шинжилсэн',
  '⌨️ Wrote reports & documents':         '✍️ Тайлан, баримт бичиг бичсэн',
  '🎨 Created designs or visual content': '🎨 Дизайн, визуал агуулга бүтээсэн',
  '🤝 Sold products or services':         '🤝 Бүтээгдэхүүн, үйлчилгээ зарсан',
  '📅 Planned & coordinated projects':    '📅 Төслийг төлөвлөж, зохицуулсан',
  '🎓 Trained or taught others':          '🎓 Бусдыг сургасан, заасан',
  '🚚 Drove or delivered goods':          '🚚 Бараа, хүмүүс зөөсөн',
  '🔍 Inspected & quality-checked work':  '🔍 Чанар шалгасан',
  '💼 Negotiated with clients or vendors':'💼 Харилцагч, нийлүүлэгчтэй хэлэлцсэн',
  '🔨 Built or assembled things':         '🔨 Зүйл угсарсан, барьсан',
  '🔬 Researched & gathered info':        '🔬 Мэдээлэл цуглуулсан, судалсан',
  '💰 Handled money & finances':          '💰 Мөнгө, санхүүг хянасан',
  '💻 Coded or developed software':       '💻 Код бичсэн, программ хөгжүүлсэн',

  // ── Block 3: Skills & Tools ──────────────────────────────────────────────────
  'What can you do without being trained?':
    'Сургалтгүйгээр юу хийж чадах вэ?',
  'Only pick what you could do confidently from day 1.':
    'Эхний өдрөөсөө итгэлтэйгээр хийж чадах зүйлсийг л сонгоно уу.',
  'Which tools have you used at work?':
    'Ажилдаа ямар хэрэгсэл ашиглаж байсан бэ?',
  'Only select tools you have real experience with.':
    'Зөвхөн бодит туршлагатай хэрэгслийг сонгоно уу.',

  // Skill options (short)
  '👥 Managing people':       '👥 Хүн удирдах',
  '🎧 Customer service':      '🎧 Харилцагчийн үйлчилгээ',
  '📋 Data entry & records':  '📋 Өгөгдөл оруулах',
  '⚙️ Operating machinery':   '⚙️ Машин ажиллуулах',
  '📊 Excel & spreadsheets':  '📊 Excel, хүснэгт',
  '📈 Data analysis & reports': '📈 Өгөгдөл шинжилгээ',
  '✍️ Clear writing':         '✍️ Тодорхой бичих',
  '🎨 Graphic design':        '🎨 График дизайн',
  '🖥️ CRM software':          '🖥️ CRM программ',
  '🚗 Licensed driving':      '🚗 Жолооны үнэмлэхтэй',
  '🏥 Medical procedures':    '🏥 Эмнэлгийн процедур',
  '🎓 Teaching & training':   '🎓 Заах, сургах',
  '💻 Programming & coding':  '💻 Программчлал',
  '🤝 Sales & persuasion':    '🤝 Борлуулалт, ятгах',
  '💪 Physical labor':        '💪 Биеийн хөдөлмөр',
  '💰 Budgeting & finance':   '💰 Төсөв, санхүү',
  '📅 Logistics & scheduling':'📅 Логистик, хуваарь',
  '📱 Social media':          '📱 Сошиал медиа',
  '⚖️ Legal & compliance':    '⚖️ Хуулийн мэдлэг',
  '🧩 Problem-solving':       '🧩 Асуудал шийдвэрлэх',

  // Tool options (short)
  '📄 Microsoft Office':                      '📄 Microsoft Office',
  '☁️ Google Workspace':                      '☁️ Google Workspace',
  '🔗 CRM software (Salesforce, HubSpot)':    '🔗 CRM программ (Salesforce, HubSpot)',
  '🧾 Accounting software (QuickBooks, SAP)': '🧾 Нягтлан бодох программ',
  '🎨 Design tools (Canva, Figma, Photoshop)':'🎨 Дизайны хэрэгсэл (Canva, Figma)',
  '📦 Warehouse / inventory systems':         '📦 Агуулахын систем',
  '🖥️ POS / cash register':                   '🖥️ POS / кассын систем',
  '🏭 Industrial machinery':                  '🏭 Үйлдвэрийн машин',
  '🏥 Medical equipment':                     '🏥 Эмнэлгийн тоног төхөөрөмж',
  '📋 Project mgmt tools (Trello, Asana)':    '📋 Төслийн хэрэгсэл (Trello, Asana)',
  '🏗️ Construction tools & machinery':        '🏗️ Барилгын хэрэгсэл',
  '🎬 Video / audio editing':                 '🎬 Видео, аудио засварлах',
  '💻 Code editors (VS Code, GitHub)':        '💻 Кодчлолын хэрэгсэл',
  '📱 Social media platforms':                '📱 Сошиал медиа платформ',
  '⚙️ ERP systems (SAP, Oracle)':             '⚙️ ERP систем (SAP, Oracle)',

  // ── Block 4: What You Want ───────────────────────────────────────────────────
  'What kind of work are you looking for?':
    'Ямар ажил хайж байна вэ?',
  'What salary are you targeting?':
    'Ямар цалин хүсч байна вэ?',
  'Be honest — this filters your matches.':
    'Шударга байгаарай — тохирлыг шүүнэ.',
  "Select all ranges you'd accept.":
    'Зөвшөөрөх бүх хязгаараа сонгоно уу.',
  'Open to remote work?':
    'Алсаас ажиллахад нээлттэй үү?',
  'How soon do you need to start?':
    'Хэзээ ажил эхлэх шаардлагатай вэ?',

  // Job type
  'Stable office job':       'Тогтвортой оффисын ажил',
  'Remote / work from home': 'Алсаас / гэрээс ажиллах',
  'Physical, hands-on work': 'Биеийн хөдөлмөр',
  'People-facing role':      'Хүнтэй харьцах ажил',
  'Technical / analytical':  'Техникийн / аналитик',
  'Creative (design, writing)': 'Бүтээлч (дизайн, бичлэг)',
  'Freelance / own business':'Чөлөөт ажил / өөрийн бизнес',
  'Open — just need income': 'Юунд ч нээлттэй',

  // Salary
  'Under $30k / year':   '$30k-аас доош / жил',
  '$30k–$50k / year':    '$30k–$50k / жил',
  '$50k–$70k / year':    '$50k–$70k / жил',
  '$70k–$100k / year':   '$70k–$100k / жил',
  '$100k+ / year':       '$100k+ / жил',

  // Remote
  'Yes, I prefer it':          'Тийм, илүүд үздэг',
  "Yes, open to it":           'Тийм, нээлттэй',
  "Maybe — never tried it":    'Магадгүй — туршаагүй',
  'No — need to be on-site':   'Үгүй — биечлэн ажиллах',

  // Urgency
  '🔴 ASAP — need income now': '🔴 Яаралтай — одоо орлого хэрэгтэй',
  '🟡 Within 3 months':        '🟡 3 сарын дотор',
  '🟢 No rush, just exploring':'🟢 Яарах шаардлагагүй',

  // ── Block 5: Your Edge ───────────────────────────────────────────────────────
  'What do people at work consistently come to you for?':
    'Хамтран ажиллагсад тань ямар зүйлд байнга ханддаг вэ?',
  'Pick the one that fits best.':
    'Хамгийн тохирох нэгийг сонгоно уу.',
  'Highest level of education?':
    'Хамгийн өндөр боловсрол?',
  'Willing to do a short course to get a better job?':
    'Илүү сайн ажлын тулд богино курс авахад бэлэн үү?',
  'Most in-demand certs take 1–3 months online.':
    'Ихэнх гэрчилгээ онлайнаар 1–3 сар шаарддаг.',

  // Superpower
  'Fix technical problems':          'Техникийн асуудал шийдэх',
  'Handle difficult customers':      'Хэцүү харилцагчтай ажиллах',
  'Organize & get things on track':  'Зохион байгуулах, зам дээр нь оруулах',
  'Write, design, or create':        'Бичих, дизайн хийх, бүтээх',
  'Make sense of data':              'Өгөгдлийг ойлгомжтой болгох',
  'Lead & motivate the team':        'Баг удирдах, урамшуулах',
  'Get things done physically':      'Биеийн хөдөлмөрөөр зүйл хийх',
  'Follow instructions reliably':    'Даалгаврыг найдвартай биелүүлэх',
  'Build & ship software':           'Программ бичих, хүргэх',

  // Education
  'High School':                    'Бүрэн дунд боловсрол',
  'Vocational / Trade School':      'Мэргэжлийн сургууль',
  'Some College':                   'Дээд сургуульд суусан',
  "Bachelor's Degree":              'Бакалавр',
  "Master's Degree":                'Магистр',
  'PhD / Doctorate':                'Доктор',
  'Self-taught / No formal degree': 'Өөрийгөө сурсан',

  // Retraining
  "🚀 Yes — already doing it":   '🚀 Тийм — аль хэдийн хийж байна',
  '👍 Yes, if it leads to a job': '👍 Тийм, ажилд хүргэвэл',
  "🤔 Maybe, if it's quick":      "🤔 Магадгүй, хурдан бол",
  "❌ Prefer my current skills":  '❌ Одоогийн ур чадвараа ашиглах',

  // ── Job titles by industry ───────────────────────────────────────────────────
  // Manufacturing / Factory
  'Machine Operator':         'Машин ажиллуулагч',
  'Assembly Line Worker':     'Угсралтын шугамын ажилчин',
  'Warehouse Worker':         'Агуулахын ажилчин',
  'Forklift Driver':          'Форклифтийн жолооч',
  'Quality Inspector':        'Чанарын хянагч',
  'Production Supervisor':    'Үйлдвэрлэлийн ахлагч',
  'Maintenance Technician':   'Засвар үйлчилгээний техникч',

  // Customer Service
  'Customer Service Rep':     'Харилцагчийн үйлчилгээний төлөөлөгч',
  'Call Centre Agent':        'Дуудлагын төвийн ажилтан',
  'Help Desk Agent':          'Туслах ширээний ажилтан',
  'Support Specialist':       'Дэмжлэгийн мэргэжилтэн',
  'Team Lead / Supervisor':   'Багийн ахлагч / Хяналтын ажилтан',
  'Complaints Handler':       'Гомдол хариуцагч',

  // Retail / Sales
  'Cashier':                  'Кассчин',
  'Sales Associate':          'Борлуулалтын туслах',
  'Store Manager':            'Дэлгүүрийн менежер',
  'Inventory Specialist':     'Бараа нөөцийн мэргэжилтэн',
  'Visual Merchandiser':      'Дэлгэцийн мерчандайзер',
  'Buyer / Purchasing':       'Худалдан авалтын ажилтан',

  // Information Technology
  'Software Engineer':        'Программ хангамжийн инженер',
  'IT Support Specialist':    'МТ-ийн дэмжлэгийн мэргэжилтэн',
  'Data Analyst':             'Өгөгдлийн аналист',
  'Network Administrator':    'Сүлжээний администратор',
  'DevOps / Cloud Engineer':  'DevOps / Клаудын инженер',
  'Project Manager':          'Төслийн менежер',
  'UX / UI Designer':         'UX / UI Дизайнер',

  // Healthcare / Medical
  'Nurse / Nursing Assistant':    'Сувилагч / Сувилахын туслах',
  'Medical Assistant':            'Эмнэлгийн туслах',
  'Admin Coordinator':            'Захиргааны зохицуулагч',
  'Lab Technician':               'Лабораторийн техникч',
  'Pharmacist':                   'Эмийн сангийн эмч',
  'Patient Care Technician':      'Өвчтөний асрамжийн техникч',

  // Finance / Accounting
  'Accountant':               'Нягтлан бодогч',
  'Bookkeeper':               'Дэвтэр хөтлөгч',
  'Financial Analyst':        'Санхүүгийн аналист',
  'Payroll Specialist':       'Цалингийн мэргэжилтэн',
  'Auditor':                  'Аудитор',
  'Bank Teller':              'Банкны кассчин',

  // Education / Teaching
  'Teacher':                  'Багш',
  'Teaching Assistant':       'Багшийн туслах',
  'Tutor':                    'Нэмэлт хичээлийн багш',
  'School Administrator':     'Сургуулийн захирал',
  'Curriculum Designer':      'Хөтөлбөр боловсруулагч',
  'Librarian':                'Номын санч',

  // Transportation / Delivery
  'Truck Driver':             'Ачааны машины жолооч',
  'Delivery Driver':          'Хүргэлтийн жолооч',
  'Dispatcher':               'Диспетчер',
  'Fleet Manager':            'Тээврийн парк менежер',
  'Warehouse Coordinator':    'Агуулахын зохицуулагч',
  'Courier':                  'Куръе / Элч',

  // Construction / Trades
  'Carpenter':                'Мужаан',
  'Electrician':              'Цахилгаанч',
  'Plumber':                  'Дулааны / Усны техникч',
  'Site Manager':             'Барилгын талбайн менежер',
  'Labourer':                 'Гараар ажиллагч',
  'Estimator / Quantity Surveyor': 'Тооцоологч / Хэмжигч',

  // Food Service / Hospitality
  'Chef / Cook':              'Тогооч',
  'Server / Waiter':          'Үйлчлэгч / Официант',
  'Bartender':                'Барменч',
  'Hotel / Front Desk Staff': 'Зочид буудлын хүлээн авагч',
  'Kitchen Manager':          'Гал тогооны менежер',
  'Event Staff':              'Арга хэмжээний ажилтан',

  // Administrative / Office
  'Administrative Assistant': 'Захиргааны туслах',
  'Office Manager':           'Оффисын менежер',
  'Receptionist':             'Хүлээн авагч',
  'Data Entry Clerk':         'Өгөгдөл оруулагч',
  'Executive Assistant':      'Гүйцэтгэх захирлын туслах',
  'Operations Coordinator':   'Үйл ажиллагааны зохицуулагч',

  // Marketing / Media
  'Marketing Manager':            'Маркетингийн менежер',
  'Content Writer / Copywriter':  'Агуулга бичигч / Копирайтер',
  'Social Media Manager':         'Сошиал медиа менежер',
  'Graphic Designer':             'График дизайнер',
  'SEO Specialist':               'SEO мэргэжилтэн',
  'PR / Communications Manager':  'PR / Харилцааны менежер',

  // Legal / Law
  'Paralegal':                'Хуулийн туслах',
  'Legal Secretary':          'Хуулийн нарийн бичгийн дарга',
  'Compliance Officer':       'Дагаж мөрдөлтийн ажилтан',
  'Legal Assistant':          'Хуулийн туслах ажилтан',
  'Court Reporter':           'Шүүхийн тайлагч',

  // Agriculture
  'Farm Worker':              'Фермийн ажилчин',
  'Agricultural Manager':     'Хөдөө аж ахуйн менежер',
  'Equipment Operator':       'Тоног төхөөрөмж ажиллуулагч',
  'Agronomist':               'Агрономч',
  'Livestock Worker':         'Мал аж ахуйн ажилчин',

  // Arts / Design
  'Illustrator / Artist':     'Зураач / Уран бүтээлч',
  'Photographer':             'Гэрэл зурагч',
  'Video Editor':             'Видео засварлагч',
  'Art Director':             'Урлагийн захирал',
  'Animator':                 'Анимацийн зураач',

  // Engineering
  'Civil Engineer':           'Иргэний инженер',
  'Mechanical Engineer':      'Механик инженер',
  'Electrical Engineer':      'Цахилгааны инженер',
  'Project Engineer':         'Төслийн инженер',
  'Technician':               'Техникч',
  'CAD Designer':             'CAD дизайнер',

  // Government / Public Service
  'Government Officer':               'Засгийн газрын ажилтан',
  'Policy Analyst':                   'Бодлогын аналист',
  'Public Administrator':             'Нийтийн администратор',
  'Inspector / Enforcement Officer':  'Хяналт / Хэрэгжүүлэлтийн ажилтан',
  'Social Worker':                    'Нийгмийн ажилтан',

  // Non-profit / Social Work
  'Program Coordinator':          'Программын зохицуулагч',
  'Case Manager':                 'Хэргийн менежер',
  'Community Outreach Worker':    'Нийгэмлэгийн ажилтан',
  'Grant Writer':                 'Грант бичигч',
  'Volunteer Manager':            'Сайн дурынхны менежер',
}

// ─── English templates for scoring engine reason builders ────────────────────
const en: Record<string, string> = {
  'reason_tasks_many': 'You already do {n} of the core tasks — "{t1}" and "{t2}"',
  'reason_tasks_one':  '"{t1}" is a core daily task in this role',
  'reason_skill':      '"{s1}" is one of the top skills employers hire for here',
  'reason_industry':   'Your {industry} background is directly valued in this field',
  'reason_superpower': 'Your edge — "{sp}" — is exactly what this role needs',
}

// ─── t() ─────────────────────────────────────────────────────────────────────
export function createTranslator(lang: Lang) {
  return function t(key: string): string {
    if (lang === 'en') return en[key] ?? key
    return mn[key] ?? en[key] ?? key
  }
}

export const langLabels: Record<Lang, string> = { en: 'EN', mn: 'МН' }
