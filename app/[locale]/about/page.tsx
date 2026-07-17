import type { Metadata } from "next";
import {
  founderName,
  isLocale,
  socialLinks,
  type Locale,
  type Localized,
} from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import { JsonLd, founderPerson } from "@/lib/jsonld";
import CtaBand from "@/components/CtaBand";

const content: Localized<{
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}> = {
  en: {
    title: "About Tibyan",
    intro:
      "Tibyan (تبيان) means elucidation — making things clear. It is what this consultancy sells: clarity of evidence, clarity of communication, and clarity of trust, in a market that has little of all three ready-made.",
    sections: [
      {
        heading: "Where we come from",
        body: "Tibyan's founding perspective combines hands-on MENA B2B export experience — years of building trade relationships in the marble and stone sector across the region — with doctoral research in geoeconomics and de-dollarization. That pairing matters: we have sold real goods into these markets, and we study the macro currents that decide where capital can move. Syria's reconstruction sits exactly at that intersection.",
      },
      {
        heading: "How an engagement actually works",
        body: "Every engagement starts with a readiness audit: what you know, what you assume, and what the gap costs. Strategy follows evidence — proxy-data models where syndicated data doesn't exist, primary research where the decision justifies it. Execution is Arabic-first and measured monthly against the assumptions we wrote down at the start, so you can audit us the way we audit the market.",
      },
      {
        heading: "How we evaluate AI tools",
        body: "Before any AI tool enters a client recommendation, it passes a documented evaluation: data handling and residency, Arabic-language quality (tested natively, not benchmarked in English), output reliability on real marketing tasks, and total cost against the workflow it replaces. We publish our criteria and will walk any client through the scoring of any tool we recommend.",
      },
      {
        heading: "What genuinely bilingual means",
        body: "Both languages are drafted from one strategic brief — Arabic is never a translation pass at the end. Register, rhythm, and reference are drafting decisions, and Syrian, Gulf, and diaspora readers each get copy written for them. The same discipline applies to design: our RTL layouts are designed, not mirrored.",
      },
    ],
  },
  ar: {
    title: "عن تبيان",
    intro:
      "تبيان: الإيضاح وجلاء الأمر. وهو ما تقدّمه هذه الاستشارية بالضبط: وضوح الأدلة، ووضوح الاتصال، ووضوح الثقة، في سوق لا يتوافر فيه شيء من ذلك جاهزًا.",
    sections: [
      {
        heading: "من أين أتينا",
        body: "تجمع رؤية تبيان التأسيسية بين خبرة تصدير عملية بين أسواق المنطقة — سنوات من بناء علاقات تجارية في قطاع الرخام والحجر — وبحث دكتوراه في الجيواقتصاد والتحرر من الدولرة. ولهذا الجمع معناه: لقد بعنا سلعًا حقيقية في هذه الأسواق، وندرس التيارات الكلية التي تقرر أين يمكن لرأس المال أن يتحرك. وإعادة إعمار سوريا تقع في قلب هذا التقاطع تمامًا.",
      },
      {
        heading: "كيف يسير التعاون فعليًا",
        body: "يبدأ كل تعاون بتدقيق جاهزية: ما تعرفه، وما تفترضه، وكم تكلّف الفجوة بينهما. ثم تتبع الاستراتيجيةُ الأدلةَ — نماذج بيانات بديلة حيث لا بيانات جاهزة، وبحث ميداني حيث يبرر القرار كلفته. أما التنفيذ فعربيّ أولًا، ويُقاس شهريًا على الافتراضات التي دوّناها في البداية، لتتمكن من تدقيق عملنا كما ندقق نحن في السوق.",
      },
      {
        heading: "كيف نقيّم أدوات الذكاء الاصطناعي",
        body: "قبل أن تدخل أي أداة ذكاء اصطناعي في توصياتنا لعميل، تجتاز تقييمًا موثقًا: التعامل مع البيانات ومكان إقامتها، وجودة اللغة العربية (تُختبر بالعربية لا بمعايير إنجليزية)، وموثوقية المخرجات في مهام تسويقية حقيقية، والكلفة الكلية مقابل سير العمل الذي تستبدله. معاييرنا معلنة، ونشرح لأي عميل تقييم أي أداة نوصي بها.",
      },
      {
        heading: "ماذا تعني ثنائية اللغة الحقيقية",
        body: "تُكتب اللغتان من موجز استراتيجي واحد — والعربية ليست أبدًا مرحلة ترجمة في النهاية. فالمقام والإيقاع والمرجعية قرارات كتابة، ولقارئ سوريا وقارئ الخليج وقارئ الاغتراب نصوص تُكتب لكل منهم. والانضباط نفسه في التصميم: تخطيطاتنا من اليمين إلى اليسار تُصمَّم ولا تُعكَس.",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(
    locale,
    "/about",
    content[locale].title,
    content[locale].intro
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const page = content[locale];
  getDictionary(locale);

  const founderLabels =
    locale === "ar"
      ? {
          role: "المؤسس",
          blurb:
            "خبرة تصدير عملية بين أسواق المنطقة، وباحث دكتوراه في الجيواقتصاد. يقود تبيان من التقاطع بين التجارة الحقيقية والتحليل الكلي.",
          linkedin: "لينكد إن",
          x: "إكس (تويتر)",
        }
      : {
          role: "Founder",
          blurb:
            "Hands-on MENA B2B trade experience and doctoral research in geoeconomics. Leads Tibyan from the intersection of real trade and macro analysis.",
          linkedin: "LinkedIn",
          x: "X (Twitter)",
        };

  return (
    <>
      <JsonLd
        data={{ "@context": "https://schema.org", ...founderPerson(locale) }}
      />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-bold text-navy-900">{page.title}</h1>
        <p className="mt-4 border-s-4 border-gold-500 ps-4 text-lg leading-relaxed text-ink-900">
          {page.intro}
        </p>

        {/* Founder card */}
        <div className="mt-10 rounded-xl border border-sand-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
            {founderLabels.role}
          </p>
          <p className="mt-1 text-2xl font-bold text-navy-900">
            {founderName[locale]}
          </p>
          <p className="mt-2 leading-relaxed text-ink-600">
            {founderLabels.blurb}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-sand-50 hover:bg-navy-800"
            >
              {founderLabels.linkedin}
            </a>
            <a
              href={socialLinks.x}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-sand-200 px-4 py-2 text-sm font-semibold text-navy-900 hover:border-gold-500"
            >
              {founderLabels.x}
            </a>
          </div>
        </div>

        <div className="mt-10 space-y-10">
          {page.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-2xl font-semibold text-navy-900">
                {section.heading}
              </h2>
              <p className="mt-3 leading-relaxed text-ink-900">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}
