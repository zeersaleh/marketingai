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

### Post template

Copy this into a new file and fill it in:

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
- **`pillar`** is the category label shown on cards. Reuse the existing ones so the
  blog stays organized: *Syria market entry*, *Regulatory & Market Tracker*,
  *Responsible investment communications*, *AI marketing in practice*,
  *Bilingual & cross-cultural craft*, *Methodology* — Arabic equivalents in the
  `.ar.md` file. The **English pillar string is canonical**: the two audience
  landing pages (`/entering-syria`, `/gulf-marketing-ai`) filter their insights
  sections by `pillar` in the `.en.md` file (see `lib/route-content.ts`), so an
  off-list or misspelled English pillar drops the post from those pages. Every
  post needs an `.en.md` file, even if the article itself launches Arabic-first.
- **If you only have time for one language**, publish it — the site shows the
  original-language version to both audiences with a polite notice instead of
  hiding the post. Add the second language later by adding the second file.

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
npm run build    # fails loudly if front-matter is malformed
```

If the build passes locally, the deploy will pass.
