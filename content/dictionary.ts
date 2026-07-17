import type { Locale } from "@/lib/i18n";

const en = {
  nav: {
    services: "Services",
    sectors: "Sectors",
    insights: "Insights",
    tools: "Tools",
    about: "About",
    bookACall: "Book a call",
    contact: "Contact",
  },
  brand: {
    name: "Tibyan",
    nameArabic: "تبيان",
    tagline:
      "Marketing and brand strategy for investors entering Syria's reconstruction economy.",
    subline:
      "Evidence-first. Natively bilingual. Built for a market where data is scarce and trust is everything.",
  },
  hero: {
    credibility:
      "The Caesar Act was repealed in December 2025 and Syria's central bank is back on SWIFT — the reconstruction economy is open. Reliable market data and brand trust are not. That gap is our work.",
    primaryCta: "Get your market-entry readiness score",
    secondaryCta: "Book a call",
  },
  problems: {
    heading: "Four problems every investor here shares",
    sub: "Whatever your sector or origin market, entering Syria means solving the same four things.",
    items: [
      {
        title: "Data scarcity",
        body: "Reliable market research barely exists. We build proxy-data models and design primary research so decisions rest on evidence, not anecdote.",
      },
      {
        title: "Reputational scrutiny",
        body: "Reconstruction investment is watched — by media, regulators, and communities. Communications must be built for scrutiny, not spin.",
      },
      {
        title: "Trust from zero",
        body: "No brand equity, no local track record. Trust has to be constructed deliberately, in Arabic, with the right local and diaspora partners.",
      },
      {
        title: "Multi-audience communication",
        body: "Syrian consumers and partners in Arabic. International stakeholders in English. Government and community bodies in both — natively, not translated.",
      },
    ],
  },
  sections: {
    services: "What we do",
    sectors: "Sectors we serve",
    latestInsights: "Latest insights",
    methodology: "How we work",
    allServices: "All services",
    allSectors: "All sectors",
    allInsights: "All insights",
    readMore: "Read more",
    relatedServices: "Relevant services",
    tiersHeading: "Ways to engage",
  },
  methodology: {
    steps: [
      {
        title: "Audit",
        body: "A structured readiness audit: your data position, stakeholder map, localization state, and communication risks.",
      },
      {
        title: "Strategy",
        body: "A market-entry marketing and communications strategy with named audiences, channels, and evidence behind every assumption.",
      },
      {
        title: "Execution",
        body: "Arabic-first content, AI-assisted campaign operations, and stakeholder communications — measured and reported.",
      },
    ],
  },
  tools: {
    heading: "Interactive tools",
    sub: "Evidence-based instruments, not marketing theatre. Every assumption is footnoted and every score is explainable.",
    scorecardTitle: "Syria Market-Entry Readiness Scorecard",
    scorecardDesc:
      "A 0–100 readiness score across data, stakeholder communications, local trust, and brand localization — with your risks flagged in plain language.",
    comingSoon: "Coming soon",
    roiTitle: "AI Marketing ROI Calculator",
    roiDesc:
      "Estimated efficiency and revenue gains from AI-assisted marketing, benchmarked to cited public figures.",
    inactionTitle: "Cost of Inaction Calculator",
    inactionDesc:
      "What delaying AI-marketing adoption is likely costing you, using cited public multipliers.",
    roadmapTitle: "Campaign Roadmap Simulator",
    roadmapDesc:
      "A simulated entry-campaign roadmap for your sector and budget tier — a preview of how we actually think.",
    startTool: "Start",
    next: "Next",
    back: "Back",
    seeResults: "See my results",
    emailGateHeading: "Where should we send your results?",
    emailGateBody:
      "Enter your email to view your score. No spam — see our privacy policy.",
    emailPlaceholder: "you@company.com",
    alsoSubscribe: "Also send me the Tibyan Briefing (newsletter)",
    yourScore: "Your readiness score",
    dimensionScores: "By dimension",
    flaggedRisks: "Flagged risks",
    discussCta: "Book a call to discuss your score",
    methodologyNote:
      "Scores are computed with the Tibyan readiness model v1. Every weighting is documented — ask us and we'll walk you through it.",
    errorGeneric: "Something went wrong. Please try again.",
    invalidEmail: "Please enter a valid email address.",
  },
  newsletter: {
    heading: "The Tibyan Briefing",
    body: "A briefing on marketing, AI, and Syria's reconstruction economy. Native in Arabic and English. No noise.",
    emailPlaceholder: "you@company.com",
    languagePref: "Language",
    langEn: "English",
    langAr: "Arabic",
    langBoth: "Both",
    subscribe: "Subscribe",
    success: "You're on the list — thank you.",
    pending: "Almost there — check your inbox to confirm your subscription.",
    error: "Subscription failed. Please try again.",
    orFollow: "Prefer LinkedIn?",
    linkedinCta: "Follow the Briefing on LinkedIn",
  },
  contact: {
    heading: "Contact",
    whatsappCta: "Message us on WhatsApp",
    whatsappNote: "Fastest first contact — we reply within one business day.",
    emailCta: "Email us",
    emailNote: "For proposals, documents, and anything formal.",
    formHeading: "Or send a message",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send message",
    sent: "Thank you — we'll get back to you within one business day.",
    error: "Sending failed. Please try again.",
  },
  booking: {
    heading: "Book a call",
    body: "A 30-minute conversation about your market-entry situation. To route you to the right conversation, the booking form asks three things: your sector, investment stage, and primary market of origin.",
    cta: "Open the booking calendar",
    opensInNewTab:
      "Opens Google Calendar in a new tab — pick a time and you'll get a Google Meet invite.",
    fallback:
      "Our booking calendar is being set up. In the meantime, reach us on WhatsApp or by email and we'll schedule directly.",
  },
  footer: {
    legal: "Legal",
    privacy: "Privacy policy",
    terms: "Terms of use",
    rights: "All rights reserved.",
    positioning:
      "Bilingual marketing and communications strategy for Syria's reconstruction economy.",
  },
  cta: {
    band: "Ready to talk about your market entry?",
    bandSub:
      "Start with the readiness scorecard, or go straight to a conversation.",
  },
  insights: {
    heading: "Insights",
    sub: "Analysis on marketing, AI, and Syria's reconstruction economy — written natively in Arabic and English.",
    updated: "Updated",
    minRead: "min read",
    fallbackNotice:
      "This article has not been published in English yet — you are reading the original-language version.",
  },
  consent: {
    message:
      "We use cookies and Google Tag Manager to understand how the site is used. Accept to help us improve it — essential functions work either way.",
    accept: "Accept",
    reject: "Decline",
    preferences: "Cookie preferences",
  },
  a11y: {
    skipToContent: "Skip to content",
  },
};

/**
 * Arabic copy is drafted natively, not translated line-by-line —
 * per the brief's "bilingual as craft" rule.
 */
const ar: typeof en = {
  nav: {
    services: "خدماتنا",
    sectors: "القطاعات",
    insights: "رؤى",
    tools: "الأدوات",
    about: "من نحن",
    bookACall: "احجز مكالمة",
    contact: "تواصل معنا",
  },
  brand: {
    name: "تبيان",
    nameArabic: "تبيان",
    tagline:
      "استراتيجيات التسويق والعلامة التجارية للمستثمرين في اقتصاد إعادة إعمار سوريا.",
    subline:
      "قائمة على الأدلة. ثنائية اللغة بحق. مصمَّمة لسوقٍ تندر فيه البيانات وتُبنى فيه الثقة من الصفر.",
  },
  hero: {
    credibility:
      "أُلغي قانون قيصر في كانون الأول 2025 وعاد المصرف المركزي السوري إلى نظام سويفت — اقتصاد إعادة الإعمار مفتوح. أما البيانات الموثوقة وثقة السوق فما تزال نادرة. وهذه الفجوة هي عملنا.",
    primaryCta: "احسب جاهزيتك لدخول السوق",
    secondaryCta: "احجز مكالمة",
  },
  problems: {
    heading: "أربع مشكلات يتشاركها كل مستثمر هنا",
    sub: "أيًّا كان قطاعك أو بلد المنشأ، فإن دخول السوق السورية يعني حل المشكلات الأربع نفسها.",
    items: [
      {
        title: "ندرة البيانات",
        body: "أبحاث السوق الموثوقة شبه معدومة. نبني نماذج بيانات بديلة ونصمّم أبحاثًا ميدانية لتستند قراراتك إلى أدلة لا انطباعات.",
      },
      {
        title: "التدقيق والمساءلة",
        body: "استثمارات إعادة الإعمار تحت أنظار الإعلام والجهات الرقابية والمجتمعات المحلية. يجب أن تُبنى اتصالاتك لتصمد أمام التدقيق لا لتجمّل الواقع.",
      },
      {
        title: "بناء الثقة من الصفر",
        body: "لا رصيد لعلامتك ولا سجلّ محليًا لها. الثقة تُبنى عمدًا، بالعربية، ومع الشركاء المحليين وشركاء الاغتراب المناسبين.",
      },
      {
        title: "التواصل متعدد الجمهور",
        body: "المستهلكون والشركاء السوريون بالعربية. أصحاب المصلحة الدوليون بالإنجليزية. الجهات الحكومية والمجتمعية باللغتين — كتابةً أصيلة لا ترجمة.",
      },
    ],
  },
  sections: {
    services: "ماذا نقدّم",
    sectors: "القطاعات التي نخدمها",
    latestInsights: "أحدث الرؤى",
    methodology: "كيف نعمل",
    allServices: "جميع الخدمات",
    allSectors: "جميع القطاعات",
    allInsights: "جميع المقالات",
    readMore: "اقرأ المزيد",
    relatedServices: "خدمات ذات صلة",
    tiersHeading: "صيغ التعاون",
  },
  methodology: {
    steps: [
      {
        title: "التدقيق",
        body: "تدقيق جاهزية منهجي: وضع بياناتك، وخريطة أصحاب المصلحة، وحالة التوطين اللغوي، ومخاطر الاتصال.",
      },
      {
        title: "الاستراتيجية",
        body: "استراتيجية تسويق واتصالات لدخول السوق، بجمهور محدد وقنوات واضحة ودليل خلف كل افتراض.",
      },
      {
        title: "التنفيذ",
        body: "محتوى عربي أولًا، وعمليات حملات معزّزة بالذكاء الاصطناعي، واتصالات أصحاب المصلحة — بقياس وتقارير دورية.",
      },
    ],
  },
  tools: {
    heading: "أدوات تفاعلية",
    sub: "أدوات قائمة على الأدلة لا على الاستعراض. كل افتراض موثّق بمصدره وكل نتيجة قابلة للتفسير.",
    scorecardTitle: "مؤشر الجاهزية لدخول السوق السورية",
    scorecardDesc:
      "درجة جاهزية من 0 إلى 100 عبر أربعة أبعاد: البيانات، واتصالات أصحاب المصلحة، والثقة المحلية، وتوطين العلامة — مع مخاطرك مشروحة بلغة واضحة.",
    comingSoon: "قريبًا",
    roiTitle: "حاسبة عائد التسويق بالذكاء الاصطناعي",
    roiDesc:
      "تقدير لمكاسب الكفاءة والإيرادات من التسويق المعزّز بالذكاء الاصطناعي، مقارنةً بأرقام منشورة وموثّقة.",
    inactionTitle: "حاسبة كلفة التأخر",
    inactionDesc:
      "ما الذي يكلّفك إياه تأجيل تبنّي التسويق بالذكاء الاصطناعي، وفق مضاعِفات عامة موثّقة.",
    roadmapTitle: "محاكي خارطة الحملة",
    roadmapDesc:
      "خارطة طريق افتراضية لحملة دخول السوق حسب قطاعك وميزانيتك — عيّنة من طريقة تفكيرنا الفعلية.",
    startTool: "ابدأ",
    next: "التالي",
    back: "السابق",
    seeResults: "أظهر نتيجتي",
    emailGateHeading: "إلى أين نرسل نتيجتك؟",
    emailGateBody:
      "أدخل بريدك الإلكتروني لعرض نتيجتك. لا رسائل مزعجة — راجع سياسة الخصوصية.",
    emailPlaceholder: "you@company.com",
    alsoSubscribe: "أرسلوا لي أيضًا نشرة تبيان",
    yourScore: "درجة جاهزيتك",
    dimensionScores: "حسب البعد",
    flaggedRisks: "مخاطر ملحوظة",
    discussCta: "احجز مكالمة لمناقشة نتيجتك",
    methodologyNote:
      "تُحسب الدرجات بنموذج تبيان للجاهزية، الإصدار الأول. كل وزن موثّق — اسألنا ونشرح لك المنهجية كاملة.",
    errorGeneric: "حدث خطأ ما. يرجى المحاولة مجددًا.",
    invalidEmail: "يرجى إدخال بريد إلكتروني صحيح.",
  },
  newsletter: {
    heading: "نشرة تبيان",
    body: "نشرة موجزة عن التسويق والذكاء الاصطناعي واقتصاد إعادة إعمار سوريا. تُكتب بالعربية والإنجليزية كتابةً أصيلة. بلا ضجيج.",
    emailPlaceholder: "you@company.com",
    languagePref: "اللغة",
    langEn: "الإنجليزية",
    langAr: "العربية",
    langBoth: "كلتاهما",
    subscribe: "اشترك",
    success: "تم اشتراكك — شكرًا لك.",
    pending: "بقيت خطوة — تفقّد بريدك لتأكيد الاشتراك.",
    error: "تعذّر الاشتراك. يرجى المحاولة مجددًا.",
    orFollow: "تفضّل لينكد إن؟",
    linkedinCta: "تابع نشرة تبيان على لينكد إن",
  },
  contact: {
    heading: "تواصل معنا",
    whatsappCta: "راسلنا عبر واتساب",
    whatsappNote: "أسرع وسيلة للتواصل الأول — نرد خلال يوم عمل واحد.",
    emailCta: "راسلنا بالبريد",
    emailNote: "للعروض والمستندات وكل ما هو رسمي.",
    formHeading: "أو أرسل رسالة",
    name: "الاسم",
    email: "البريد الإلكتروني",
    message: "الرسالة",
    send: "إرسال",
    sent: "شكرًا لك — سنعاود التواصل خلال يوم عمل واحد.",
    error: "تعذّر الإرسال. يرجى المحاولة مجددًا.",
  },
  booking: {
    heading: "احجز مكالمة",
    body: "حوار لمدة ثلاثين دقيقة حول وضعك في دخول السوق. ولتوجيهك إلى المحادثة المناسبة، يسألك نموذج الحجز ثلاثة أسئلة: قطاعك، ومرحلة استثمارك، وسوق المنشأ الرئيسي.",
    cta: "افتح تقويم الحجز",
    opensInNewTab:
      "يفتح تقويم Google في نافذة جديدة — اختر موعدًا وستصلك دعوة Google Meet.",
    fallback:
      "تقويم الحجز قيد الإعداد حاليًا. يمكنك التواصل عبر واتساب أو البريد الإلكتروني وسنرتّب الموعد مباشرة.",
  },
  footer: {
    legal: "قانوني",
    privacy: "سياسة الخصوصية",
    terms: "شروط الاستخدام",
    rights: "جميع الحقوق محفوظة.",
    positioning:
      "استراتيجيات تسويق واتصالات ثنائية اللغة لاقتصاد إعادة إعمار سوريا.",
  },
  cta: {
    band: "جاهز للحديث عن دخولك إلى السوق؟",
    bandSub: "ابدأ بمؤشر الجاهزية، أو انتقل مباشرة إلى محادثة.",
  },
  insights: {
    heading: "رؤى",
    sub: "تحليلات في التسويق والذكاء الاصطناعي واقتصاد إعادة إعمار سوريا — تُكتب بالعربية والإنجليزية كتابةً أصيلة.",
    updated: "آخر تحديث",
    minRead: "دقائق قراءة",
    fallbackNotice:
      "لم تُنشر هذه المقالة بالعربية بعد — أنت تقرأ النسخة بلغتها الأصلية.",
  },
  consent: {
    message:
      "نستخدم ملفات تعريف الارتباط وGoogle Tag Manager لفهم كيفية استخدام الموقع. اقبل لمساعدتنا على تحسينه — والوظائف الأساسية تعمل في كل الأحوال.",
    accept: "أوافق",
    reject: "رفض",
    preferences: "تفضيلات الارتباط",
  },
  a11y: {
    skipToContent: "انتقل إلى المحتوى",
  },
};

const dictionaries = { en, ar };

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
