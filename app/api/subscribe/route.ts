import { isValidEmail, saveLead, verifyTurnstile } from "@/lib/leads";

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
  if (!isValidEmail(email)) {
    return Response.json({ error: "invalid-email" }, { status: 400 });
  }
  if (!(await verifyTurnstile(body.turnstileToken))) {
    return Response.json({ error: "verification-failed" }, { status: 403 });
  }

  await saveLead({
    source: "newsletter",
    email,
    locale: body.locale === "ar" ? "ar" : "en",
    payload: { languagePreference: body.languagePreference ?? "both" },
  });

  return Response.json({ ok: true });
}
