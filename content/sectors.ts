import type { Localized } from "@/lib/i18n";

export interface Sector {
  slug: string;
  name: Localized;
  context: Localized;
  needs: Localized<string[]>;
  serviceSlugs: string[];
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
  },
];

export function getSector(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug);
}
