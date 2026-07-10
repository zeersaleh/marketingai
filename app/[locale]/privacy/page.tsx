import type { Metadata } from "next";
import { isLocale, type Locale, type Localized } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const content: Localized<{
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}> = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: July 2026",
    sections: [
      {
        heading: "What we collect",
        body: "We collect the information you give us directly: your email address when you subscribe to the newsletter or use an interactive tool, your answers within those tools, and the contents of messages you send through the contact form.",
      },
      {
        heading: "Cookies and analytics",
        body: "We use Google Tag Manager to load analytics and measurement tags that help us understand how the site is used. These set cookies only after you accept them: on your first visit a banner lets you accept or decline, non-essential tracking stays off until you accept (Google Consent Mode), and you can change your choice any time via \"Cookie preferences\" in the footer. Essential functions work whether or not you accept.",
      },
      {
        heading: "How we use it",
        body: "Tool answers are used to compute your results and to prepare for a consultation if you book one. Your email is used to send the results you requested and, only if you opted in, the Tibyan newsletter. Newsletter subscriptions are confirmed by double opt-in and every issue contains an unsubscribe link.",
      },
      {
        heading: "Where it is stored and who sees it",
        body: "Lead data is stored in our own database and may be synchronized with the customer-relationship and email-delivery providers we use to operate the service. We do not sell personal data, and we do not share it with third parties beyond these processors.",
      },
      {
        heading: "Your rights",
        body: "You may request access to, correction of, or deletion of your personal data at any time by contacting us. If you are in the EU/EEA, you have the rights provided by the GDPR, including the right to lodge a complaint with your supervisory authority.",
      },
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    updated: "آخر تحديث: تموز 2026",
    sections: [
      {
        heading: "ما الذي نجمعه",
        body: "نجمع المعلومات التي تقدّمها لنا مباشرة: بريدك الإلكتروني عند الاشتراك في النشرة أو استخدام أداة تفاعلية، وإجاباتك داخل تلك الأدوات، ومحتوى الرسائل المرسلة عبر نموذج التواصل.",
      },
      {
        heading: "ملفات تعريف الارتباط والتحليلات",
        body: "نستخدم Google Tag Manager لتحميل وسوم التحليلات والقياس التي تساعدنا على فهم كيفية استخدام الموقع. ولا تُفعَّل ملفات تعريف الارتباط إلا بعد موافقتك: في زيارتك الأولى يظهر شريط يتيح لك القبول أو الرفض، ويبقى التتبع غير الأساسي متوقفًا حتى توافق (وفق وضع الموافقة من Google)، ويمكنك تغيير اختيارك في أي وقت عبر «تفضيلات الارتباط» في تذييل الصفحة. أما الوظائف الأساسية فتعمل سواء وافقت أم لا.",
      },
      {
        heading: "كيف نستخدمها",
        body: "تُستخدم إجابات الأدوات لحساب نتيجتك وللتحضير للاستشارة إن حجزت واحدة. ويُستخدم بريدك لإرسال النتائج التي طلبتها، ولإرسال نشرة تبيان فقط إذا اخترت الاشتراك بها. تُؤكَّد الاشتراكات بخطوة تأكيد مزدوجة، وكل عدد يتضمن رابط إلغاء الاشتراك.",
      },
      {
        heading: "أين تُخزَّن ومن يطّلع عليها",
        body: "تُخزَّن بيانات التواصل في قاعدة بياناتنا الخاصة وقد تُزامَن مع مزوّدي إدارة علاقات العملاء وتوصيل البريد الذين نعتمدهم لتشغيل الخدمة. لا نبيع البيانات الشخصية ولا نشاركها مع أطراف ثالثة خارج هؤلاء المعالجين.",
      },
      {
        heading: "حقوقك",
        body: "يمكنك في أي وقت طلب الاطلاع على بياناتك الشخصية أو تصحيحها أو حذفها بالتواصل معنا. وإن كنت في الاتحاد الأوروبي، فلك الحقوق التي تكفلها اللائحة العامة لحماية البيانات، بما فيها حق تقديم شكوى إلى سلطة الرقابة في بلدك.",
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
    "/privacy",
    content[locale].title,
    content[locale].sections[0].body.slice(0, 150)
  );
}

export default async function PrivacyPage({
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
