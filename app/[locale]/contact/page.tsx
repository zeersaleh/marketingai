import type { Metadata } from "next";
import { contactEmail, isLocale, whatsappNumber, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata(
    locale,
    "/contact",
    dict.contact.heading,
    dict.contact.whatsappNote
  );
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const whatsapp = whatsappNumber;

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-4xl font-bold text-navy-900">
        {dict.contact.heading}
      </h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {whatsapp && (
          <div className="rounded-xl border border-sand-200 bg-white p-6 shadow-sm">
            <a
              href={`https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md bg-[#128C4A] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              {dict.contact.whatsappCta}
            </a>
            <p className="mt-3 text-sm text-ink-600">
              {dict.contact.whatsappNote}
            </p>
          </div>
        )}
        <div className="rounded-xl border border-sand-200 bg-white p-6 shadow-sm">
          <a
            href={`mailto:${contactEmail}`}
            className="inline-block rounded-md bg-navy-900 px-5 py-3 text-sm font-semibold text-sand-50 hover:bg-navy-800"
          >
            {dict.contact.emailCta}
          </a>
          <p className="mt-3 text-sm text-ink-600">{dict.contact.emailNote}</p>
          <p dir="ltr" className="mt-1 text-sm font-medium text-navy-900">
            {contactEmail}
          </p>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold text-navy-900">
        {dict.contact.formHeading}
      </h2>
      <div className="mt-4">
        <ContactForm locale={locale} labels={dict.contact} />
      </div>
    </section>
  );
}
