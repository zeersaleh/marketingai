import type { Localized } from "@/lib/i18n";
import type { Faq } from "@/content/services";

export interface Sector {
  slug: string;
  name: Localized;
  context: Localized;
  needs: Localized<string[]>;
  serviceSlugs: string[];
  faqs: Faq[];
}

export const sectors: Sector[] = [
  {
    slug: "energy-infrastructure",
    name: { en: "Energy & Infrastructure", ar: "الطاقة والبنية التحتية" },
    context: {
      en: "Power, water, transport, and construction are where reconstruction capital lands first — and where government and community relationships decide whether projects move.",
      ar: "الكهرباء والمياه والنقل والإنشاءات هي أولى محطات رأسمال إعادة الإعمار — وفيها تُقرّر العلاقات الحكومية والمجتمعية مصير المشاريع.",
    },
    needs: {
      en: [
        "Government- and stakeholder-facing communications in both languages",
        "Technical credibility content that survives expert scrutiny",
        "Community communications around project impact",
      ],
      ar: [
        "اتصالات موجهة للجهات الحكومية وأصحاب المصلحة باللغتين",
        "محتوى مصداقية تقنية يصمد أمام تدقيق الخبراء",
        "تواصل مجتمعي حول أثر المشاريع",
      ],
    },
    serviceSlugs: ["responsible-investment-communications", "market-entry-strategy"],
    faqs: [
      {
        question: {
          en: "Why does marketing matter for energy and infrastructure projects in Syria?",
          ar: "لماذا يهمّ التسويق مشاريعَ الطاقة والبنية التحتية في سوريا؟",
        },
        answer: {
          en: "Power, water, transport, and construction are where reconstruction capital lands first — and government and community relationships decide whether projects move.",
          ar: "الكهرباء والمياه والنقل والإنشاءات هي أولى محطات رأسمال إعادة الإعمار — وفيها تُقرّر العلاقات الحكومية والمجتمعية مصير المشاريع.",
        },
      },
      {
        question: {
          en: "What communications do these projects need?",
          ar: "ما الاتصالات التي تحتاجها هذه المشاريع؟",
        },
        answer: {
          en: "Government- and stakeholder-facing communications in both languages, technical credibility content that survives expert scrutiny, and community communications around project impact.",
          ar: "اتصالات موجهة للجهات الحكومية وأصحاب المصلحة باللغتين، ومحتوى مصداقية تقنية يصمد أمام تدقيق الخبراء، وتواصل مجتمعي حول أثر المشاريع.",
        },
      },
      {
        question: {
          en: "Which Tibyan services fit this sector?",
          ar: "أي خدمات تبيان تناسب هذا القطاع؟",
        },
        answer: {
          en: "Responsible Investment Communications and Market-Entry Strategy.",
          ar: "اتصالات الاستثمار المسؤول واستراتيجية دخول السوق.",
        },
      },
    ],
  },
  {
    slug: "telecom-tech",
    name: { en: "Telecom & Tech", ar: "الاتصالات والتقنية" },
    context: {
      en: "Consumer-scale entries into a young, mobile-first population — with brand entry, digital campaigns, and speed as the deciding factors.",
      ar: "دخول واسع نحو جمهور شاب يعتمد الهاتف أولًا — حيث تحسم العلامة والحملات الرقمية والسرعة النتيجة.",
    },
    needs: {
      en: [
        "Consumer brand entry built natively in Arabic",
        "Digital-first campaign infrastructure",
        "AI-assisted personalization at scale",
      ],
      ar: [
        "دخول علامة استهلاكية مبني بالعربية أصلًا",
        "بنية حملات رقمية أولًا",
        "تخصيص واسع معزّز بالذكاء الاصطناعي",
      ],
    },
    serviceSlugs: ["ai-marketing-execution", "market-entry-strategy"],
    faqs: [
      {
        question: {
          en: "What makes Syria a consumer-scale opportunity for telecom and tech?",
          ar: "ما الذي يجعل سوريا فرصة استهلاكية واسعة للاتصالات والتقنية؟",
        },
        answer: {
          en: "Entries target a young, mobile-first population — with brand entry, digital campaigns, and speed as the deciding factors.",
          ar: "الدخول يستهدف جمهورًا شابًا يعتمد الهاتف أولًا — حيث تحسم العلامة والحملات الرقمية والسرعة النتيجة.",
        },
      },
      {
        question: {
          en: "What do telecom and tech entrants need from marketing?",
          ar: "ماذا يحتاج الداخلون في الاتصالات والتقنية من التسويق؟",
        },
        answer: {
          en: "A consumer brand entry built natively in Arabic, digital-first campaign infrastructure, and AI-assisted personalization at scale.",
          ar: "دخول علامة استهلاكية مبني بالعربية أصلًا، وبنية حملات رقمية أولًا، وتخصيص واسع معزّز بالذكاء الاصطناعي.",
        },
      },
      {
        question: {
          en: "Which Tibyan services fit this sector?",
          ar: "أي خدمات تبيان تناسب هذا القطاع؟",
        },
        answer: {
          en: "AI Marketing Execution and Market-Entry Strategy.",
          ar: "تنفيذ التسويق بالذكاء الاصطناعي واستراتيجية دخول السوق.",
        },
      },
    ],
  },
  {
    slug: "real-estate-tourism",
    name: { en: "Real Estate & Tourism", ar: "العقارات والسياحة" },
    context: {
      en: "Aspirational brand-building for developments whose earliest buyers are often diaspora families investing in a return.",
      ar: "بناء علامة طموحة لمشاريع غالبًا ما يكون أول مشتريها عائلات مغتربة تستثمر في عودةٍ ما.",
    },
    needs: {
      en: [
        "Aspirational visual storytelling across AR/EN",
        "Diaspora engagement and sales programs",
        "Trust-building for off-plan commitments",
      ],
      ar: [
        "سرد بصري طموح بالعربية والإنجليزية",
        "برامج تفاعل ومبيعات موجهة للاغتراب",
        "بناء الثقة لالتزامات الشراء على الخارطة",
      ],
    },
    serviceSlugs: ["diaspora-bridge-strategy", "ai-marketing-execution"],
    faqs: [
      {
        question: {
          en: "Who are the earliest buyers in Syrian real estate developments?",
          ar: "من هم أول المشترين في المشاريع العقارية السورية؟",
        },
        answer: {
          en: "The earliest buyers are often diaspora families investing in a return — which is why aspirational brand-building and diaspora engagement decide sales.",
          ar: "غالبًا ما يكون أول المشترين عائلات مغتربة تستثمر في عودةٍ ما — ولهذا يحسم بناءُ العلامة الطموح والتفاعل مع الاغتراب المبيعات.",
        },
      },
      {
        question: {
          en: "What does marketing for this sector require?",
          ar: "ماذا يتطلب التسويق في هذا القطاع؟",
        },
        answer: {
          en: "Aspirational visual storytelling across Arabic and English, diaspora engagement and sales programs, and trust-building for off-plan commitments.",
          ar: "سرد بصري طموح بالعربية والإنجليزية، وبرامج تفاعل ومبيعات موجهة للاغتراب، وبناء الثقة لالتزامات الشراء على الخارطة.",
        },
      },
      {
        question: {
          en: "Which Tibyan services fit this sector?",
          ar: "أي خدمات تبيان تناسب هذا القطاع؟",
        },
        answer: {
          en: "Diaspora & Community Bridge Strategy and AI Marketing Execution.",
          ar: "استراتيجية جسر الاغتراب والمجتمع وتنفيذ التسويق بالذكاء الاصطناعي.",
        },
      },
    ],
  },
  {
    slug: "healthcare",
    name: { en: "Healthcare", ar: "الرعاية الصحية" },
    context: {
      en: "Operators entering a system under rebuild, where community trust — not advertising — determines patient flow.",
      ar: "مشغّلون يدخلون منظومة تُعاد صياغتها، حيث تحدد ثقة المجتمع — لا الإعلانات — تدفق المرضى.",
    },
    needs: {
      en: [
        "Trust-heavy, community-facing communications",
        "Clinical credibility content in Arabic",
        "Partnership communications with local providers",
      ],
      ar: [
        "اتصالات مجتمعية قائمة على الثقة",
        "محتوى مصداقية سريرية بالعربية",
        "اتصالات شراكة مع مقدّمي الرعاية المحليين",
      ],
    },
    serviceSlugs: ["responsible-investment-communications", "diaspora-bridge-strategy"],
    faqs: [
      {
        question: {
          en: "What determines patient flow for healthcare operators in Syria?",
          ar: "ما الذي يحدد تدفق المرضى لمشغّلي الرعاية الصحية في سوريا؟",
        },
        answer: {
          en: "Community trust — not advertising — determines patient flow in a system under rebuild.",
          ar: "ثقة المجتمع — لا الإعلانات — هي ما يحدد تدفق المرضى في منظومة تُعاد صياغتها.",
        },
      },
      {
        question: {
          en: "What communications does this sector need?",
          ar: "ما الاتصالات التي يحتاجها هذا القطاع؟",
        },
        answer: {
          en: "Trust-heavy, community-facing communications, clinical credibility content in Arabic, and partnership communications with local providers.",
          ar: "اتصالات مجتمعية قائمة على الثقة، ومحتوى مصداقية سريرية بالعربية، واتصالات شراكة مع مقدّمي الرعاية المحليين.",
        },
      },
      {
        question: {
          en: "Which Tibyan services fit this sector?",
          ar: "أي خدمات تبيان تناسب هذا القطاع؟",
        },
        answer: {
          en: "Responsible Investment Communications and Diaspora & Community Bridge Strategy.",
          ar: "اتصالات الاستثمار المسؤول واستراتيجية جسر الاغتراب والمجتمع.",
        },
      },
    ],
  },
  {
    slug: "agriculture",
    name: { en: "Agriculture & Agribusiness", ar: "الزراعة والصناعات الغذائية" },
    context: {
      en: "Practical entries built on cooperative and community relationships, where localized messaging matters more than polish.",
      ar: "دخول عملي يقوم على علاقات التعاونيات والمجتمعات، حيث تفوق أهميةُ الرسائل المحلية بريقَ الإخراج.",
    },
    needs: {
      en: [
        "Practical, localized messaging for producers and cooperatives",
        "Community and partner relationship programs",
        "Supply-chain trust communications",
      ],
      ar: [
        "رسائل عملية محلية للمنتجين والتعاونيات",
        "برامج علاقات مع المجتمع والشركاء",
        "اتصالات ثقة عبر سلسلة التوريد",
      ],
    },
    serviceSlugs: ["market-entry-strategy", "diaspora-bridge-strategy"],
    faqs: [
      {
        question: {
          en: "What does marketing look like for agribusiness in Syria?",
          ar: "كيف يبدو التسويق للصناعات الغذائية والزراعة في سوريا؟",
        },
        answer: {
          en: "Practical entries built on cooperative and community relationships, where localized messaging matters more than polish.",
          ar: "دخول عملي يقوم على علاقات التعاونيات والمجتمعات، حيث تفوق أهميةُ الرسائل المحلية بريقَ الإخراج.",
        },
      },
      {
        question: {
          en: "What does this sector need from marketing?",
          ar: "ماذا يحتاج هذا القطاع من التسويق؟",
        },
        answer: {
          en: "Practical, localized messaging for producers and cooperatives, community and partner relationship programs, and supply-chain trust communications.",
          ar: "رسائل عملية محلية للمنتجين والتعاونيات، وبرامج علاقات مع المجتمع والشركاء، واتصالات ثقة عبر سلسلة التوريد.",
        },
      },
      {
        question: {
          en: "Which Tibyan services fit this sector?",
          ar: "أي خدمات تبيان تناسب هذا القطاع؟",
        },
        answer: {
          en: "Market-Entry Strategy and Diaspora & Community Bridge Strategy.",
          ar: "استراتيجية دخول السوق واستراتيجية جسر الاغتراب والمجتمع.",
        },
      },
    ],
  },
  {
    slug: "banking-financial-services",
    name: { en: "Banking & Financial Services", ar: "الخدمات المصرفية والمالية" },
    context: {
      en: "With SWIFT reconnection underway and card networks returning, financial institutions are among the earliest movers — carrying the heaviest trust and compliance-communication burden of any sector.",
      ar: "مع استئناف الربط بنظام سويفت وعودة شبكات البطاقات، تُعدّ المؤسسات المالية من أوائل الداخلين — وتحمل أثقل أعباء الثقة واتصالات الامتثال بين القطاعات كلها.",
    },
    needs: {
      en: [
        "Consumer trust-building for banking services from zero",
        "Compliance-aware communications built for regulator scrutiny",
        "Financial-literacy content as a market-building asset",
      ],
      ar: [
        "بناء ثقة المستهلك بالخدمات المصرفية من الصفر",
        "اتصالات واعية بالامتثال تصمد أمام تدقيق الجهات الرقابية",
        "محتوى ثقافة مالية كأصل لبناء السوق",
      ],
    },
    serviceSlugs: ["responsible-investment-communications", "ai-marketing-execution"],
    faqs: [
      {
        question: {
          en: "Why are financial institutions among the earliest movers in Syria?",
          ar: "لماذا تُعدّ المؤسسات المالية من أوائل الداخلين إلى سوريا؟",
        },
        answer: {
          en: "With SWIFT reconnection underway and card networks returning, financial institutions are among the earliest movers — carrying the heaviest trust and compliance-communication burden of any sector.",
          ar: "مع استئناف الربط بنظام سويفت وعودة شبكات البطاقات، تُعدّ المؤسسات المالية من أوائل الداخلين — وتحمل أثقل أعباء الثقة واتصالات الامتثال بين القطاعات كلها.",
        },
      },
      {
        question: {
          en: "What communications does this sector need?",
          ar: "ما الاتصالات التي يحتاجها هذا القطاع؟",
        },
        answer: {
          en: "Consumer trust-building for banking services from zero, compliance-aware communications built for regulator scrutiny, and financial-literacy content as a market-building asset.",
          ar: "بناء ثقة المستهلك بالخدمات المصرفية من الصفر، واتصالات واعية بالامتثال تصمد أمام تدقيق الجهات الرقابية، ومحتوى ثقافة مالية كأصل لبناء السوق.",
        },
      },
      {
        question: {
          en: "Which Tibyan services fit this sector?",
          ar: "أي خدمات تبيان تناسب هذا القطاع؟",
        },
        answer: {
          en: "Responsible Investment Communications and AI Marketing Execution.",
          ar: "اتصالات الاستثمار المسؤول وتنفيذ التسويق بالذكاء الاصطناعي.",
        },
      },
    ],
  },
];

export function getSector(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug);
}
