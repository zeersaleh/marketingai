import type { Metadata } from "next";
import { isLocale, type Locale, type Localized } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const content: Localized<{
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}> = {
  en: {
    title: "Terms of Use",
    updated: "Last updated: July 2026",
    sections: [
      {
        heading: "What this site provides",
        body: "This website provides information about Tibyan's consulting services and interactive tools that produce indicative, educational outputs. Tool results — including readiness scores — are directional estimates built on documented assumptions; they are not investment advice, legal advice, or a guarantee of any outcome.",
      },
      {
        heading: "No professional relationship",
        body: "Using this site or its tools does not create a consulting engagement. An engagement exists only under a signed agreement. In particular, nothing on this site constitutes legal, sanctions-compliance, or financial advice; you remain responsible for your own professional counsel.",
      },
      {
        heading: "Content and intellectual property",
        body: "All content, in both languages, and the methodologies behind the interactive tools are the property of Tibyan. You may quote brief excerpts with attribution and a link; reproduction at scale or commercial reuse requires written permission.",
      },
      {
        heading: "Acceptable use",
        body: "You agree not to misuse the site: no automated scraping of gated outputs, no attempts to circumvent the tools' access steps, and no submission of unlawful content through forms. We may decline or discontinue service where use conflicts with applicable law, including sanctions and export-control regulations.",
      },
    ],
  },
  ar: {
    title: "شروط الاستخدام",
    updated: "آخر تحديث: تموز 2026",
    sections: [
      {
        heading: "ما الذي يقدمه هذا الموقع",
        body: "يقدّم هذا الموقع معلومات عن خدمات تبيان الاستشارية وأدوات تفاعلية تنتج مخرجات استرشادية تعليمية. نتائج الأدوات — بما فيها درجات الجاهزية — تقديرات اتجاهية مبنية على افتراضات موثقة؛ وهي ليست نصيحة استثمارية أو قانونية ولا ضمانًا لأي نتيجة.",
      },
      {
        heading: "لا علاقة مهنية",
        body: "استخدام الموقع أو أدواته لا ينشئ تعاقدًا استشاريًا. فالتعاقد لا يقوم إلا باتفاق موقّع. وبوجه خاص، لا شيء في هذا الموقع يشكّل استشارة قانونية أو استشارة امتثال للعقوبات أو استشارة مالية؛ وتبقى مسؤولًا عن مستشاريك المهنيين.",
      },
      {
        heading: "المحتوى والملكية الفكرية",
        body: "جميع المحتوى، باللغتين، والمنهجيات التي تقوم عليها الأدوات التفاعلية ملك لتبيان. يجوز اقتباس مقاطع قصيرة مع الإسناد ورابط المصدر؛ أما إعادة النشر الواسعة أو الاستخدام التجاري فيتطلبان إذنًا خطيًا.",
      },
      {
        heading: "الاستخدام المقبول",
        body: "توافق على عدم إساءة استخدام الموقع: لا استخلاص آليًا للمخرجات المقيّدة، ولا محاولات لتجاوز خطوات الوصول في الأدوات، ولا إرسال محتوى غير قانوني عبر النماذج. ويحق لنا رفض الخدمة أو إيقافها حيث يتعارض الاستخدام مع القانون الواجب التطبيق، بما فيه أنظمة العقوبات وضوابط التصدير.",
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
    "/terms",
    content[locale].title,
    content[locale].sections[0].body.slice(0, 150)
  );
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const page = content[locale];

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold text-navy-900">{page.title}</h1>
      <p className="mt-2 text-sm text-ink-600">{page.updated}</p>
      <div className="mt-8 space-y-8">
        {page.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-xl font-semibold text-navy-900">
              {section.heading}
            </h2>
            <p className="mt-2 leading-relaxed text-ink-900">{section.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
