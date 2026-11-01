import { DocBoard } from "@/components/mira-docs/doc-board"

import type { Variant } from "../../_components/fyi-button"
import { FYI_BUTTON_ROWS } from "./buttons-board"
import {
  ButtonStateMatrix,
  type ButtonState,
  type MatrixRow,
} from "./state-matrix"
import { TactileButton } from "./tactile-button"

/**
 * fyi · Buttons · Tactile — PROPOSED redesign, shown next to the live set.
 * The /fyi page is not changed. Recipe from the reference, in the Mira main
 * colour (Button/Primary).
 */

const RECIPE = [
  { layer: "Label", value: "Text/On primary button · #FFFFFF" },
  { layer: "1 · Fill", value: "Button/Primary · #4E50F6" },
  { layer: "2 · Stroke", value: "1px inside · white linear 40% → 0%" },
  { layer: "1 · Drop shadow", value: "black 20% · y 3 · blur 6" },
  { layer: "2 · Drop shadow", value: "fill 100% · spread 1 (ring)" },
]

const PRIMARY_STATES: Record<ButtonState, string[]> = {
  default: [
    "Fill  Button/Primary",
    "Stroke  1px inside · white 40% → 0",
    "Ring  1px fill · drop 0 3 6 black 20%",
  ],
  hover: ["Fill  Button/Primary hover", "Ring follows the fill"],
  pressed: ["Scale  0.97 only", "Fill and shadow stay as hover"],
  focus: ["+ Focus ring · 2px gap + 2px", "outside the 1px ring"],
  disabled: [
    "Fill  Button/Disabled",
    "Ring  Border/Divider",
    "No stroke or drop",
    "Label  Text/Disabled",
  ],
}

function outlineStates(accent: string): Record<ButtonState, string[]> {
  return {
    default: [
      "Fill  Button/Secondary",
      `Ring  1px ${accent}`,
      "Stroke  white 40% → 0",
    ],
    hover: [`Fill  ${accent}`],
    pressed: ["Scale  0.97 only", "Fill and shadow stay as hover"],
    focus: ["+ Focus ring · 2px gap + 2px", "outside the 1px ring"],
    disabled: [
      "Fill  Button/Disabled",
      "Ring  Border/Divider",
      "Label  Text/Disabled",
    ],
  }
}

const ACCENT: Record<Variant, string> = {
  primary: "",
  reach: "fyi/reach",
  gtm: "fyi/gtm",
  intelligence: "fyi/intelligence",
}

const TOKEN: Record<Variant, string> = {
  primary: "fyi/button/tactile-primary",
  reach: "fyi/button/tactile-reach",
  gtm: "fyi/button/tactile-gtm",
  intelligence: "fyi/button/tactile-intelligence",
}

type Row = MatrixRow & (typeof FYI_BUTTON_ROWS)[number]

const rows: Row[] = FYI_BUTTON_ROWS.map((row) => ({
  ...row,
  name: row.name.replace("Outline", "Tactile"),
  token:
    row.name === "Primary · Nav"
      ? "fyi/button/tactile-primary-nav"
      : TOKEN[row.variant],
  states:
    row.variant === "primary"
      ? PRIMARY_STATES
      : outlineStates(ACCENT[row.variant]),
}))

export function FyiTactileButtonsBoard() {
  return (
    <DocBoard id="fyi-buttons-tactile" title="Buttons · Tactile (proposed)">
      <p className="-mt-4 max-w-[900px] text-mira-normal text-mira-text-meta">
        A redesign proposal — not on /fyi yet. Same pill, label and sizes, with
        a tactile surface in the Mira main colour: a soft inside highlight, a
        1px ring in the fill colour and a short drop shadow. Pressing only
        scales it to 0.97. Product buttons keep their outline role on a dark
        surface and turn into a tactile accent button on hover.
      </p>

      {/* Recipe, around a large live specimen */}
      <div className="flex w-full flex-col items-center gap-10 rounded-mira-table bg-mira-background-section px-6 py-12 shadow-[inset_0_0_0_1px_var(--mira-border-divider)]">
        <TactileButton size="lg" className="h-16 px-10 pr-9 text-[22px]">
          Talk to us
        </TactileButton>
        <dl className="grid w-full max-w-[960px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RECIPE.map((item) => (
            <div
              key={item.layer}
              className="flex flex-col gap-1 rounded-mira-table bg-mira-background-card px-4 py-3 shadow-[inset_0_0_0_1px_var(--mira-border-divider)]"
            >
              <dt className="text-mira-extra-small font-bold text-mira-text-meta">
                {item.layer}
              </dt>
              <dd className="text-mira-small text-mira-text-body">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <ButtonStateMatrix
        label="Tactile button states"
        rows={rows}
        stateTitles={{ pressed: "Pressed · scale 0.97" }}
        renderSpecimen={(row, state) => (
          <TactileButton
            variant={row.variant}
            size={row.size}
            arrow={row.arrow}
            state={state}
          >
            {row.label}
          </TactileButton>
        )}
      />
    </DocBoard>
  )
}
