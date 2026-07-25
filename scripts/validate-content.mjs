#!/usr/bin/env node
/**
 * Validates content/posts frontmatter against content/taxonomy.json before
 * the build runs, so a broken post fails CI with a readable message instead
 * of an empty title silently shipping (lib/posts.ts coerces missing fields
 * to ""). Run with: npm run validate:content
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "content", "posts");
const TAXONOMY_PATH = path.join(ROOT, "content", "taxonomy.json");

const errors = [];
const warnings = [];

// --- Taxonomy invariants -----------------------------------------------
const taxonomy = JSON.parse(fs.readFileSync(TAXONOMY_PATH, "utf8"));
const categoriesList = taxonomy.categories ?? [];
const categoryIds = categoriesList.map((c) => c.id);
const canonicalPillars = categoriesList.flatMap((c) => c.pillars);

for (const id of categoryIds) {
  if (categoryIds.indexOf(id) !== categoryIds.lastIndexOf(id)) {
    errors.push(`taxonomy.json: duplicate category id "${id}"`);
  }
}
for (const pillar of canonicalPillars) {
  const owners = categoriesList.filter((c) => c.pillars.includes(pillar));
  if (owners.length > 1) {
    errors.push(
      `taxonomy.json: pillar "${pillar}" is assigned to more than one category (${owners.map((c) => c.id).join(", ")})`
    );
  }
}

// Category ids shadow the /insights/[slug] route; "page" is reserved for
// future pagination sub-routes.
const reservedSlugs = new Set([...categoryIds, "page"]);

// --- Post files ---------------------------------------------------------
const FILENAME_RE = /^([a-z0-9-]+)\.(en|ar)\.md$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_EXCERPT_LENGTH = 220;

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
const slugs = new Map(); // slug -> Set of locales present

for (const file of files) {
  const match = file.match(FILENAME_RE);
  if (!match) {
    errors.push(
      `${file}: filename must be <slug>.<en|ar>.md with a lowercase kebab-case slug`
    );
    continue;
  }
  const [, slug, locale] = match;
  const seen = slugs.get(slug) ?? new Set();
  seen.add(locale);
  slugs.set(slug, seen);

  if (reservedSlugs.has(slug)) {
    errors.push(
      `${file}: slug "${slug}" is reserved (category archive routes and pagination live under /insights/)`
    );
  }

  let data;
  try {
    ({ data } = matter(fs.readFileSync(path.join(POSTS_DIR, file), "utf8")));
  } catch (e) {
    errors.push(`${file}: frontmatter failed to parse — ${e.message}`);
    continue;
  }

  for (const field of ["title", "date", "pillar", "excerpt"]) {
    if (!String(data[field] ?? "").trim()) {
      errors.push(`${file}: missing or empty "${field}"`);
    }
  }

  const date = String(data.date ?? "");
  if (date) {
    const parsed = new Date(`${date}T00:00:00Z`);
    if (
      !DATE_RE.test(date) ||
      Number.isNaN(parsed.getTime()) ||
      parsed.toISOString().slice(0, 10) !== date
    ) {
      errors.push(`${file}: "date" must be a real YYYY-MM-DD date (got "${date}")`);
    }
  }

  const pillar = String(data.pillar ?? "");
  if (locale === "en" && pillar && !canonicalPillars.includes(pillar)) {
    errors.push(
      `${file}: pillar "${pillar}" is not in the canonical list: ${canonicalPillars.join(" | ")}`
    );
  }

  const category = String(data.category ?? "");
  if (category && !categoryIds.includes(category)) {
    errors.push(
      `${file}: category "${category}" is not a valid category id: ${categoryIds.join(" | ")}`
    );
  }

  const excerpt = String(data.excerpt ?? "");
  if (excerpt.length > MAX_EXCERPT_LENGTH) {
    warnings.push(
      `${file}: excerpt is ${excerpt.length} chars — over ${MAX_EXCERPT_LENGTH}, it will be truncated in meta descriptions and llms.txt`
    );
  }
}

for (const [slug, locales] of slugs) {
  for (const locale of ["en", "ar"]) {
    if (!locales.has(locale)) {
      warnings.push(
        `${slug}: no .${locale}.md file — the other language will be shown to ${locale} readers with a fallback notice`
      );
    }
  }
}

// --- Report -------------------------------------------------------------
for (const w of warnings) console.warn(`warning: ${w}`);
for (const e of errors) console.error(`error: ${e}`);

if (errors.length > 0) {
  console.error(
    `\nContent validation failed: ${errors.length} error(s), ${warnings.length} warning(s).`
  );
  process.exit(1);
}
console.log(
  `Content validation passed: ${files.length} files, ${slugs.size} posts, ${warnings.length} warning(s).`
);
