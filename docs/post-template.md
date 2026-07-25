# Post template

Copy the relevant block into `content/posts/<slug>.en.md` /
`content/posts/<slug>.ar.md` and fill it in. Same slug for both files.
Full rules: `docs/content-guide.md`. Check with `npm run validate:content`.

## English file — `<slug>.en.md`

```markdown
---
title: "Your headline here"
date: "2026-07-25"
pillar: "Syria market entry"
excerpt: "One or two sentences that appear on cards, in search results, and in llms.txt. Write it as a direct answer. Keep it under 220 characters."
---

Direct answer first: open with 1–2 paragraphs that completely answer the
question the post is about.

## First section heading

Body text. Normal Markdown works: **bold**, [links](https://example.com),
bullet lists, and `## headings`.
```

The English `pillar` must be exactly one of:

- `Syria market entry` (category: Syria Market Entry)
- `Regulatory & Market Tracker` (category: Syria Market Entry)
- `AI marketing in practice` (category: AI Marketing)
- `Bilingual & cross-cultural craft` (category: AI Marketing)

Optional: force the post into the other category with
`category: "syria-market-entry"` or `category: "ai-marketing"`.

## Arabic file — `<slug>.ar.md`

Use the matching recommended Arabic pillar string (display-only, but keep it
consistent):

```markdown
---
title: "العنوان هنا"
date: "2026-07-25"
pillar: "دخول السوق السورية"
excerpt: "جملة أو جملتان تظهران على البطاقات وفي نتائج البحث. اكتبها كإجابة مباشرة."
---

الإجابة المباشرة أولاً: افتتح بفقرة أو فقرتين تجيبان إجابة كاملة عن سؤال
المقالة.

## عنوان القسم الأول

نص المقالة.
```

Recommended Arabic pillar strings:

- دخول السوق السورية (`Syria market entry`)
- رصد التنظيم والسوق (`Regulatory & Market Tracker`)
- التسويق بالذكاء الاصطناعي عملياً (`AI marketing in practice`)
- الحرفة ثنائية اللغة والتواصل بين الثقافات (`Bilingual & cross-cultural craft`)
