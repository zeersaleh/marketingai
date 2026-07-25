import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { getCategory } from "@/lib/categories";
import CategoryArchive, {
  categoryArchiveMetadata,
} from "@/components/CategoryArchive";

const category = getCategory("syria-market-entry")!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return categoryArchiveMetadata(locale, category);
}

export default async function SyriaMarketEntryArchive({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <CategoryArchive locale={locale} category={category} />;
}
