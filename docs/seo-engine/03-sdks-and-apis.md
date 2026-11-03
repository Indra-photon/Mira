# 03 — SDKs, APIs, quotas and costs

Versions are the latest on npm as of 2026-11-03. Pin them when installing.

## Packages (Mira)

| Package | Version | Used for |
|---|---|---|
| `googleapis` | 189.0.0 | Search Console API (`searchconsole` v1): `searchanalytics.query`, `sites.list`, `sitemaps.submit` |
| `@anthropic-ai/sdk` | 1.4.0 | Claude: persona queries, clustering, briefs, drafts, with structured output |
| `zod` | 4.6.7 | Validate env, API responses, run files and Claude output |
| `gray-matter` | 4.0.3 | Read and write MDX frontmatter |
| `p-limit` | 7.3.3 | Concurrency caps (PostHog 3, DataForSEO 5, Claude 2) |
| `dotenv` | 18.0.9 | Load `.env` locally; not used in Actions |
| `@octokit/rest` | 22.0.1 | Create branch, commit files and open the pull request in the site repo |
| `tsx` | 4.23.15 (dev) | Run TypeScript scripts without a build step |

PostHog, DataForSEO and IndexNow are called with the built-in `fetch`; no
package is needed.

## Packages (site repo, Phase 4)

| Package | Version | Used for |
|---|---|---|
| `next-mdx-remote` | 6.0.0 | Render MDX files from `content/seo-pages` in a dynamic route, if the site has no MDX setup already |
| `gray-matter` | 4.0.3 | Read frontmatter to filter `status: published` and build the sitemap |
| `googleapis` | 189.0.0 | `sitemaps.submit` in the post-deploy step |

If the site already uses `@next/mdx` or Contentlayer, reuse that instead.

## Google Search Console API

- **Auth:** service account JSON via `google.auth.GoogleAuth` with scope
  `https://www.googleapis.com/auth/webmasters` (read plus sitemap submit).
- **Client:** `google.searchconsole({ version: "v1", auth })`.
- **Query data:** `searchanalytics.query({ siteUrl, requestBody })` with
  `startDate`, `endDate`, `dimensions: ["query", "page"]`, `type: "web"`,
  `rowLimit: 25000`, `startRow` for paging, `dataState: "final"`.
  Loop until a page returns fewer than 25,000 rows.
- **Date window:** GSC data lags about 2 to 3 days. Use
  `endDate = today - 3 days`, `startDate = endDate - 27 days`.
- **Submit sitemap:** `sitemaps.submit({ siteUrl, feedpath: "https://www.example.com/sitemap.xml" })`.
- **Quotas (per Google's published load limits):** per site about 1,200
  queries per minute; per project about 40,000 queries per day. A full
  collection is well under 100 requests, so quotas are not a concern.
- **Cost:** free.

## PostHog HogQL query API

- **Endpoint:** `POST {POSTHOG_HOST}/api/projects/{POSTHOG_PROJECT_ID}/query/`
- **Headers:** `Authorization: Bearer phx_...`, `Content-Type: application/json`
- **Body:** `{ "query": { "kind": "HogQLQuery", "query": "<SQL>" } }`
- **Response:** `{ columns: string[], results: any[][], ... }`
- **Query shape for AI referrals (28 days, landing page per session):**
  ```sql
  SELECT
    properties.$pathname AS landing_page,
    properties.$referring_domain AS referrer,
    count(DISTINCT properties.$session_id) AS sessions
  FROM events
  WHERE event = '$pageview'
    AND timestamp > now() - INTERVAL 28 DAY
    AND (
      properties.$referring_domain IN ('chatgpt.com', 'chat.openai.com', 'perplexity.ai', 'claude.ai', 'gemini.google.com', 'copilot.microsoft.com')
      OR lower(toString(properties.utm_source)) IN ('chatgpt', 'openai', 'perplexity', 'claude', 'gemini', 'copilot')
    )
  GROUP BY landing_page, referrer
  ORDER BY sessions DESC
  LIMIT 500
  ```
  The referrer and utm lists are read from `config/ai-referrers.json`, not
  hard-coded.
- **Rate limits:** the query endpoint allows roughly 120 requests per hour and
  a small number of concurrent queries. The engine runs at most 3 concurrent
  queries and needs only a handful per run.
- **Cost:** included in the PostHog plan; HogQL queries are free on cloud
  plans within normal use.

## DataForSEO

- **Base URL:** `https://api.dataforseo.com/v3` (sandbox:
  `https://sandbox.dataforseo.com/v3`, same credentials, free, fake data).
- **Auth:** HTTP Basic, `Authorization: Basic base64(login:password)`.
- **SERP, live:** `POST /serp/google/organic/live/advanced`
  Body is an array of tasks:
  `[{ "keyword": "...", "location_code": 2840, "language_code": "en", "device": "desktop", "depth": 10 }]`.
  Result items of interest have `type` equal to `organic`, `people_also_ask`
  and `related_searches`. Check `tasks[].status_code === 20000`.
- **Search volume, live:** `POST /keywords_data/google_ads/search_volume/live`
  Body: `[{ "keywords": ["..."], "location_code": 2840, "language_code": "en" }]`,
  up to 1,000 keywords per task. Returns `search_volume`, `competition`,
  `cpc` and 12 months of `monthly_searches` per keyword.
- **Rate limits:** up to 2,000 API calls per minute; live SERP tasks are
  limited to a few dozen concurrent. The engine uses 5 concurrent calls.
- **Cost (approximate, confirm on https://dataforseo.com/pricing):** a live
  SERP page is a fraction of a cent (around $0.002 to $0.003 at standard
  priority). Search volume is billed per task of up to 1,000 keywords for a few
  cents. A run with 400 SERP lookups and 1,000 volume checks costs about
  $1 to $2.
- **Caching:** every SERP and volume response is saved under
  `data/runs/<date>/serp/<hash>.json` and reused if the step re-runs.

## Anthropic Claude API

- **Auth:** `ANTHROPIC_API_KEY`; client `new Anthropic()` reads it from env.
- **Models and prices (first-party API, per million tokens):**

  | Role | Model ID | Input | Output |
  |---|---|---|---|
  | Persona queries, clustering | `claude-haiku-5-5` | $0.10 | $0.50 |
  | Briefs | `claude-sonnet-5-5` | $2.00 | $10.00 |
  | Drafts | `claude-opus-5-5` | $4.00 | $20.00 |

- **Structured output:** every call that returns data uses
  `output_config.format` with a JSON schema derived from the zod schema, and
  the SDK's `messages.parse()` helper so the result is validated before use.
  No assistant prefill (rejected on current models).
- **Thinking:** adaptive thinking is on by default on these models. Set
  `output_config.effort` to `low` for persona queries and clustering,
  `medium` for briefs, `high` for drafts.
- **Streaming:** drafts use `messages.stream()` with `finalMessage()` so long
  outputs do not hit HTTP timeouts.
- **Prompt caching:** the system prompt plus `content/sources/` material is
  marked with `cache_control` so ten drafts in a run pay for the source
  material once.
- **Batch API option:** drafts are not latency-sensitive. If the budget gets
  tight, the draft step can be switched to the Message Batches API at half
  price; the run then waits up to a few hours for results. Not in the first
  implementation.
- **Rough cost per run** (10 pages, 75 persona queries, ~1,500 clustered
  queries, 40k tokens of source material cached):

  | Step | Tokens (in / out) | Cost |
  |---|---|---|
  | Persona queries (Haiku) | 5k / 5k | < $0.01 |
  | Clustering (Haiku) | 150k / 30k | ~$0.03 |
  | 10 briefs (Sonnet) | 150k / 30k | ~$0.60 |
  | 10 drafts (Opus, cached sources) | 250k / 50k | ~$1.50 |
  | **Total** | | **~$2 to $3 per run** |

  Two runs a month leave the $100 credit lasting well over a year. The real
  spend risk is retries and oversized source material, which the per-run token
  ceiling in `config/engine.json` guards against.

## IndexNow

- **Endpoint:** `POST https://api.indexnow.org/indexnow`
  (also `https://www.bing.com/indexnow`; one submission is shared with all
  IndexNow partners).
- **Headers:** `Content-Type: application/json; charset=utf-8`
- **Body:**
  ```json
  { "host": "www.example.com", "key": "<INDEXNOW_KEY>", "keyLocation": "https://www.example.com/<INDEXNOW_KEY>.txt", "urlList": ["https://www.example.com/page-1", "..."] }
  ```
- **Limits:** up to 10,000 URLs per request. Responses `200` and `202` mean
  accepted; `403` means the key file could not be verified; `422` means a URL
  does not belong to the host.
- **Cost:** free.

## GitHub (Octokit) in the publish-pr step

Sequence against the site repo with `SITE_REPO_TOKEN`:

1. `git.getRef` for `heads/<base>` to get the base SHA.
2. `git.createRef` for `heads/seo/<run-date>`.
3. For each draft: `repos.createOrUpdateFileContents` with the MDX content at
   `<contentDir>/<slug>.mdx` on the new branch (one commit per file is fine at
   ten files).
4. `pulls.create` with a body that links the run report and lists each page's
   target query and intent.

The pull request title is `SEO drafts <run-date>`. If a branch with that name
already exists the step fails rather than force-pushing.

## Schedule (GitHub Actions)

```yaml
on:
  schedule:
    - cron: "0 6 1,15 * *"   # 06:00 UTC on the 1st and 15th
  workflow_dispatch:
    inputs:
      from: { description: "Step to start from", required: false }
      dry_run: { description: "Skip drafting and PR", default: "true" }
```

Actions cron can be delayed by several minutes under load; the run date is
taken from the clock at start, so that does not matter.
