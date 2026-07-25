# Content Guide — How to Publish on Tibyan

This is the day-to-day manual. Two workflows: **daily blog posts** and **weekly
homepage/SEO text updates**. Every publish is just a git commit — Railway rebuilds
and deploys the site automatically within ~2 minutes of pushing to `main`.

---

## 1. Publishing a blog post (daily)

Posts live in `content/posts/`, one Markdown file **per language**:

```
content/posts/
  my-post-slug.en.md   ← English version
  my-post-slug.ar.md   ← Arabic version
```

The part before `.en.md` / `.ar.md` is the **slug** — it becomes the URL
(`/en/insights/my-post-slug`). Use lowercase words separated by hyphens. Both
language files must share the same slug so the language toggle links them.

**Reserved slugs**: `syria-market-entry`, `ai-marketing`, and `page` are taken
by the category archive routes (and future pagination) under `/insights/` — a
post can't use them as its slug. `npm run validate:content` rejects them.

### Post template

Copy `docs/post-template.md` into a new file and fill it in, or start from:

```markdown
---
title: "Your headline here"
date: "2026-07-15"
pillar: "Syria market entry"
excerpt: "One or two sentences that appear in the post list, on the homepage, and in search results. Write it as a direct answer."
---

Direct answer first: open with 1–2 paragraphs that completely answer the
question the post is about. This is the editorial rule — best for mobile
skimming and for being cited by AI answer engines.

## First section heading

Body text. Normal Markdown works: **bold**, [links](https://example.com),
bullet lists, and `## headings`.

## Second section heading

More body text.
```

Rules that matter:

- **`date`** must be `"YYYY-MM-DD"` — it controls sort order, the sitemap, and RSS.
- **`pillar`** must be one of the four canonical pillars (English string, exact):

  | Pillar (`.en.md`, canonical) | Recommended Arabic (`.ar.md`) | Category |
  |---|---|---|
  | `Syria market entry` | دخول السوق السورية | Syria Market Entry |
  | `Regulatory & Market Tracker` | رصد التنظيم والسوق | Syria Market Entry |
  | `AI marketing in practice` | التسويق بالذكاء الاصطناعي عملياً | AI Marketing |
  | `Bilingual & cross-cultural craft` | الحرفة ثنائية اللغة والتواصل بين الثقافات | AI Marketing |

  The **English pillar string is canonical**: it decides which of the two
  insights **categories** the post lands in (registry:
  `content/taxonomy.json`, logic: `lib/categories.ts`) and which audience
  landing pages (`/entering-syria`, `/gulf-marketing-ai`) feature it
  (`lib/route-content.ts`). `npm run validate:content` rejects an off-list
  English pillar. The Arabic pillar string is display-only free text on the
  post page — use the recommended forms above for consistency; cards now show
  the category name, so older variants are cosmetic only. Every post needs an
  `.en.md` file, even if the article itself launches Arabic-first.
- **`category`** (optional) overrides the pillar→category mapping for one
  post: `category: "syria-market-entry"` or `category: "ai-marketing"`. Use it
  when a post's pillar and its natural home disagree (e.g. a bilingual-craft
  post that is really about Syria).
- **If you only have time for one language**, publish it — the site shows the
  original-language version to both audiences with a polite notice instead of
  hiding the post. Add the second language later by adding the second file.

### Categories

Insights are grouped into two main categories, each with a landing-page
section (7 most recent posts) and a full archive page:

- **Syria Market Entry** → `/insights/syria-market-entry`
- **AI Marketing** → `/insights/ai-marketing`

The registry is `content/taxonomy.json` (names, descriptions, pillar
mapping, both languages). Adding a category means: add a registry entry,
create a matching route folder `app/[locale]/insights/<id>/page.tsx` (copy an
existing one — it's ~25 lines delegating to `CategoryArchive`), and assign it
at least one pillar. Archive pages list every post in the category with no
pagination; add static `/insights/<id>/page/[n]` sub-routes if a category ever
passes ~30–40 posts.

### Publish

```bash
git add content/posts/
git commit -m "Post: your headline"
git push
```

That's it. Railway rebuilds and the post is live on `/insights`, the homepage's
"Latest insights" section, `sitemap.xml`, and the RSS feeds
(`/en/feed.xml`, `/ar/feed.xml`).

---

## 2. Updating homepage text (weekly, for SEO)

All homepage copy lives in **`content/dictionary.ts`** — edit the strings, commit,
push. Map of what's where:

| Homepage section | Edit in `dictionary.ts` under |
|---|---|
| Big headline (H1) | `brand.tagline` — this is also the SEO `<title>` of the homepage |
| Subheadline | `brand.subline` — also the homepage meta description |
| Gold-bordered credibility line ("Caesar Act repealed…") | `hero.credibility` — **keep this current**; it's dated proof you're paying attention |
| Button labels | `hero.primaryCta`, `hero.secondaryCta` |
| "Four problems" cards | `problems.items` (title + body ×4) |
| "How we work" steps | `methodology.steps` |
| Section headings | `sections.*` |

Each key exists twice — once in the `en` object, once in the `ar` object.
**Always update both.** The Arabic is drafted natively; keep it that way rather
than translating your English edit word-for-word.

Service and sector page copy live in `content/services.ts` and
`content/sectors.ts`, same pattern.

### SEO notes for weekly edits

- `brand.tagline` is your homepage `<title>` — front-load the keywords that
  matter ("Syria market entry", "marketing strategy", "investors").
- Refresh `hero.credibility` whenever there's regulatory/market news; dated,
  current facts are what earn citations.
- Don't change post slugs after publishing — that breaks indexed URLs. Change
  titles freely; slugs are separate.

---

## 3. Verifying before you push (optional but wise)

```bash
npm run validate:content   # checks frontmatter against the taxonomy, with readable errors
npm run build              # fails loudly if anything else is malformed
```

CI runs `validate:content` on every push and PR, so a bad date, an off-list
pillar, a reserved slug, or an empty required field fails the check before the
build. A missing language counterpart is a warning, not a failure. If both
commands pass locally, the deploy will pass.

---

## 4. Future idea: publishing from a GitHub issue (not built)

For publishing without touching git at all: a GitHub issue form
(`.github/ISSUE_TEMPLATE/new-post.yml`) with fields for title, date, pillar,
excerpt, and the EN/AR bodies, plus a small Action that turns a submitted
issue into the two `.md` files on a branch and opens a PR. Merging the PR
publishes. Worth building if someone other than a git user starts writing
posts; until then the two-file commit flow above is fewer moving parts.
