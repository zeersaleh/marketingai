# Analytics: how GTM and GA4 connect

## What lives where

The site does **not** talk to Google Analytics directly. There is no `G-XXXXXXX`
measurement ID anywhere in this repo, and that is by design:

```
site code  ──push──>  dataLayer  ──>  GTM container  ──>  GA4 property
(this repo)                           (tagmanager.google.com)
```

This repo is responsible for exactly three things:

| Thing | Where |
| --- | --- |
| Loading the GTM container | `app/[locale]/layout.tsx` (`NEXT_PUBLIC_GTM_ID`, default `GTM-NSL66R33`) |
| Consent Mode v2 defaults + updates | same file, plus `components/ConsentBanner.tsx` |
| Pushing events to the dataLayer | `lib/analytics.ts` → `track()` |

Everything else — whether a GA4 tag exists, which measurement ID it points at,
which triggers fire it — is configuration **inside the GTM container**, not code.
So if GA4 shows no traffic, the cause is usually one of the two sections below.

## 1. Container state (verified 2026-07-25)

Container `GTM-NSL66R33` ("Tibyan" → www.tibyanstrategy.com) holds two tags:

| Tag | Type | Firing trigger |
| --- | --- | --- |
| `Google Tag G-MMCC8JH22K` | Google Tag | Initialization – All Pages |
| `GA4 - Conversion events` | GA4 Event | `CE - conversions` (custom event) |

Workspace Changes showed **0**, so these are published, not sitting unsubmitted.

That rules out the usual suspects: a GA4 tag **does** exist, it **does** have a
trigger, and the container **is** live. Two consequences worth writing down:

- The Google Tag fires on **Initialization – All Pages**, which is container load
  only. It does *not* re-fire on client-side navigation — see section 3.
- No tag uses a **History Change** trigger, so adding the `page_view` Custom
  Event trigger from section 3 cannot double-count.

### What is still worth checking, in order

- [ ] **Does `G-MMCC8JH22K` match the property you are reading reports in?**
      GA4 → Admin → Data Streams, compare character for character. A tag pointing
      at a different (or deleted) property is the classic "everything looks wired
      but reports are empty" failure, and it is the last remaining explanation
      for *zero* traffic rather than merely low traffic.
- [ ] **Consent settings on the Google Tag.** Tag → Advanced Settings → Consent
      Settings. `analytics_storage` is denied by default site-side (section 2),
      which throttles this tag regardless of what is configured here.
- [ ] **Preview mode.** GTM → Preview → enter the site URL. `Google Tag
      G-MMCC8JH22K` should appear under "Tags Fired" on the first page. If it is
      under "Tags Not Fired", the detail pane names the reason — usually consent.
- [ ] **GA4 DebugView.** With Preview connected, GA4 → Admin → DebugView should
      show `page_view` arriving. GTM saying "fired" while DebugView stays empty
      means the measurement ID is wrong or the property is filtering the traffic.
- [ ] **GA4 internal-traffic / developer filters.** GA4 → Admin → Data Streams →
      Configure tag settings → Define internal traffic. An overly broad IP rule,
      or a data filter left in "Testing" state, silently drops hits.
- [ ] **Date range.** New properties show nothing in standard reports for the
      first 24–48h; use Realtime to confirm sooner.

## 2. Consent Mode is deny-by-default

`app/[locale]/layout.tsx` sets:

```js
gtag('consent','default',{ analytics_storage:'denied', ... , wait_for_update:500 })
```

Nothing grants consent except the visitor clicking **Accept** in
`ConsentBanner`, which stores `tibyan-consent=granted` in localStorage and fires
a `consent update`.

The consequence: **every visitor who ignores or dismisses the banner produces no
GA4 traffic in reports.** GA4 still sends cookieless pings when
`analytics_storage` is denied, but those only surface as *modeled* data, and
behavioural modelling requires the property to clear Google's volume thresholds
(on the order of 1,000 events/day with denied consent for 7+ days). A site below
those thresholds sees the denied traffic simply vanish.

If reported traffic is far below reality, compare GA4 sessions against server-side
request counts. A large gap with a low banner acceptance rate is this, not a
broken tag.

This is a **compliance decision, not a bug** — leave the default denied for
EU/UK visitors. The options, in order of preference:

1. Improve banner acceptance (clearer copy, don't let it be missed).
2. Apply the denied default only to EU/UK regions via the `region` parameter on
   `consent default`, granting elsewhere — check this with counsel first.
3. Accept the gap and treat GA4 as directional rather than absolute.

## 3. SPA page views (fixed in code)

Next.js App Router navigations are client-side. The browser never reloads, so
GTM's container-load trigger fires **once per session** — GA4 would record only
the landing page and miss every in-site navigation after it.

`components/RouteChangeTracker.tsx` fixes the site half by pushing a `page_view`
event on each route change (skipping the first render, which container load
already covers).

**The container has no `page_view` trigger, so these pushes currently go
nowhere.** To wire it up:

1. Triggers → New → **Custom Event**, event name `page_view`.
2. Tags → New → **GA4 Event**, event name `page_view`, using your Google Tag as
   the configuration.
3. Create dataLayer variables for `page_location` and `page_title` and map them
   onto the tag as event parameters. **This is required, not cosmetic.** A GA4
   Event tag inherits `page_location`/`page_title` from the Google Tag's
   configuration, which was captured at *container load* — so without explicit
   values every SPA page view is attributed to the landing page URL, and the
   report looks just as wrong as having no tracking at all. `page_path` is
   optional (GA4 derives it from `page_location`).
4. Publish.

Verify in GTM Preview: navigate between pages on the site and confirm a
`page_view` event appears in the left-hand event stream for each navigation.

> Note: GTM's built-in **History Change** trigger also catches App Router
> navigation. Use one or the other — wiring both to a GA4 page_view tag
> double-counts every navigation.

## 4. Conversion events

All three route through one `GA4 - Conversion events` tag on the `CE -
conversions` trigger. That tag is correctly built: Event Name is `{{Event}}`, so
each event reaches GA4 under its real name, and it picks up the Google Tag's
configuration from the container.

Its Event Parameters, however, are only `score` ({{DLV - score}}) and `locale`
({{DLV - locale}}). Three parameters the site pushes are therefore dropped:

| Event | Pushed | Reaching GA4 |
| --- | --- | --- |
| `contact_submit` | `locale` | all |
| `newsletter_subscribe` | `locale`, `language_preference`, `double_optin` | `locale` only |
| `scorecard_complete` | `score`, `locale`, `subscribed` | `score`, `locale` |

To capture them: Variables → New → Data Layer Variable for each of
`language_preference`, `double_optin` and `subscribed`, then add matching
Event Parameter rows on the tag.

Also confirm the `CE - conversions` trigger's event-name pattern matches all
three events (e.g. regex `contact_submit|newsletter_subscribe|scorecard_complete`).
Anything narrower silently drops the others.

### Two GA4-side steps that are easy to miss

- **Custom dimensions.** Event parameters are collected but stay invisible in
  standard reports until registered at GA4 → Admin → Custom definitions. Add
  `locale`, `language_preference`, `double_optin` and `subscribed` as
  event-scoped custom dimensions, and `score` as a custom metric. Registration
  is not retroactive — data before it exists cannot be broken out.
- **Key events.** Conversions only count as conversions once marked at
  GA4 → Admin → Events → "Mark as key event".

| Event | Fired from | Parameters |
| --- | --- | --- |
| `contact_submit` | `components/ContactForm.tsx` | `locale` |
| `newsletter_subscribe` | `components/NewsletterForm.tsx` | `locale`, `language_preference`, `double_optin` |
| `scorecard_complete` | `components/ScorecardTool.tsx` | see call site |
| `page_view` | `components/RouteChangeTracker.tsx` | `page_path`, `page_location`, `page_title` |

## 5. Container ID plumbing

`NEXT_PUBLIC_GTM_ID` is read in `app/[locale]/layout.tsx` with a fallback:

```ts
const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-NSL66R33";
```

Two ways this bites:

- `NEXT_PUBLIC_*` is **inlined at build time**. Setting it only as a runtime
  variable on Railway has no effect — it must exist when `next build` runs.
- `??` falls back on `undefined` only. Setting the variable to an **empty
  string** is treated as "disable GTM", and the snippet, the consent banner and
  the route tracker all disappear from the page with no error.

To confirm what actually shipped, view source on the live site and search for
`googletagmanager.com`. No match means GTM is disabled or the build didn't pick
up the variable.
