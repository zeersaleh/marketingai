import { redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { confirmSubscriber } from "@/lib/leads";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  const result = await confirmSubscriber(token);
  const locale = result && isLocale(result.locale) ? result.locale : "en";
  // Send them to a friendly confirmed page either way (idempotent link).
  redirect(`/${locale}/subscribed`);
}
