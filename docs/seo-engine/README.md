# SEO Page Engine — planning docs

Planning for Version 1 of the SEO Page Engine. No code yet; these documents are
the agreed design and the setup checklist. Read them in order.

| File | What it covers |
|---|---|
| [00-spec.md](./00-spec.md) | The original Version 1 spec. Source of truth for scope. |
| [01-architecture.md](./01-architecture.md) | Two-repo layout, data flow, folder structure, file formats. |
| [02-service-setup.md](./02-service-setup.md) | Exact procedures to set up Google, PostHog, DataForSEO, Anthropic, IndexNow and GitHub access. |
| [03-sdks-and-apis.md](./03-sdks-and-apis.md) | Exact packages, endpoints, auth, quotas and costs. |
| [04-implementation-plan.md](./04-implementation-plan.md) | Phased build order with acceptance criteria. |
| [../../.env.example](../../.env.example) | Every secret and setting the engine reads. |

## Decisions already made

- **Option A, two repos.** This repo (`Mira`) is the engine. The website lives in
  its own repo. The engine opens pull requests into the website repo; it never
  publishes on its own.
- **First slice is collection + opportunities + report.** No Claude drafting
  until real Search Console and PostHog data has been seen.
- **Human review is the gate.** A page goes live only when a human merges the
  pull request and the page's `status` is `published`.
- **Node 22 + TypeScript + pnpm.** Scripts run with `tsx`, locally and in
  GitHub Actions.
- **Models:** Claude Haiku 5.5 for persona queries and clustering, Claude
  Sonnet 5.5 for briefs, Claude Opus 5.5 for drafts.
