import type { Localized } from "@/lib/i18n";

export interface ScorecardOption {
  value: string;
  label: Localized;
}

export interface ScorecardQuestion {
  id: string;
  label: Localized;
  options: ScorecardOption[];
}

export const SCORECARD_MODEL_VERSION = "v1";

export const scorecardQuestions: ScorecardQuestion[] = [
  {
    id: "sector",
    label: { en: "Which sector are you entering?", ar: "أي قطاع تدخل؟" },
    options: [
      { value: "energy-infrastructure", label: { en: "Energy & infrastructure", ar: "الطاقة والبنية التحتية" } },
      { value: "telecom-tech", label: { en: "Telecom & tech", ar: "الاتصالات والتقنية" } },
      { value: "real-estate-tourism", label: { en: "Real estate & tourism", ar: "العقارات والسياحة" } },
      { value: "healthcare", label: { en: "Healthcare", ar: "الرعاية الصحية" } },
      { value: "agriculture", label: { en: "Agriculture & agribusiness", ar: "الزراعة والصناعات الغذائية" } },
      { value: "banking-financial-services", label: { en: "Banking & financial services", ar: "الخدمات المصرفية والمالية" } },
    ],
  },
  {
    id: "budget",
    label: {
      en: "Target investment budget (USD)",
      ar: "الميزانية الاستثمارية المستهدفة (بالدولار)",
    },
    options: [
      { value: "under-250k", label: { en: "Under $250k", ar: "أقل من 250 ألفًا" } },
      { value: "250k-1m", label: { en: "$250k – $1M", ar: "من 250 ألفًا إلى مليون" } },
      { value: "1m-10m", label: { en: "$1M – $10M", ar: "من مليون إلى 10 ملايين" } },
      { value: "over-10m", label: { en: "Over $10M", ar: "أكثر من 10 ملايين" } },
    ],
  },
  {
    id: "risk",
    label: { en: "Your risk tolerance", ar: "قدرتك على تحمّل المخاطر" },
    options: [
      { value: "low", label: { en: "Low — we need strong certainty", ar: "منخفضة — نحتاج يقينًا عاليًا" } },
      { value: "medium", label: { en: "Medium — measured bets", ar: "متوسطة — رهانات محسوبة" } },
      { value: "high", label: { en: "High — early-mover appetite", ar: "مرتفعة — شهية الداخل المبكر" } },
    ],
  },
  {
    id: "mena-experience",
    label: {
      en: "Prior operating experience in MENA?",
      ar: "هل لديكم خبرة تشغيلية سابقة في المنطقة؟",
    },
    options: [
      { value: "yes", label: { en: "Yes", ar: "نعم" } },
      { value: "no", label: { en: "No", ar: "لا" } },
    ],
  },
  {
    id: "origin",
    label: { en: "Primary market of origin", ar: "سوق المنشأ الرئيسي" },
    options: [
      { value: "gulf", label: { en: "Gulf", ar: "الخليج" } },
      { value: "turkey", label: { en: "Turkey", ar: "تركيا" } },
      { value: "europe", label: { en: "Europe", ar: "أوروبا" } },
      { value: "north-america", label: { en: "North America", ar: "أمريكا الشمالية" } },
      { value: "diaspora", label: { en: "Syrian diaspora capital", ar: "رأسمال الاغتراب السوري" } },
      { value: "other", label: { en: "Other", ar: "أخرى" } },
    ],
  },
  {
    id: "data-position",
    label: {
      en: "Do you have Syria-specific market data for your sector?",
      ar: "هل لديكم بيانات سوق خاصة بسوريا في قطاعكم؟",
    },
    options: [
      { value: "none", label: { en: "None yet", ar: "لا شيء بعد" } },
      { value: "proxy", label: { en: "Some proxy or regional data", ar: "بيانات بديلة أو إقليمية جزئية" } },
      { value: "commissioned", label: { en: "Commissioned research in hand", ar: "بحث مُكلَّف به ومنجز" } },
    ],
  },
  {
    id: "stakeholder-plan",
    label: {
      en: "Do you have a stakeholder-communications plan for government and community bodies?",
      ar: "هل لديكم خطة اتصالات لأصحاب المصلحة من جهات حكومية ومجتمعية؟",
    },
    options: [
      { value: "no", label: { en: "No", ar: "لا" } },
      { value: "draft", label: { en: "A draft or partial plan", ar: "مسودة أو خطة جزئية" } },
      { value: "yes", label: { en: "Yes, a working plan", ar: "نعم، خطة فاعلة" } },
    ],
  },
  {
    id: "local-ties",
    label: {
      en: "Do you have local partners or diaspora ties on the ground?",
      ar: "هل لديكم شركاء محليون أو روابط اغتراب على الأرض؟",
    },
    options: [
      { value: "none", label: { en: "None", ar: "لا يوجد" } },
      { value: "informal", label: { en: "Informal relationships", ar: "علاقات غير رسمية" } },
      { value: "formal", label: { en: "Formal partnerships", ar: "شراكات رسمية" } },
    ],
  },
  {
    id: "localization",
    label: {
      en: "Is your brand content produced natively in Arabic?",
      ar: "هل يُنتج محتوى علامتكم بالعربية كتابةً أصيلة؟",
    },
    options: [
      { value: "no", label: { en: "No Arabic content yet", ar: "لا محتوى عربيًا بعد" } },
      { value: "translated", label: { en: "Translated from English", ar: "مترجم عن الإنجليزية" } },
      { value: "native", label: { en: "Drafted natively in Arabic", ar: "يُكتب بالعربية أصلًا" } },
    ],
  },
];

export type ScorecardAnswers = Record<string, string>;

export const scorecardDimensions = [
  { id: "data", label: { en: "Data readiness", ar: "جاهزية البيانات" } },
  {
    id: "stakeholder",
    label: { en: "Stakeholder communications", ar: "اتصالات أصحاب المصلحة" },
  },
  { id: "trust", label: { en: "Local trust", ar: "الثقة المحلية" } },
  {
    id: "localization",
    label: { en: "Brand localization", ar: "توطين العلامة" },
  },
] as const;

export type DimensionId = (typeof scorecardDimensions)[number]["id"];
