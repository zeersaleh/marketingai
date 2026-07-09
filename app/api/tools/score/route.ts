import { isLocale } from "@/lib/i18n";
import { isValidEmail, saveLead, verifyTurnstile } from "@/lib/leads";
import { scorecardQuestions } from "@/lib/scorecard-config";
import { scoreAnswers } from "@/lib/scorecard-scoring";

export async function POST(request: Request) {
  let body: {
    answers?: Record<string, string>;
    email?: string;
    locale?: string;
    subscribe?: boolean;
    turnstileToken?: string;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid-body" }, { status: 400 });
  }

  const locale = body.locale && isLocale(body.locale) ? body.locale : "en";
  const email = body.email?.trim().toLowerCase() ?? "";
  if (!isValidEmail(email)) {
    return Response.json({ error: "invalid-email" }, { status: 400 });
  }
  if (!(await verifyTurnstile(body.turnstileToken))) {
    return Response.json({ error: "verification-failed" }, { status: 403 });
  }

  // Only accept known question ids with known option values.
  const answers: Record<string, string> = {};
  for (const question of scorecardQuestions) {
    const value = body.answers?.[question.id];
    if (
      typeof value === "string" &&
      question.options.some((o) => o.value === value)
    ) {
      answers[question.id] = value;
    }
  }
  if (Object.keys(answers).length < scorecardQuestions.length) {
    return Response.json({ error: "incomplete-answers" }, { status: 400 });
  }

  const result = scoreAnswers(answers, locale);

  // Capture the lead before returning results — the gate is server-side.
  await saveLead({
    source: "scorecard",
    email,
    locale,
    payload: {
      answers,
      overall: result.overall,
      modelVersion: result.modelVersion,
      subscribedToNewsletter: body.subscribe === true,
    },
  });
  if (body.subscribe === true) {
    await saveLead({
      source: "newsletter",
      email,
      locale,
      payload: { via: "scorecard" },
    });
  }

  return Response.json(result);
}
