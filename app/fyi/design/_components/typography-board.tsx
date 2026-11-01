import type { ReactNode } from "react"

import { DocBoard } from "@/components/mira-docs/doc-board"
import { cn } from "@/lib/utils"

import { CellLabel, DocGrid, DocHeaderRow, TokenCell } from "./doc-parts"

/**
 * fyi · Typography — the consolidated fyi type system: 8 styles instead of
 * the 16 the page grew. Display and headings in Outfit (28px and up only),
 * everything you read or tap in Montserrat. Headings reuse the Mira H2 / H3
 * ramps; tracking and line height are set per tier, not per style.
 *
 * Specimens are shown at desktop size.
 */

type Family = "Outfit" | "Montserrat"

type Row = {
  name: string
  family: Family
  weight: string
  specimen: ReactNode
  use: string
  replaces: string[]
  variables: string[]
  token: string
}

const heading = "text-mira-text-heading"
const emphasis = "font-bold text-mira-text-heading"

const rows: Row[] = [
  /* ── Outfit · display & headings ──────────────────────── */
  {
    name: "Display",
    family: "Outfit",
    weight: "SemiBold 600 · Medium 500",
    specimen: (
      <div className="flex flex-col gap-4">
        <p
          className={cn(
            "font-fyi-display text-fyi-display whitespace-nowrap",
            heading
          )}
        >
          Mira <span className="block text-fyi-reach">Reach</span>
        </p>
        <p
          className={cn(
            "font-fyi-display text-fyi-display font-medium whitespace-nowrap tabular-nums",
            heading
          )}
        >
          100+
        </p>
      </div>
    ),
    use: "The loudest moments: the flagship product name (SemiBold, second line in the product accent) and the proof figures in the stats panel (Medium, tabular figures).",
    replaces: ["Display XL", "Display Stat"],
    variables: [
      "Size/lg · md · sm   96 · 72 · 48px",
      "Line height   100%",
      "Tracking   -3%",
      "Weight   SemiBold 600 names · Medium 500 figures",
    ],
    token: "fyi/display",
  },
  {
    name: "Heading Section",
    family: "Outfit",
    weight: "Medium 500",
    specimen: (
      <p className={cn("font-fyi-display text-fyi-heading-section", heading)}>
        Three ways to engage
      </p>
    ),
    use: "Section headlines — Three ways to engage, Trusted across digital finance, Get in touch. Uses the Mira Heading 2 ramp in Outfit.",
    replaces: ["Heading Section (28 · 36 · 48)"],
    variables: [
      "Size/lg · md · sm   48 · 40 · 32px  (Mira H2)",
      "Line height   110%",
      "Tracking   -2%",
      "Weight   Medium 500",
    ],
    token: "fyi/heading/section",
  },
  {
    name: "Heading Card",
    family: "Outfit",
    weight: "SemiBold 600 · Medium 500",
    specimen: (
      <div className="flex w-full max-w-[360px] items-start justify-between gap-6">
        <p
          className={cn(
            "font-fyi-display text-fyi-heading-card whitespace-nowrap",
            heading
          )}
        >
          Mira <span className="block text-fyi-gtm">GTM</span>
        </p>
        <p className="font-fyi-display text-fyi-heading-card font-medium text-fyi-gtm-number">
          02
        </p>
      </div>
    ),
    use: "Product names in the secondary bento cards (SemiBold). The card index 01–03 uses the same style at Medium in the product number colour, so it reads as part of the title, not a second headline. Uses the Mira Heading 3 ramp in Outfit.",
    replaces: ["Heading Card", "Card Number (Montserrat Bold)"],
    variables: [
      "Size/lg · md · sm   40 · 32 · 28px  (Mira H3)",
      "Line height   110%",
      "Tracking   -2%",
      "Weight   SemiBold 600 names · Medium 500 numbers",
    ],
    token: "fyi/heading/card",
  },

  /* ── Montserrat · text ───────────────────────────────── */
  {
    name: "Lead",
    family: "Montserrat",
    weight: "Regular 400",
    specimen: (
      <p className="text-fyi-lead font-normal text-mira-text-meta">
        We combine <span className={heading}>proprietary data</span> and{" "}
        <span className={heading}>market insights</span>.
      </p>
    ),
    use: "The statement under the hero. Left-aligned, Text/Meta, with the key phrases lifted to Text/Heading (colour, not weight).",
    replaces: ["Lead (32 · 26 · 20, -1%)"],
    variables: [
      "Size/lg · md · sm   32 · 28 · 20px",
      "Line height   140%",
      "Tracking   0%",
      "Weight   Regular 400",
    ],
    token: "fyi/text/lead",
  },
  {
    name: "Text Large",
    family: "Montserrat",
    weight: "Regular 400 · Bold 700",
    specimen: (
      <p className="text-fyi-large font-normal text-mira-text-meta">
        Get in front of 100k+ professionals via{" "}
        <strong className={emphasis}>Platform</strong>.
      </p>
    ),
    use: "Prominent single paragraphs and lines: the hero tagline (Text/On dark), the lead card description and stat labels (Text/Meta). Emphasis in Bold Text/Heading.",
    replaces: ["Tagline", "Body Large", "Stat Label"],
    variables: [
      "Size/lg · md · sm   20 · 18 · 16px",
      "Line height   140%",
      "Tracking   0%",
      "Weight   Regular 400 · emphasis Bold 700",
    ],
    token: "fyi/text/large",
  },
  {
    name: "Text Body",
    family: "Montserrat",
    weight: "Regular 400 · Bold 700",
    specimen: (
      <p className="text-fyi-body font-normal text-mira-text-meta">
        A structured fractional GTM service, powered by{" "}
        <strong className={emphasis}>four years of ecosystem data</strong>.
      </p>
    ),
    use: "Card descriptions, the footer sign-off, and typed values / placeholders in inputs. Inputs stay 16px on every screen so iOS doesn’t zoom.",
    replaces: ["Body (16 · 15 · 14)", "Caption (16 · 14 · 13)", "Input"],
    variables: [
      "Size/lg · md · sm   16 · 16 · 14px  (inputs 16 · 16 · 16)",
      "Line height   140%",
      "Tracking   0%",
      "Weight   Regular 400 · emphasis Bold 700",
    ],
    token: "fyi/text/body",
  },
  {
    name: "Text Small",
    family: "Montserrat",
    weight: "Regular 400 · Bold 700",
    specimen: (
      <div className="flex flex-col gap-2">
        <p className="text-fyi-small font-normal text-mira-text-meta">
          Read by teams at
        </p>
        <p className="flex gap-1.5 text-fyi-small font-bold text-mira-text-body">
          Telegram
          <span className="font-normal text-mira-text-meta">(optional)</span>
        </p>
        <p className="text-fyi-small font-normal text-mira-feedback-error-text">
          Enter a valid email address.
        </p>
      </div>
    ),
    use: "Captions over logo rails (Regular, Text/Meta), form labels (Bold, Text/Body) and inline errors / status (Feedback text). One size on every screen.",
    replaces: ["Eyebrow (Outfit)", "Form Label", "Helper"],
    variables: [
      "Size/lg · md · sm   14 · 14 · 14px",
      "Line height   140%",
      "Tracking   0%",
      "Weight   Regular 400 · labels Bold 700",
    ],
    token: "fyi/text/small",
  },
  {
    name: "Button",
    family: "Montserrat",
    weight: "Bold 700",
    specimen: (
      <p className="text-fyi-button font-bold text-mira-text-on-primary-button">
        Request a briefing
      </p>
    ),
    use: "Every pill button label. Trimmed to cap height inside the button so it centres optically. The nav button uses Text Small Bold on phones.",
    replaces: ["Button"],
    variables: [
      "Size/lg · md · sm   16 · 16 · 16px",
      "Line height   140% · trim cap → alphabetic",
      "Tracking   0%",
      "Weight   Bold 700",
    ],
    token: "fyi/text/button",
  },
]

/** The Tailwind classes that apply each token (app/fyi/fyi-theme.css). */
const UTILITY: Record<string, string> = {
  "fyi/display": "font-fyi-display text-fyi-display",
  "fyi/heading/section": "font-fyi-display text-fyi-heading-section",
  "fyi/heading/card": "font-fyi-display text-fyi-heading-card",
  "fyi/text/lead": "text-fyi-lead",
  "fyi/text/large": "text-fyi-large",
  "fyi/text/body": "text-fyi-body · inputs text-fyi-input",
  "fyi/text/small": "text-fyi-small",
  "fyi/text/button": "text-fyi-button",
}

const SUMMARY = [
  { label: "Styles", from: "16", to: "8" },
  { label: "Font sizes", from: "15", to: "10" },
  { label: "Off-scale sizes", from: "5", to: "0" },
  { label: "Tracking values", from: "5", to: "3" },
  { label: "Line heights", from: "4", to: "3" },
]

const HEADERS = [
  "Style · live token at this screen size",
  "Font",
  "Where to use · replaces",
  "Variables · desktop · tablet · phone",
  "Semantic variable",
] as const

const columns =
  "grid grid-cols-1 gap-4 lg:grid-cols-[440fr_200fr_440fr_360fr_240fr] lg:items-center lg:gap-6"

function FontCell({ family, weight }: { family: Family; weight: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p
        className={cn(
          "text-mira-heading-6 text-mira-text-heading",
          family === "Outfit" ? "font-fyi-display" : "font-mira"
        )}
      >
        {family}
      </p>
      <p className="text-mira-small text-mira-text-body">{weight}</p>
      <p className="text-mira-extra-small text-mira-text-meta">
        {family === "Outfit"
          ? "Display · 28px and up"
          : "UI · everything read or tapped"}
      </p>
    </div>
  )
}

export function FyiTypographyBoard() {
  return (
    <DocBoard id="fyi-typography" title="Typography">
      <div className="-mt-4 flex flex-col gap-6">
        <p className="max-w-[900px] text-mira-normal text-mira-text-meta">
          Two families:{" "}
          <span className="font-fyi-display font-semibold text-mira-text-heading">
            Outfit
          </span>{" "}
          for display and headings (28px and up only) and{" "}
          <span className="font-bold text-mira-text-heading">Montserrat</span>{" "}
          for everything you read or tap. Headings reuse the Mira H2 / H3 ramps;
          tracking and line height are set per tier — display −3% / 100%,
          headings −2% / 110%, text 0% / 140%.
        </p>
        <dl className="flex flex-wrap gap-3">
          {SUMMARY.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-1 rounded-mira-table bg-mira-background-section px-4 py-3 shadow-[inset_0_0_0_1px_var(--mira-border-divider)]"
            >
              <dt className="text-mira-extra-small font-bold text-mira-text-meta">
                {item.label}
              </dt>
              <dd className="text-mira-normal text-mira-text-meta tabular-nums">
                {item.from} →{" "}
                <span className="font-bold text-mira-text-heading">
                  {item.to}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="text-mira-small text-mira-text-meta">
          Live — the /fyi page uses only these 8 tokens.
        </p>
      </div>

      <DocGrid label="fyi typography styles">
        <DocHeaderRow columns={columns} headers={HEADERS} />

        {rows.map((row) => (
          <div
            key={row.token}
            role="row"
            className={cn(
              columns,
              "px-6 py-6 shadow-mira-divider last:shadow-none"
            )}
          >
            <div role="cell" className="flex min-w-0 flex-col gap-3">
              <p className="text-mira-small font-bold text-mira-text-meta">
                {row.name}
              </p>
              <div className="min-w-0 overflow-x-auto">{row.specimen}</div>
            </div>
            <div role="cell" className="flex flex-col gap-1">
              <CellLabel>{HEADERS[1]}</CellLabel>
              <FontCell family={row.family} weight={row.weight} />
            </div>
            <div role="cell" className="flex flex-col gap-3">
              <CellLabel>{HEADERS[2]}</CellLabel>
              <p className="text-mira-normal text-pretty text-mira-text-body">
                {row.use}
              </p>
              <ul className="flex flex-wrap gap-1.5" aria-label="Replaces">
                {row.replaces.map((old) => (
                  <li
                    key={old}
                    className="rounded-full px-2.5 py-0.5 text-mira-extra-small text-mira-text-meta shadow-[inset_0_0_0_1px_var(--mira-border-divider)]"
                  >
                    {old}
                  </li>
                ))}
              </ul>
            </div>
            <div
              role="cell"
              className="flex flex-col gap-1 text-mira-small whitespace-pre-wrap text-mira-text-body"
            >
              <CellLabel>{HEADERS[3]}</CellLabel>
              {row.variables.map((variable) => (
                <p key={variable}>{variable}</p>
              ))}
            </div>
            <div role="cell" className="flex flex-col gap-1">
              <CellLabel>{HEADERS[4]}</CellLabel>
              <TokenCell token={row.token} utility={UTILITY[row.token]} />
            </div>
          </div>
        ))}
      </DocGrid>
    </DocBoard>
  )
}
