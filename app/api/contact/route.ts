import { isValidEmail, saveLead, verifyTurnstile } from "@/lib/leads";

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    message?: string;
    locale?: string;
    turnstileToken?: string;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid-body" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const name = body.name?.trim().slice(0, 200) ?? "";
  const message = body.message?.trim().slice(0, 5000) ?? "";
  if (!isValidEmail(email) || !name || !message) {
    return Response.json({ error: "invalid-body" }, { status: 400 });
  }
  if (!(await verifyTurnstile(body.turnstileToken))) {
    return Response.json({ error: "verification-failed" }, { status: 403 });
  }

  await saveLead({
    source: "contact",
    email,
    locale: body.locale === "ar" ? "ar" : "en",
    payload: { name, message },
  });

  return Response.json({ ok: true });
}
