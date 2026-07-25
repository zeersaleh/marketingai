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

## 1. Check the container→GA4 link (GTM UI)

Work through this in tagmanager.google.com on container `GTM-NSL66R33`:

- [ ] **A GA4 Configuration tag exists.** Tag type "Google Tag" (or "GA4
      Configuration" on older containers), Tag ID = your `G-XXXXXXX`. Confirm the
      measurement ID character-for-character against GA4 → Admin → Data Streams.
      A tag pointing at a *different* property is the classic "everything looks
      wired but reports are empty" failure.
- [ ] **That tag has a trigger.** It needs Initialization – All Pages (or All
      Pages). A tag with no trigger never fires and shows no error.
- [ ] **The container is PUBLISHED, not just saved.** Changes in a workspace are
      invisible to the live site until you hit Submit → Publish. Check the
      version number in the top right matches what you edited.
- [ ] **Consent settings on the GA4 tag.** Tag → Advanced Settings → Consent
      Settings. If "Require additional consent" lists `analytics_storage`, the
      tag is fully blocked until the visitor accepts (see section 2).
- [ ] **Preview mode.** GTM → Preview → enter the site URL. The GA4 tag should
      appear under "Tags Fired". If it is under "Tags Not Fired", the reason is
      shown on the tag's detail pane.
- [ ] **GA4 DebugView.** With Preview connected, GA4 → Admin → DebugView should
      show `page_view` arriving. If GTM says "fired" but DebugView is empty, the
      measurement ID is wrong or the property is filtering the traffic.
- [ ] **GA4 internal-traffic / developer filters.** GA4 → Admin → Data Streams →
      Configure tag settings → Define internal traffic. An overly broad IP rule,
      or a data filter left in "Testing" state, silently drops hits.
- [ ] **Data retention and date range.** New properties show nothing for the
      first 24–48h in standard reports; use Realtime to confirm sooner.

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

**This needs a matching trigger in GTM or the pushes do nothing:**

1. Triggers → New → **Custom Event**, event name `page_view`.
2. Tags → New → **GA4 Event**, event name `page_view`, using your Google Tag as
   the configuration.
3. Optional: create dataLayer variables for `page_path`, `page_location` and
   `page_title` and map them onto the tag as event parameters.
4. Publish.

Verify in GTM Preview: navigate between pages on the site and confirm a
`page_view` event appears in the left-hand event stream for each navigation.

> Note: GTM's built-in **History Change** trigger also catches App Router
> navigation. Use one or the other — wiring both to a GA4 page_view tag
> double-counts every navigation.

## 4. Conversion events

`track()` pushes these; each needs its own Custom Event trigger + GA4 Event tag,
same pattern as above.

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
