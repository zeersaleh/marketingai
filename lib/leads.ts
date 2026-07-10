import "server-only";
import { Pool } from "pg";

export type LeadSource = "newsletter" | "scorecard" | "contact";

export interface Lead {
  source: LeadSource;
  email: string;
  locale: string;
  payload?: Record<string, unknown>;
  /** Newsletter double opt-in: false until the email link is clicked. */
  confirmed?: boolean;
  confirmToken?: string;
}

let pool: Pool | null = null;
let tableReady: Promise<void> | null = null;

function getPool(): Pool | null {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 3 });
  }
  return pool;
}

function ensureTable(db: Pool): Promise<void> {
  if (!tableReady) {
    // CREATE covers fresh installs; the ALTERs upgrade an existing table
    // (from before double opt-in) without dropping data.
    tableReady = db
      .query(
        `CREATE TABLE IF NOT EXISTS leads (
           id BIGSERIAL PRIMARY KEY,
           source TEXT NOT NULL,
           email TEXT NOT NULL,
           locale TEXT NOT NULL,
           payload JSONB,
           confirmed BOOLEAN NOT NULL DEFAULT true,
           confirm_token TEXT,
           created_at TIMESTAMPTZ NOT NULL DEFAULT now()
         );
         ALTER TABLE leads ADD COLUMN IF NOT EXISTS confirmed BOOLEAN NOT NULL DEFAULT true;
         ALTER TABLE leads ADD COLUMN IF NOT EXISTS confirm_token TEXT;`
      )
      .then(() => undefined);
  }
  return tableReady;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
}

/**
 * Persist a lead. With DATABASE_URL set (Railway Postgres) it writes to the
 * shared leads table; without it (local dev) it logs and succeeds, so the
 * site works before infrastructure exists. A LEADS_WEBHOOK_URL, if set, is
 * notified after the write (fire-and-forget) — point it at HubSpot/Zapier.
 */
export async function saveLead(lead: Lead): Promise<void> {
  const db = getPool();
  if (db) {
    await ensureTable(db);
    await db.query(
      `INSERT INTO leads (source, email, locale, payload, confirmed, confirm_token)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        lead.source,
        lead.email,
        lead.locale,
        lead.payload ?? null,
        lead.confirmed ?? true,
        lead.confirmToken ?? null,
      ]
    );
  } else {
    console.warn(
      "[leads] WARNING: DATABASE_URL is not set — lead NOT persisted:",
      JSON.stringify(lead)
    );
  }

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...lead, createdAt: new Date().toISOString() }),
    }).catch((err) => console.error("[leads] webhook failed", err));
  }
}

/**
 * Confirm a newsletter subscription from its opt-in token.
 * Returns the confirmed subscriber's locale (for the redirect) or null when
 * the token is unknown/already used. No-op-safe when there is no database.
 */
export async function confirmSubscriber(
  token: string
): Promise<{ locale: string } | null> {
  const db = getPool();
  if (!db || !token) return null;
  await ensureTable(db);
  const res = await db.query<{ locale: string }>(
    `UPDATE leads SET confirmed = true, confirm_token = NULL
     WHERE confirm_token = $1 AND source = 'newsletter'
     RETURNING locale`,
    [token]
  );
  return res.rows[0] ?? null;
}

/**
 * Verify a Cloudflare Turnstile token when the secret is configured.
 * Returns true when Turnstile is not configured, so forms keep working
 * before the keys exist.
 */
export async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    }
  );
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}
