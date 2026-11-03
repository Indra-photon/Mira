# 02 — Service setup (exact procedures)

Do these in order. Each section ends with the value you will put into `.env`
(locally) and into Mira's GitHub repository secrets (for Actions). Names match
`.env.example`.

## 0. Prerequisites

- Node 22 and pnpm 10 installed locally.
- Admin access to the website's Google Search Console property.
- Admin access to the PostHog project the website sends events to.
- Owner or admin rights on both GitHub repos (Mira and the site).
- A company card for DataForSEO prepayment.

## 1. Google Cloud + Search Console

Goal: a service account that can read Search Console data and submit sitemaps.

1. Open https://console.cloud.google.com and pick or create a project
   (suggested name: `seo-engine`).
2. **APIs & Services → Library**, search **Google Search Console API**, click
   **Enable**.
3. **IAM & Admin → Service Accounts → Create service account**.
   Name: `seo-engine`. No project roles are needed. Click **Done**.
4. Open the service account → **Keys → Add key → Create new key → JSON**.
   Save the downloaded file outside the repo, for example
   `~/.secrets/seo-engine-gsc.json`. Never commit it.
5. Copy the service account email from the JSON (`client_email`, looks like
   `seo-engine@<project>.iam.gserviceaccount.com`).
6. Open https://search.google.com/search-console, select the website property,
   **Settings → Users and permissions → Add user**. Paste the service account
   email. Permission: **Owner** (required for `sitemaps.submit`; reading data
   alone would only need Full).
7. Note the property identifier exactly as GSC shows it:
   - Domain property: `sc-domain:example.com`
   - URL-prefix property: `https://www.example.com/` (trailing slash included)

`.env`: `GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/seo-engine-gsc.json`,
`GSC_PROPERTY=sc-domain:example.com`.

GitHub secret: `GOOGLE_SERVICE_ACCOUNT_JSON` = the full JSON file contents.
The workflow writes it to a temp file and sets `GOOGLE_APPLICATION_CREDENTIALS`.

Verify: after Phase 0's `check.ts` exists, it calls `sites.list` and expects
the property in the result with `permissionLevel: siteOwner`.

## 2. PostHog

Goal: a personal API key that can run HogQL queries against the project.

1. In PostHog, open **Settings → Project → General** and copy the **Project ID**
   (a number).
2. Note the host: `https://us.posthog.com` (US cloud) or
   `https://eu.posthog.com` (EU cloud). Self-hosted: your own URL.
3. Open **Settings → User → Personal API keys → Create personal API key**.
   Label: `seo-engine`. Scopes: `query:read` and `project:read`. Organization
   and project access: only the website project. Copy the key (starts with
   `phx_`); it is shown once.
4. Confirm the website captures `$pageview` with `$referrer`,
   `$referring_domain` and `utm_source` properties. These are set by the
   PostHog JS snippet by default. If the site strips referrers with a
   `Referrer-Policy` of `no-referrer`, AI-referral detection will not work;
   `strict-origin-when-cross-origin` (the browser default) is fine.

`.env`: `POSTHOG_HOST`, `POSTHOG_PROJECT_ID`, `POSTHOG_API_KEY`.

Verify: `check.ts` runs `SELECT count() FROM events WHERE timestamp > now() - interval 1 day`.

## 3. DataForSEO

Goal: credentials for SERP results and search volume.

1. Sign up at https://app.dataforseo.com/register.
2. Add prepaid credit (**Dashboard → Billing**). Start small; a full run costs a
   few dollars (see 03-sdks-and-apis.md for per-call prices).
3. **Dashboard → API Access**: copy the **API login** (your email) and the
   **API password** (not your account password; generate one here if empty).
4. Pick the target market and look up its codes once:
   - United States: location_code `2840`, language_code `en`
   - United Kingdom: `2826`, `en`
   - India: `2356`, `en`
   - Any other: call `GET https://api.dataforseo.com/v3/serp/google/locations`
     and search the result for the country name.
5. While building, point the client at the free sandbox
   `https://sandbox.dataforseo.com` (same credentials, fake data, no charge).

`.env`: `DATAFORSEO_LOGIN`, `DATAFORSEO_PASSWORD`, `DATAFORSEO_BASE_URL`,
`DATAFORSEO_LOCATION_CODE`, `DATAFORSEO_LANGUAGE_CODE`.

Alternative SERP provider: Serper (https://serper.dev) gives 2,500 free
searches and returns organic results, People also ask and related searches.
It has no search volume data, so DataForSEO (or Google Ads Keyword Planner,
which needs a developer token and a manager account and is much heavier to set
up) is still needed for volume. Version 1 uses DataForSEO for both; Serper is
an optional swap for the SERP half only.

## 4. Anthropic

Goal: an API key with a spending cap.

1. Open https://console.anthropic.com → **API Keys → Create Key**. Name:
   `seo-engine`. Copy the key (`sk-ant-...`).
2. **Settings → Limits**: set a monthly spend limit (suggested: $30 while the
   $100 credit lasts) so a runaway run cannot drain the credit.
3. Optional: create a dedicated **Workspace** named `seo-engine` and issue the
   key inside it, so usage shows up separately in the console.

`.env`: `ANTHROPIC_API_KEY`, plus the three model IDs (defaults are in
`.env.example`; leave them unless you have a reason to change).

Verify: `check.ts` sends one short message to the fast model and prints the
token usage.

## 5. IndexNow

Goal: a key file on the website so Bing accepts URL submissions.

1. Generate a key: 8 to 128 characters, letters, digits and dashes only.
   One way, locally:
   ```bash
   node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
   ```
2. In the **site repo**, add `public/<key>.txt` whose only content is the key
   itself. After deploy it must be reachable at `https://www.example.com/<key>.txt`.
3. Nothing to register; the first submission validates the key file.

`.env` (site repo and Mira): `INDEXNOW_KEY`.

Verify: `curl https://www.example.com/<key>.txt` returns the key.

## 6. GitHub access from Mira to the site repo

Goal: Mira's workflow can push a branch and open a pull request in the site repo.

Option 1, fine-grained personal access token (simplest):

1. https://github.com/settings/personal-access-tokens → **Generate new token**.
2. Name: `seo-engine-site-pr`. Expiration: 1 year (set a calendar reminder).
3. Repository access: **Only select repositories** → the site repo.
4. Permissions → Repository permissions:
   - **Contents: Read and write**
   - **Pull requests: Read and write**
   - **Metadata: Read** (added automatically)
5. Generate and copy the token.

Option 2, a GitHub App installed on both repos. More setup, no expiry, and
pull requests show as the app rather than a person. Do this later if the
token's expiry or attribution becomes a problem.

`.env`: `SITE_REPO=owner/site-repo-name`, `SITE_REPO_TOKEN`, `SITE_REPO_BASE_BRANCH`.

Also in Mira's own workflow: `permissions: contents: write` so the job can
commit `data/runs/` back. The default `GITHUB_TOKEN` covers that; it cannot
reach the site repo, hence the separate token.

## 7. GitHub repository secrets (Mira)

**Settings → Secrets and variables → Actions → New repository secret** for each:

| Secret | Value |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_JSON` | contents of the service account JSON file |
| `POSTHOG_API_KEY` | `phx_...` |
| `DATAFORSEO_LOGIN` | DataForSEO API login |
| `DATAFORSEO_PASSWORD` | DataForSEO API password |
| `ANTHROPIC_API_KEY` | `sk-ant-...` |
| `SITE_REPO_TOKEN` | fine-grained PAT from section 6 |
| `INDEXNOW_KEY` | the IndexNow key |

Non-secret settings (`GSC_PROPERTY`, `POSTHOG_HOST`, `POSTHOG_PROJECT_ID`,
`SITE_REPO`, model IDs, location codes) go under **Variables**, or stay in
`config/engine.json` where they are not sensitive.

## 8. Site repo preparation (Phase 4, later)

Listed here so access can be arranged now:

- Add this Claude Code session's GitHub access to the site repo when we reach
  Phase 4, or do the Phase 4 changes by hand from the checklist.
- The site must expose `sitemap.xml` at its root; the engine reads it to avoid
  duplicate topics. If the site has no sitemap yet, Phase 4 adds one.

## Setup checklist

- [ ] Google Cloud project, Search Console API enabled
- [ ] Service account JSON downloaded and stored outside the repo
- [ ] Service account added as Owner in GSC
- [ ] PostHog project ID, host and `phx_` key with `query:read`
- [ ] DataForSEO account funded, API password generated, location code chosen
- [ ] Anthropic key created, spend limit set
- [ ] IndexNow key generated (file added to site repo in Phase 4)
- [ ] Fine-grained PAT for the site repo
- [ ] Mira repository secrets and variables added
- [ ] `.env` filled locally from `.env.example`
- [ ] `config/personas.md` written by a human (needed from Phase 2)
- [ ] `content/sources/` populated with real product material (needed from Phase 5)
