# Tibyan (تبيان)

Bilingual (Arabic/English) marketing and brand-strategy platform for international
investors entering Syria's reconstruction economy, with an applied-AI enablement
service line for KSA/Gulf marketing teams.

Strategy documents: [`docs/content-brief.md`](docs/content-brief.md) (original brief)
and [`docs/brief-enhancements.md`](docs/brief-enhancements.md) (market/technical
review that amends it — where they conflict, the enhancements win).

## Stack

- **Next.js (App Router, SSG-first)** — all content pages are statically generated;
  the only server surface is the API routes below. `output: "standalone"` for Railway.
- **Tailwind CSS v4** with CSS logical properties (`ms-*`, `pe-*`, `text-start`) so
  RTL is a data change, not a second stylesheet.
- **i18n**: locale-prefixed routes (`/en/...`, `/ar/...`) rendered from locale-keyed
  content in `content/` with shared slugs. `<html lang dir>` is set per locale;
  hreflang alternates are emitted on every page and in the sitemap. The root `/`
  redirects by `Accept-Language` (see `next.config.ts`).
- **Fonts**: IBM Plex Sans + IBM Plex Sans Arabic, self-hosted and subsetted via
  `next/font`.

## Key paths

| Path | Purpose |
|---|---|
| `content/dictionary.ts` | UI strings, both languages (drafted natively, not translated) |
| `content/services.ts`, `content/sectors.ts`, `content/posts.ts` | Bilingual page content |
| `lib/scorecard-config.ts` | Scorecard questions (client-safe) |
| `lib/scorecard-scoring.ts` | Scoring model (server-only — the email gate is real) |
| `lib/leads.ts` | Shared leads store: Postgres when `DATABASE_URL` is set, console in dev; optional webhook + Turnstile |
| `app/api/tools/score` | Scores answers server-side, saves the lead **before** returning results |
| `app/api/subscribe`, `app/api/contact` | Newsletter + contact capture into the same leads table |
| `app/api/health` | Railway health check |

## Develop

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en or /ar
npm run lint && npm run typecheck && npm run build
```

No environment variables are required for local dev — leads log to the console.
See `.env.example` for the production set.

## Deploy (Railway + Cloudflare)

1. Railway project with `production` and `staging` environments; connect this repo
   (`main` → production, `staging` branch → staging). Add a Railway Postgres to each
   and set `DATABASE_URL`.
2. Set the service health-check path to `/api/health`.
3. Set `NEXT_PUBLIC_ENVIRONMENT=staging` on staging (emits a noindex robots.txt)
   and protect it with Cloudflare Access.
4. Cloudflare in front of Railway: proxied CNAME, SSL "Full (strict)", cache rule
   for `/_next/static/*`.
5. Email: Cloudflare Email Routing for inbound; Resend (SPF/DKIM/DMARC in Cloudflare
   DNS) for newsletter and transactional sends.

Full deployment rationale: `docs/brief-enhancements.md` §4.
