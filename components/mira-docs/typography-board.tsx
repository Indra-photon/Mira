import { DocBoard, DocRow, DocTable } from "./doc-board"

const headingWeight = "Heading/Weight   SemiBold 600"

const rows: {
  name: string
  className: string
  use: string
  variables: string[]
}[] = [
  {
    name: "Heading 1",
    className: "text-mira-heading-1",
    use: "Hero headline of marketing pages — Work with us, Promote, newsletter, homepage hero. One per page.",
    variables: [
      "Heading 1/Size/lg · md · sm   56 · 48 · 40px",
      "Heading 1/Line height   110%",
      "Heading 1/Tracking   -2%",
      headingWeight,
    ],
  },
  {
    name: "Heading 2",
    className: "text-mira-heading-2",
    use: "Hero titles of event-series and landing pages (Money 20/20 US Events); big section headlines on marketing pages.",
    variables: [
      "Heading 2/Size/lg · md · sm   48 · 40 · 32px",
      "Heading 2/Line height   110%",
      "Heading 2/Tracking   -2%",
      headingWeight,
    ],
  },
  {
    name: "Heading 3",
    className: "text-mira-heading-3",
    use: "Event detail title; big stats and key numbers (80K subscribers, 40% open rate) with tabular-nums.",
    variables: [
      "Heading 3/Size/lg · md · sm   40 · 32 · 28px",
      "Heading 3/Line height   110%",
      "Heading 3/Tracking   -2%",
      headingWeight,
    ],
  },
  {
    name: "Heading 4",
    className: "text-mira-heading-4",
    use: "Page title (the H1 element) of every product page — Cities, Companies, Members, Jobs.",
    variables: [
      "Heading 4/Size/lg · md · sm   32 · 28 · 24px",
      "Heading 4/Line height   110%",
      "Heading 4/Tracking   -2%",
      headingWeight,
    ],
  },
  {
    name: "Heading 5",
    className: "text-mira-heading-5",
    use: "Section titles within a page — Main events, Newsletter, Coliving; modal and drawer titles; page tabs.",
    variables: [
      "Heading 5/Size/lg · md · sm   24 · 24 · 20px",
      "Heading 5/Line height   110%",
      "Heading 5/Tracking   -1%",
      headingWeight,
    ],
  },
  {
    name: "Heading 6",
    className: "text-mira-heading-6",
    use: "Card and widget titles — event cards (HK Fintech Week), Jobs, Most popular event. Not for filter group titles in a sidebar — those use Text Small Bold.",
    variables: [
      "Heading 6/Size/lg · md · sm   20 · 20 · 18px",
      "Heading 6/Line height   110%",
      "Heading 6/Tracking   0%",
      headingWeight,
    ],
  },
  {
    name: "Text Large Bold",
    className: "text-mira-large font-bold",
    use: "Lead-in emphasis under page titles; prices and key facts in hero cards (MYR 350 · Free for CNC members).",
    variables: [
      "Text Large/Size/lg · md · sm   20 · 20 · 20px",
      "Text Large/Line height   140%",
      "Text/Tracking   0%",
      "Weight/Bold   700",
    ],
  },
  {
    name: "Text Large Regular",
    className: "text-mira-large font-normal",
    use: "Standfirst / intro paragraph under a page or hero title; marketing intros.",
    variables: [
      "Text Large/Size/lg · md · sm   20 · 20 · 20px",
      "Text Large/Line height   140%",
      "Text/Tracking   0%",
      "Weight/Regular   400",
    ],
  },
  {
    name: "Text Medium Bold",
    className: "text-mira-medium font-bold",
    use: "Subheadings inside long text (What you’ll learn), highlighted summaries, featured event names.",
    variables: [
      "Text Medium/Size/lg · md · sm   18 · 18 · 18px",
      "Text Medium/Line height   140%",
      "Text/Tracking   0%",
      "Weight/Bold   700",
    ],
  },
  {
    name: "Text Medium Regular",
    className: "text-mira-medium font-normal",
    use: "Long-form reading: event descriptions, About text, newsletter articles. 60–75 characters per line.",
    variables: [
      "Text Medium/Size/lg · md · sm   18 · 18 · 18px",
      "Text Medium/Line height   140%",
      "Text/Tracking   0%",
      "Weight/Regular   400",
    ],
  },
  {
    name: "Text Normal Bold",
    className: "text-mira-normal font-bold",
    use: "Buttons; the title of every list row — event names, job titles, company names; emphasised form labels.",
    variables: [
      "Text Normal/Size/lg · md · sm   16 · 16 · 16px",
      "Text Normal/Line height   140%",
      "Text/Tracking   0%",
      "Weight/Bold   700",
    ],
  },
  {
    name: "Text Normal Regular",
    className: "text-mira-normal font-normal",
    use: "Default product text: descriptions, list content, navigation, form labels and input text (16px stops iOS Safari zooming).",
    variables: [
      "Text Normal/Size/lg · md · sm   16 · 16 · 16px",
      "Text Normal/Line height   140%",
      "Text/Tracking   0%",
      "Weight/Regular   400",
    ],
  },
  {
    name: "Text Small Bold",
    className: "text-mira-small font-bold",
    use: "Tags (AI, Remote), counters (+64), small buttons, column headers, filter group titles in a sidebar (Who’s in the room, Topic). Medium badges use this size at SemiBold.",
    variables: [
      "Text Small/Size/lg · md · sm   14 · 14 · 14px",
      "Text Small/Line height   140%",
      "Text/Tracking   0%",
      "Weight/Bold   700",
    ],
  },
  {
    name: "Text Small Regular",
    className: "text-mira-small font-normal",
    use: "Metadata — dates, locations, “64 going”, timestamps; the topic line above a list title; Free / Paid; filled values in a compact search bar; helper text; captions and legal.",
    variables: [
      "Text Small/Size/lg · md · sm   14 · 14 · 14px",
      "Text Small/Line height   140%",
      "Text/Tracking   0%",
      "Weight/Regular   400",
    ],
  },
  {
    name: "Text Extra small SemiBold",
    className: "text-mira-extra-small font-semibold",
    use: "Small badge labels only — tables and dense lists. Never running text, links or buttons.",
    variables: [
      "Text Extra small/Size/lg · md · sm   12 · 12 · 12px",
      "Text Extra small/Line height   140%",
      "Text/Tracking   0%",
      "Weight/SemiBold   600",
    ],
  },
  {
    name: "Heading 6 · Hover",
    className:
      "text-mira-heading-6 underline decoration-from-font underline-offset-[0.15em]",
    use: "Title of a clickable card while the card is hovered — same style plus an underline. Never change size or weight on hover.",
    variables: ["Heading 6 variables", "Underline · offset 0.15em"],
  },
  {
    name: "Text Normal · Selected",
    className: "text-mira-normal font-bold",
    use: "Selected tab, active navigation item, selected filter chip — Regular → Bold. Reserve the bold width so the label doesn’t jump.",
    variables: [
      "Text Normal variables",
      "Weight/Bold   700 (from Regular 400)",
    ],
  },
]

export function TypographyBoard() {
  return (
    <DocBoard id="typography" title="Typography">
      <DocTable
        headers={[
          "Style · Montserrat for all UI (Family/UI) · shown at desktop size",
          "Where to use",
          "Variables · desktop · tablet · phone",
        ]}
      >
        {rows.map((row) => (
          <DocRow
            key={row.name}
            sample={
              <p className={`${row.className} text-mira-text-heading`}>
                {row.name}
              </p>
            }
            use={row.use}
            variables={row.variables}
          />
        ))}
        <DocRow
          sample={
            <a
              href="#typography"
              className="text-mira-normal font-normal text-mira-text-link-hover underline decoration-from-font underline-offset-[0.15em]"
            >
              Link · Hover
            </a>
          }
          use="Hovered inline links in any text style: add an underline (thickness from-font). Not for buttons."
          variables={[
            "Size of the text it sits in",
            "Colour Text/Link hover · underline offset 0.15em",
          ]}
        />
      </DocTable>
    </DocBoard>
  )
}
