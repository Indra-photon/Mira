# 05 — Site repo findings (craftUI-Pro)

Read on 2026-11-03 from a read-only clone of `craftUI012/craftUI-Pro`
(public). These facts drive Phase 4 and the de-duplication logic.

## Site facts

| Item | Value |
|---|---|
| Live site | https://www.craftui.space |
| Repo | `craftUI012/craftUI-Pro` (public, this account can push) |
| Framework | Next.js 16.2.4, App Router, pnpm |
| MDX | fumadocs-mdx 14 + fumadocs-core 16, collections defined in `source.config.ts` |
| Content | `content/docs/` (components 8, blocks 8, templates 16, isometric 5, root 2 MDX files) and `content/docs-admin/` (dev-only handbook) |
| Sitemap | `app/sitemap.ts`: home, pricing, about, build-landing-pages, sponsor, plus every indexable docs page. No `lastModified` by design. |
| Robots | `app/robots.txt/route.ts`: allows all, disallows admin, docs-admin, design-admin, seo-admin, preview, template-preview, dashboard, api, prototypes. Points at the sitemap. |
| Site URL source | `NEXT_PUBLIC_SITE_URL` env, read in `constants/site.ts` (`SITE.URL`) |
| Routes | `constants/routes.ts` (`ROUTES`). `/blog` is reserved but has no page yet. |
| Metadata helper | `seo/metadata.ts` → `createPageMetadata({ path, title, description, noIndex, og* })` |
| Structured data | `seo/json-ld.tsx` |
| PostHog | US cloud (`ui_host: https://us.posthog.com`), initialised in `instrumentation-client.ts`, events proxied through `/relay`. Captures `$pageview` on every client navigation with the 2026-08-30 defaults, so `$referrer`, `$referring_domain` and `utm_*` are present. |
| Existing SEO admin | `/seo-admin` (dev only, `lib/flags.ts`): audits metadata, sitemap, robots, icons and lets a human edit docs pages' SEO text. Not an engine; no overlap with ours. |
| CI | `.github/workflows/ci.yml`: lint/format (`pnpm check`, ultracite/oxlint), typecheck and build on PRs. Our drafts PR must pass it. |
| Deploy | Vercel (fallback origin `craftui-pro.vercel.app`). No deploy workflow in the repo, so the submit step will hook on Vercel's deploy success, see below. |
| Lint rules | oxlint + oxfmt via ultracite, lefthook pre-commit. Any TS we add must pass `pnpm check`. |

## Implications for Phase 4 (site preparation)

1. **New pages become a fumadocs collection, not a hand-rolled MDX route.**
   Add `content/seo-pages/` and a third `defineDocs` collection in
   `source.config.ts` (`seoPages`) with a frontmatter schema that extends
   `frontmatterSchema` with `targetQuery`, `relatedQueries`, `intent`,
   `status`, `runDate`, `sources`. Render it with a route of its own, for
   example `app/(app)/guides/[slug]/page.tsx`, using the existing docs page
   layout and `createPageMetadata`. Drafts (`status: draft`) return 404 and
   are excluded from `getPages()` consumers.
2. **Route prefix decision needed:** `/guides/<slug>` is suggested. `/blog`
   is reserved in `ROUTES` with no page; reusing it is also possible if the
   pages read as articles. Decide before Phase 4.
3. **Sitemap:** extend `app/sitemap.ts` with the published `seoPages`
   entries. Keep the "no lastModified" rule for consistency.
4. **Robots:** nothing to change; the new prefix is allowed by default.
5. **IndexNow key file:** `public/<key>.txt`. The repo is public, which is
   fine; the key is only a proof that we control the host.
6. **Submit step trigger:** no GitHub deploy workflow exists. Options:
   a Vercel deploy hook calling a small GitHub Actions `repository_dispatch`,
   or a `workflow_run` after CI on `main` with a short delay. Pick in Phase 4.
7. **Engine de-duplication inputs:** the live `sitemap.xml` plus the docs
   titles. The sitemap is the source of truth for "page exists".
8. **CI compatibility:** engine-generated MDX must satisfy the collection
   schema or the site build fails on the PR, which is the right place for it
   to fail.

## Network note for this Claude session

The cloud container's network policy denies `www.craftui.space`, so the live
sitemap and robots could not be fetched from here. The engine itself runs in
GitHub Actions or locally, where this does not apply. To let this session
fetch the live site (useful for Phase 1 checks), add `www.craftui.space`
under Allowed domains in the environment's network settings:
https://code.claude.com/docs/en/cloud-environments#network-access
