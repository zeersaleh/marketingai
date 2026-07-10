import { randomUUID } from "node:crypto";
import { isLocale, siteUrl } from "@/lib/i18n";
import { isValidEmail, saveLead, verifyTurnstile } from "@/lib/leads";
import { isEmailConfigured, sendConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  let body: {
    email?: string;
    locale?: string;
    languagePreference?: string;
    turnstileToken?: string;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid-body" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const locale = body.locale && isLocale(body.locale) ? body.locale : "en";
  if (!isValidEmail(email)) {
    return Response.json({ error: "invalid-email" }, { status: 400 });
  }
  if (!(await verifyTurnstile(body.turnstileToken))) {
    return Response.json({ error: "verification-failed" }, { status: 403 });
  }

  // Double opt-in only when a mailer is configured; otherwise record as
  // confirmed so subscriptions are never silently stuck pending.
  const doubleOptIn = isEmailConfigured();
  const confirmToken = doubleOptIn ? randomUUID() : undefined;

  await saveLead({
    source: "newsletter",
    email,
    locale,
    payload: { languagePreference: body.languagePreference ?? "both" },
    confirmed: !doubleOptIn,
    confirmToken,
  });

  if (doubleOptIn && confirmToken) {
    const confirmUrl = `${siteUrl}/api/subscribe/confirm?token=${confirmToken}`;
    await sendConfirmationEmail(email, locale, confirmUrl);
    return Response.json({ status: "pending" });
  }

  return Response.json({ status: "subscribed" });
}
