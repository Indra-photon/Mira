# 01 — Architecture

## Two repositories

```
┌──────────────────────────────┐        pull request        ┌──────────────────────────────┐
│  Mira (this repo) — ENGINE   │ ─────────────────────────▶ │  Website repo — SITE         │
│                              │   branch seo/<run-date>    │                              │
│  scripts/seo-engine/*        │   + content/seo-pages/*.mdx│  content/seo-pages/*.mdx     │
│  config/*                    │                            │  app/(seo)/[slug]/page.tsx   │
│  content/sources/*           │ ◀───────────────────────── │  app/sitemap.ts              │
│  data/runs/<date>/*          │   reads live sitemap.xml   │  public/<indexnow-key>.txt   │
│  .github/workflows/seo.yml   │   for de-duplication       │  deploy hook → submit step   │
└──────────────────────────────┘                            └──────────────────────────────┘
        │  │  │  │                                                      │
        ▼  ▼  ▼  ▼                                                      ▼
   GSC  PostHog  DataForSEO  Anthropic                     GSC sitemaps.submit + IndexNow
```

**Mira owns:** collection, research, clustering, briefs, drafting, run data,
reports, and the twice-monthly schedule. All third-party secrets live here.

**The site repo owns:** rendering MDX pages, the sitemap route, the IndexNow key
file, and the post-deploy submit step. It needs a one-time preparation (Phase 4
in the implementation plan) and otherwise only receives pull requests.

**Why the engine does not publish directly:** the human review gate is a merged
pull request in the site repo. Nothing the engine does can put a page live.

## Data flow per run

| # | Step | Input | Output (in `data/runs/<YYYY-MM-DD>/`) |
|---|---|---|---|
| 1 | collect-gsc | GSC property, 28-day window | `gsc.json` (query, page, clicks, impressions, ctr, position) |
| 2 | collect-posthog | PostHog project, referrer list | `posthog.json` (landing page, sessions, referrer) |
| 3 | find-opportunities | `gsc.json`, `posthog.json`, live sitemap | `opportunities.json` (striking distance, no matching page, AI-referred) |
| 4 | research-serp | `config/personas.md`, Claude Haiku, DataForSEO | `persona-queries.json`, `serp/*.json`, `volumes.json` |
| 5 | cluster | all queries from 3 + 4, live sitemap | `topics.json` (ranked) |
| 6 | brief | `topics.json`, Claude Sonnet | `briefs/*.json` |
| 7 | draft | `briefs/*.json`, `content/sources/`, Claude Opus | `drafts/*.mdx` (status: draft) |
| 8 | publish-pr | `drafts/*.mdx` | branch + pull request in the site repo |
| 9 | report | everything above + previous runs' pages | `report.md`, `usage.json` (tokens, API calls, cost) |
| 10 | submit (runs in the site repo after deploy) | live sitemap, newly published URLs | GSC sitemap submission, IndexNow ping |

Every step is a separate script that reads from and writes to the run folder.
`run.ts` chains them. A failed step can be re-run alone with the same run date
because each step's input is already on disk. Steps that call paid APIs cache
responses in the run folder and skip calls whose result already exists.

## Folder structure (Mira)

```
scripts/seo-engine/
  run.ts                    # runs steps in order; --from <step> / --only <step> / --date <YYYY-MM-DD>
  steps/
    collect-gsc.ts
    collect-posthog.ts
    find-opportunities.ts
    research-serp.ts
    cluster.ts
    brief.ts
    draft.ts
    publish-pr.ts
    report.ts
  lib/
    env.ts                  # zod-validated process.env
    run-context.ts          # run folder paths, read/write JSON helpers
    gsc.ts                  # googleapis client + paginated searchanalytics.query
    posthog.ts              # HogQL fetch wrapper with p-limit(3)
    dataforseo.ts           # SERP + search volume, basic auth, caching
    claude.ts               # Anthropic client, model names, usage accounting
    github.ts               # octokit: branch, commit files, open PR in site repo
    sitemap.ts              # fetch + parse the live sitemap.xml
    schemas.ts              # zod schemas for every JSON file and Claude output
  check.ts                  # pings every service once; run first after setup
config/
  engine.json               # site URL, GSC property, locale, thresholds, caps
  personas.md               # target customers, written by a human
  ai-referrers.json         # referrer domains + utm_source values
content/
  sources/                  # real product material Claude may cite (md/mdx/txt)
data/
  runs/<YYYY-MM-DD>/        # one folder per run, committed to the repo
.github/workflows/
  seo-engine.yml            # cron 1st + 15th, plus manual dispatch
```

Changes from the spec's proposed layout: `cluster.ts` is split into `cluster`
and `brief`, `submit.ts` moves to the site repo (it must run after the site
deploys), and `publish-pr.ts` is added because the drafts leave this repo.

## Folder structure (site repo, one-time preparation)

```
content/seo-pages/<slug>.mdx       # engine output lands here via PR
app/(seo)/[slug]/page.tsx          # renders published MDX pages
app/sitemap.ts                     # includes published seo-pages
public/<INDEXNOW_KEY>.txt          # IndexNow key file
scripts/seo-submit.ts              # GSC sitemaps.submit + IndexNow ping
.github/workflows/seo-submit.yml   # runs after deploy succeeds
```

The exact rendering approach depends on the site's Next.js version and whether
it already has MDX set up. That is checked in Phase 4, not assumed now.

## File formats

### MDX page (engine output)

```mdx
---
title: "..."
description: "..."
slug: "..."
targetQuery: "..."
relatedQueries: ["...", "..."]
intent: "informational" | "commercial" | "transactional" | "navigational"
status: "draft"          # human changes to "published"
runDate: "2026-11-15"
sources: ["content/sources/pricing.md"]
---

Page body in MDX.
```

`runDate` is what the report step uses to find pages from earlier runs and
read their GSC and PostHog performance.

### `config/engine.json`

```json
{
  "siteUrl": "https://www.example.com",
  "gscProperty": "sc-domain:example.com",
  "locale": { "country": "US", "language": "en", "dataforseoLocationCode": 2840, "dataforseoLanguageCode": "en" },
  "gsc": { "days": 28, "strikingDistance": { "minPosition": 8, "maxPosition": 20, "minImpressions": 50 }, "minImpressionsNoPage": 30 },
  "research": { "personaQueries": 75, "expandOneLevel": true, "minMonthlyVolume": 20 },
  "limits": { "maxPagesPerRun": 10, "maxSerpLookupsPerRun": 400 },
  "siteRepo": { "contentDir": "content/seo-pages", "baseBranch": "main" }
}
```

Thresholds are starting points. Phase 1 reports will tell us what to tune.

### `config/ai-referrers.json`

```json
{
  "domains": ["chatgpt.com", "chat.openai.com", "perplexity.ai", "claude.ai", "gemini.google.com", "copilot.microsoft.com"],
  "utmSources": ["chatgpt", "openai", "perplexity", "claude", "gemini", "copilot"]
}
```

## Run lifecycle in GitHub Actions

1. Cron fires on the 1st and 15th (or a human triggers it manually).
2. The job checks out Mira, installs with pnpm, and runs `scripts/seo-engine/run.ts`.
3. Secrets are injected from repository secrets. The Google service account JSON
   is stored as a single secret and written to a temp file at job start.
4. On success the job commits `data/runs/<date>/` back to Mira's default branch
   and opens the drafts pull request in the site repo.
5. On failure the job still commits whatever the run folder holds, so partial
   data and the error are inspectable, and re-running with `--from <step>`
   continues from there.

## Guardrails

- Caps: pages per run, SERP lookups per run, and a hard token ceiling per run
  read from `config/engine.json`. The run stops and reports when a cap is hit.
- Dry run: `SEO_DRY_RUN=1` runs every step but skips Claude drafting and the
  pull request. Used for Phase 1 and for testing in CI.
- Every Claude call uses structured output validated with zod and retries once
  on a schema failure. A second failure fails the step, not the whole run.
- Every paid API call is logged to `usage.json` with count and estimated cost.
