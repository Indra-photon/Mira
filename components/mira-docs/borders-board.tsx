import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { DocBoard } from "./doc-board"

/**
 * Figma: Border frames › Borders (128:141). Every swatch draws its edge with a
 * shadow-mira-* utility — never a CSS border.
 *
 * Columns are Sample · Where to use · Variables at 260 / 600 / 660 (1600px
 * table), so this board composes its own rows with the DocTable/DocRow styling
 * instead of the shared 520 / 640 / 520 grid.
 */

const columns =
  "grid grid-cols-1 gap-4 md:grid-cols-[minmax(172px,260fr)_600fr_660fr] md:items-center"

/** 160×56 swatch, 12px radius — the size Figma uses for every card-like sample. */
const swatch = "h-14 w-40 shrink-0 rounded-mira-table"

/** 160×40 swatch, 8px radius — input samples. */
const inputSwatch = "h-10 w-40 shrink-0 rounded-[8px] bg-mira-background-card"

/** Animate only the shadow: 150ms ease-out (copy from the Card hover row). */
const shadowTransition =
  "transition-shadow duration-150 ease-out motion-reduce:transition-none"

const rows: {
  name: string
  use: string
  variables: string[]
  sample: ReactNode
}[] = [
  {
    name: "mira-border/Card",
    use: "Cards, event rows, panels and containers that need an edge (with Background/Card).",
    variables: [
      "0 0 0 1px  ·  Alpha/Black 6%  ·  Width/Default",
      "0 1px 2px -1px  ·  Alpha/Black 6%  ·  Shadow/Card/Lift Y · blur · spread",
      "0 2px 4px 0  ·  Alpha/Black 4%  ·  Shadow/Card/Ambient Y · blur · spread",
    ],
    sample: (
      <div
        className={cn(
          swatch,
          shadowTransition,
          "bg-mira-background-card shadow-mira-card hover:shadow-mira-card-hover"
        )}
      />
    ),
  },
  {
    name: "mira-border/Card hover",
    use: "Hovered card or clickable row. Animate only the shadow: 150ms ease-out.",
    variables: [
      "0 0 0 1px  ·  Alpha/Black 8%  ·  Width/Default",
      "0 1px 2px -1px  ·  Alpha/Black 8%  ·  Shadow/Card/Lift Y · blur · spread",
      "0 2px 4px 0  ·  Alpha/Black 6%  ·  Shadow/Card/Ambient Y · blur · spread",
    ],
    sample: (
      <div
        className={cn(swatch, "bg-mira-background-card shadow-mira-card-hover")}
      />
    ),
  },
  {
    name: "mira-border/Elevated",
    use: "Surfaces floating above the page: dropdowns, popovers, date picker, modals, toasts.",
    variables: [
      "0 0 0 1px  ·  Alpha/Black 6%  ·  Width/Default",
      "0 4px 8px -2px  ·  Alpha/Black 8%  ·  Shadow/Elevated/Lift Y · blur · spread",
      "0 12px 24px -4px  ·  Alpha/Black 10%  ·  Shadow/Elevated/Ambient Y · blur · spread",
    ],
    sample: (
      <div
        className={cn(swatch, "bg-mira-background-card shadow-mira-elevated")}
      />
    ),
  },
  {
    name: "mira-border/Button",
    use: "Secondary buttons (with Button/Secondary). Same values as Card, named apart so buttons can change on their own.",
    variables: [
      "0 0 0 1px  ·  Alpha/Black 6%  ·  Width/Default",
      "0 1px 2px -1px  ·  Alpha/Black 6%  ·  Shadow/Button/Lift Y · blur · spread",
      "0 2px 4px 0  ·  Alpha/Black 4%  ·  Shadow/Button/Ambient Y · blur · spread",
    ],
    sample: (
      <div
        className={cn(
          swatch,
          "bg-mira-button-secondary shadow-mira-button transition-[box-shadow,background-color] duration-150 ease-out motion-reduce:transition-none",
          "hover:bg-mira-button-secondary-hover hover:shadow-mira-button-hover"
        )}
      />
    ),
  },
  {
    name: "mira-border/Button hover",
    use: "Hovered secondary button (with Button/Secondary hover).",
    variables: [
      "0 0 0 1px  ·  Alpha/Black 8%  ·  Width/Default",
      "0 1px 2px -1px  ·  Alpha/Black 8%  ·  Shadow/Button/Lift Y · blur · spread",
      "0 2px 4px 0  ·  Alpha/Black 6%  ·  Shadow/Button/Ambient Y · blur · spread",
    ],
    sample: (
      <div
        className={cn(
          swatch,
          "bg-mira-button-secondary-hover shadow-mira-button-hover"
        )}
      />
    ),
  },
  {
    name: "mira-border/Focus ring",
    use: "Keyboard focus (:focus-visible) on every interactive element: 2px white gap + 2px indigo.",
    variables: [
      "0 0 0 4px  ·  Border/Focus ring  ·  Shadow/Ring/Outer spread",
      "0 0 0 2px  ·  Neutral/0  ·  Focus/Gap",
    ],
    sample: (
      <div
        className={cn(swatch, "bg-mira-background-card shadow-mira-focus-ring")}
      />
    ),
  },
  {
    name: "mira-border/Selected",
    use: "Selected card, option or chip — with Background/Selected and a check icon.",
    variables: ["0 0 0 2px  ·  Border/Selected  ·  Width/Strong"],
    sample: (
      <div
        className={cn(
          swatch,
          "bg-mira-background-selected shadow-mira-selected"
        )}
      />
    ),
  },
  {
    name: "mira-border/Member avatar",
    use: "Ring around member and CNC-holder avatars: 2px white gap + 2px lilac.",
    variables: [
      "0 0 0 4px  ·  Border/Member avatar  ·  Shadow/Ring/Outer spread",
      "0 0 0 2px  ·  Neutral/0  ·  Focus/Gap",
    ],
    sample: (
      <div className="size-10 shrink-0 rounded-full bg-mira-brand-purple-light shadow-mira-member-avatar" />
    ),
  },
  {
    name: "mira-border/Alert success",
    use: "Inset 1px edge of success alerts and banners.",
    variables: ["inset 0 0 0 1px  ·  Border/Alert/Success  ·  Width/Default"],
    sample: (
      <div
        className={cn(
          swatch,
          "bg-mira-feedback-success-background shadow-mira-alert-success"
        )}
      />
    ),
  },
  {
    name: "mira-border/Alert warning",
    use: "Inset 1px edge of warning alerts and banners.",
    variables: ["inset 0 0 0 1px  ·  Border/Alert/Warning  ·  Width/Default"],
    sample: (
      <div
        className={cn(
          swatch,
          "bg-mira-feedback-warning-background shadow-mira-alert-warning"
        )}
      />
    ),
  },
  {
    name: "mira-border/Alert error",
    use: "Inset 1px edge of error alerts and banners.",
    variables: ["inset 0 0 0 1px  ·  Border/Alert/Error  ·  Width/Default"],
    sample: (
      <div
        className={cn(
          swatch,
          "bg-mira-feedback-error-background shadow-mira-alert-error"
        )}
      />
    ),
  },
  {
    name: "mira-border/Alert info",
    use: "Inset 1px edge of info alerts and banners.",
    variables: ["inset 0 0 0 1px  ·  Border/Alert/Info  ·  Width/Default"],
    sample: (
      <div
        className={cn(
          swatch,
          "bg-mira-feedback-info-background shadow-mira-alert-info"
        )}
      />
    ),
  },
  {
    name: "Border/Divider",
    use: "1px lines between list rows, menu items, table cells and page sections — drawn as a shadow, never a stroke. Bottom line: inset 0 −1px 0 0.",
    variables: [
      "inset 0 -1px 0 0  ·  Border/Divider  ·  Neutral/200",
      "Width/Default  ·  1px",
    ],
    sample: (
      <div className="h-7 w-40 shrink-0 bg-mira-background-card shadow-mira-divider" />
    ),
  },
  {
    name: "Border/Input",
    use: "Edge of inputs, selects, checkboxes and radios — a 1px inner-shadow ring, never a stroke (3.59:1 on white). Turn on Clip content or the ring won’t render.",
    variables: [
      "inset 0 0 0 1px  ·  Border/Input  ·  Neutral/500",
      "Width/Default  ·  1px",
    ],
    sample: <div className={cn(inputSwatch, "shadow-mira-input")} />,
  },
  {
    name: "Border/Input hover",
    use: "Hovered input or select.",
    variables: [
      "inset 0 0 0 1px  ·  Border/Input hover  ·  Neutral/600",
      "Width/Default  ·  1px",
    ],
    sample: <div className={cn(inputSwatch, "shadow-mira-input-hover")} />,
  },
  {
    name: "Border/Input focus",
    use: "Focused input, shown together with mira-border/Focus ring.",
    variables: [
      "inset 0 0 0 1px  ·  Border/Input focus  ·  Indigo/600",
      "Width/Default  ·  1px",
    ],
    sample: <div className={cn(inputSwatch, "shadow-mira-input-focus")} />,
  },
  {
    name: "Border/Input error",
    use: "Input that failed validation, always with an error message.",
    variables: [
      "inset 0 0 0 1px  ·  Border/Input error  ·  Error/600",
      "Width/Default  ·  1px",
    ],
    sample: <div className={cn(inputSwatch, "shadow-mira-input-error")} />,
  },
  {
    name: "Border/Image",
    use: "1px inset outline on every image — an inner-shadow ring, black 10%, never a tinted grey and never a stroke.",
    variables: [
      "inset 0 0 0 1px  ·  Border/Image  ·  Alpha/Black 10%",
      "Width/Default  ·  1px",
    ],
    sample: (
      <div
        className={cn(swatch, "bg-mira-brand-purple-tint shadow-mira-image")}
      />
    ),
  },
]

const headers = [
  "Sample",
  "Where to use",
  "Variables · effect layers (x y blur spread · colour · numbers) or colour · width",
]

export function BordersBoard() {
  return (
    <DocBoard id="mira-borders" title="Borders">
      <p className="text-mira-normal font-normal text-pretty text-mira-text-body">
        Every edge and divider is a shadow — never a stroke. Frames need Clip
        content on, or shadow spread won’t render.
      </p>

      <div
        role="table"
        aria-label="Border effects"
        className="w-full overflow-clip rounded-mira-table bg-mira-background-card shadow-[inset_0_0_0_1px_var(--mira-border-divider)]"
      >
        <div
          role="row"
          className={cn(
            columns,
            "hidden bg-mira-background-section px-6 py-3 shadow-mira-divider md:grid"
          )}
        >
          {headers.map((header) => (
            <div
              key={header}
              role="columnheader"
              className="text-mira-small font-bold text-mira-text-meta"
            >
              {header}
            </div>
          ))}
        </div>

        {rows.map((row) => (
          <div
            key={row.name}
            role="row"
            className={cn(
              columns,
              "bg-mira-background-card px-6 py-5 shadow-mira-divider last:shadow-none"
            )}
          >
            <div role="cell" className="flex items-center p-1.5">
              {row.sample}
            </div>
            <div
              role="cell"
              className="flex min-w-0 flex-col gap-1 text-mira-normal text-pretty"
            >
              <p className="font-bold text-mira-text-heading">{row.name}</p>
              <p className="font-normal text-mira-text-body">{row.use}</p>
            </div>
            <div
              role="cell"
              className="flex min-w-0 flex-col gap-1 text-mira-small font-normal whitespace-pre-wrap text-mira-text-body"
            >
              {row.variables.map((variable) => (
                <p key={variable}>{variable}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DocBoard>
  )
}
