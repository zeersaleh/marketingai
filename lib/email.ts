import "server-only";
import type { Locale } from "@/lib/i18n";

/**
 * Email sending via Resend's REST API (no SDK dependency).
 * Everything is gated on RESEND_API_KEY: when it is unset the site still
 * works — subscriptions are simply recorded as confirmed immediately,
 * because there is no mailer to run a double opt-in through.
 *
 * Required env when enabling:
 *   RESEND_API_KEY   - from resend.com
 *   RESEND_FROM      - e.g. "Tibyan <news@tibyanstrategy.com>" (verified domain)
 */
export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM);
}

interface SendArgs {
  to: string;
  subject: string;
  html: string;
}

async function send({ to, subject, html }: SendArgs): Promise<boolean> {
  if (!isEmailConfigured()) {
    console.warn("[email] RESEND not configured — skipping send to", to);
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM,
        to,
        subject,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[email] Resend error", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] send failed", err);
    return false;
  }
}

const copy = {
  en: {
    subject: "Confirm your subscription to the Tibyan Briefing",
    heading: "One click to confirm",
    body: "Thanks for subscribing to the Tibyan Briefing — marketing, AI, and Syria's reconstruction economy. Please confirm your email to start receiving it.",
    button: "Confirm subscription",
    ignore: "If you didn't request this, you can ignore this email.",
  },
  ar: {
    subject: "أكّد اشتراكك في نشرة تبيان",
    heading: "نقرة واحدة للتأكيد",
    body: "شكرًا لاشتراكك في نشرة تبيان — التسويق والذكاء الاصطناعي واقتصاد إعادة إعمار سوريا. يرجى تأكيد بريدك لبدء استلامها.",
    button: "تأكيد الاشتراك",
    ignore: "إن لم تطلب هذا الاشتراك، يمكنك تجاهل هذه الرسالة.",
  },
};

export function sendConfirmationEmail(
  email: string,
  locale: Locale,
  confirmUrl: string
): Promise<boolean> {
  const t = copy[locale];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const html = `<!doctype html>
<html lang="${locale}" dir="${dir}">
  <body style="margin:0;background:#f8f5ef;font-family:system-ui,sans-serif;padding:32px;color:#1a2332;">
    <table role="presentation" style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;">
      <tr><td>
        <h1 style="color:#0a1e33;font-size:20px;margin:0 0 12px;">${t.heading}</h1>
        <p style="line-height:1.7;margin:0 0 24px;">${t.body}</p>
        <a href="${confirmUrl}" style="display:inline-block;background:#0a1e33;color:#f8f5ef;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;">${t.button}</a>
        <p style="color:#47536a;font-size:13px;margin:24px 0 0;">${t.ignore}</p>
      </td></tr>
    </table>
  </body>
</html>`;
  return send({ to: email, subject: t.subject, html });
}
