# 04 — Implementation plan

Seven phases. Each phase ends with something runnable and a checkable result.
Phases 1 to 3 need no site repo access and spend almost nothing. Nothing is
drafted with Claude Opus until Phase 5.

Estimates are working sessions, not calendar days.

## Phase 0 — Scaffold and access check

Goal: the repo can run a TypeScript script that talks to every service.

1. Add dependencies from `03-sdks-and-apis.md` (runtime: googleapis,
   @anthropic-ai/sdk, zod, gray-matter, p-limit, dotenv, @octokit/rest; dev: tsx).
2. Add `scripts/seo-engine/lib/env.ts`: zod schema over `process.env`, loads
   `.env` with dotenv when not in CI, fails fast with a readable list of
   missing variables.
3. Add `config/engine.json` and `config/ai-referrers.json` with the shapes in
   `01-architecture.md`, and `config/personas.md` with a template for a human
   to fill.
4. Add `scripts/seo-engine/check.ts`: one call per service, prints a table of
   OK / FAIL with the reason. Calls: GSC `sites.list`, PostHog
   `SELECT count() FROM events` (1 day), DataForSEO
   `GET /appendix/user_data` (balance), Anthropic one short Haiku message,
   GitHub `repos.get` on the site repo, HTTP GET of the site's `sitemap.xml`.
5. Add package scripts: `seo:check`, `seo:run`.
6. Add `data/runs/.gitkeep` and `content/sources/.gitkeep`.

Done when: `pnpm seo:check` prints OK for every service with real credentials.

## Phase 1 — Collect, find opportunities, report (first slice)

Goal: a dry run that produces real data and a readable report.

1. `lib/run-context.ts`: resolves `data/runs/<date>/`, read/write JSON with
   zod validation, step timing, usage log.
2. `lib/gsc.ts` + `steps/collect-gsc.ts`: paginated 28-day pull, saved as
   `gsc.json`. Also pull `dimensions: ["page"]` totals for the report.
3. `lib/posthog.ts` + `steps/collect-posthog.ts`: AI-referral landing pages
   saved as `posthog.json`, plus total sessions for context.
4. `lib/sitemap.ts`: fetch and parse the live `sitemap.xml` (handles sitemap
   index files) into a list of URLs with paths.
5. `steps/find-opportunities.ts`:
   - striking distance: position between min and max, impressions above
     threshold, grouped by query with the best page;
   - no matching page: impressions above threshold and no query word appears
     in the ranking page's path or title slug (simple heuristic for V1;
     Claude refines it in Phase 3);
   - AI-referred pages: every landing page from PostHog with session count.
   Output `opportunities.json`.
6. `steps/report.ts` (first version): writes `report.md` with totals,
   top 20 of each opportunity list, and the usage table.
7. `run.ts` with `--date`, `--from`, `--only`, `--dry-run`.
8. `.github/workflows/seo-engine.yml`: manual dispatch only for now, dry run,
   commits `data/runs/<date>/` back to the default branch.

Done when: a manual workflow run commits a run folder with `gsc.json`,
`posthog.json`, `opportunities.json` and `report.md`, and the report is
reviewed by a human to tune the thresholds in `config/engine.json`.

## Phase 2 — Persona research

Goal: our own query set with demand numbers, cached and capped.

1. `lib/claude.ts`: client, model map from env, `usage.json` accounting,
   a `structured()` helper wrapping `messages.parse()` with one retry.
2. `steps/research-serp.ts` part 1: Claude Haiku reads `config/personas.md`
   and returns 50 to 100 queries as structured output (`persona-queries.json`).
3. `lib/dataforseo.ts`: basic auth, sandbox toggle, response caching by
   request hash, p-limit(5), task status checking.
4. `steps/research-serp.ts` part 2: SERP for each persona query, collect
   organic top 10, People also ask and related searches; expand one level
   (PAA and related become new queries, no further expansion); cap total
   lookups at `limits.maxSerpLookupsPerRun`.
5. `steps/research-serp.ts` part 3: search volume for every unique query in
   batches of 1,000; drop below `research.minMonthlyVolume`; write
   `volumes.json` and `queries.json` (the merged, deduplicated set with source
   tags: gsc, posthog, persona, paa, related).
6. Report gains a research section: queries generated, expanded, kept, and
   DataForSEO spend.

Done when: a run against the DataForSEO sandbox completes under the cap, then
one real run produces plausible volumes for a sample checked by hand.

## Phase 3 — Cluster and brief

Goal: a ranked list of page briefs with no duplicates of existing pages.

1. `steps/cluster.ts`: Claude Haiku groups `queries.json` into intent topics
   (structured output: topic name, primary query, member queries, intent,
   total volume, evidence sources). Large inputs are chunked by 300 queries
   and merged in a second pass.
2. Duplicate check: each topic is compared against sitemap URLs and titles
   plus any unpublished drafts already in the site repo's content dir
   (listed via the GitHub API). Matches are marked `existing` with the URL
   and dropped from the brief queue but kept in the report as "improve
   existing page" suggestions.
3. Ranking: score from total volume, GSC evidence (striking distance gets a
   boost), AI-referral evidence, and SERP weakness (few strong domains in top
   10). Top `limits.maxPagesPerRun` go forward.
4. `steps/brief.ts`: Claude Sonnet writes one brief per topic from the SERP
   data and the topic (structured output: target query, related queries,
   intent, what top results cover, gaps we can fill, suggested internal links
   from the sitemap, outline). Saved as `briefs/<slug>.json`.
5. Report gains topics found, topics skipped as existing, and the briefs.

Done when: a human reads the briefs from one run and agrees at least half are
pages worth writing. If not, prompts and ranking are tuned before Phase 5.

## Phase 4 — Site repo preparation (one time)

Goal: the website can render, list and announce published SEO pages.

1. Inspect the site's Next.js version and existing MDX setup. Read that
   version's docs before writing code; APIs differ between versions.
2. Add `content/seo-pages/` and the frontmatter contract from
   `01-architecture.md`.
3. Add the dynamic route that renders files with `status: published` and
   returns 404 for drafts. Use the site's layout, metadata from frontmatter,
   and `generateStaticParams` over published slugs.
4. Add or extend `app/sitemap.ts` to include published SEO pages with
   `lastModified` from the file.
5. Add `public/<INDEXNOW_KEY>.txt`.
6. Add `scripts/seo-submit.ts` (GSC `sitemaps.submit` + IndexNow POST for
   URLs changed since the last submission) and a workflow that runs it after
   the production deploy succeeds. Record submitted URLs in a small JSON file
   so the same URL is not pinged every deploy.
7. Add `GOOGLE_SERVICE_ACCOUNT_JSON`, `GSC_PROPERTY`, `INDEXNOW_KEY` secrets
   to the site repo.

Done when: a hand-written test MDX page with `status: published` renders on
production, appears in `sitemap.xml`, and the submit workflow reports success
for GSC and IndexNow.

## Phase 5 — Draft and open the pull request

Goal: drafts land in the site repo for review.

1. `steps/draft.ts`: Claude Opus writes each page from its brief plus the
   relevant files in `content/sources/` (selected by the brief's topic; whole
   folder if small). System prompt and sources are cache-controlled. Output is
   validated: frontmatter schema, minimum word count, every factual claim
   about the product must trace to a source file (the model lists the sources
   it used; the step rejects a draft citing none). Saved as `drafts/<slug>.mdx`
   with `status: draft` and `runDate`.
2. `lib/github.ts` + `steps/publish-pr.ts`: branch `seo/<date>`, one commit
   per draft, pull request with the report summary and a review checklist.
3. Per-run token ceiling enforced; the step stops and reports if exceeded.
4. Report gains drafted pages, token usage and cost per page, and the PR link.
5. Workflow switches from dry run to full run on manual dispatch.

Done when: one real run opens a pull request with up to 10 drafts, and a human
publishes at least one by changing its status and merging.

## Phase 6 — Schedule and performance reporting

Goal: unattended twice-monthly runs that measure earlier pages.

1. Enable the cron schedule in the workflow.
2. `steps/report.ts` part 2: for every page from previous runs (found by
   `runDate` in the site repo's content dir via the GitHub API), pull GSC
   clicks, impressions and position for its URL, and PostHog AI-referral
   sessions, and show run-over-run deltas.
3. Failure handling: on any step failure the workflow still commits the run
   folder and opens a GitHub issue in Mira with the error and the `--from`
   command to resume.
4. A short `docs/seo-engine/05-runbook.md`: how to run locally, resume a
   step, change thresholds, rotate keys, and what to check when a report
   looks wrong.

Done when: two scheduled runs complete without manual intervention and the
second report shows performance numbers for pages published after the first.

## Phase 7 — Hardening (as needed)

- Switch drafts to the Message Batches API if cost matters more than wait time.
- Replace the fine-grained PAT with a GitHub App.
- Add a persona-query cache so identical persona files do not regenerate
  queries every run.
- Tune thresholds and prompts from the reports.

## Order of work and what I need from you

| Phase | Needs from you before starting |
|---|---|
| 0 | GSC service account, PostHog key, DataForSEO account, Anthropic key, site repo name and PAT, site URL and GSC property |
| 1 | Nothing more |
| 2 | `config/personas.md` written; target country and language chosen |
| 3 | Nothing more |
| 4 | Site repo added to this session's GitHub access, or the checklist done by hand |
| 5 | `content/sources/` filled with real product material |
| 6 | Agreement on the cron time |
