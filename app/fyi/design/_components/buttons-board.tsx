import { DocBoard } from "@/components/mira-docs/doc-board"
import { cn } from "@/lib/utils"

import {
  FyiButton,
  type Size,
  type Variant,
} from "../../_components/fyi-button"
import {
  ButtonStateMatrix,
  type ButtonState,
  type MatrixRow,
} from "./state-matrix"

/**
 * fyi · Buttons — every button the /fyi page ships today, one row per button
 * and one column per state.
 */

/** Classes that freeze a state on top of the real button classes. */
const FROZEN: Record<
  Exclude<ButtonState, "default" | "disabled">,
  Record<Variant, string>
> = {
  hover: {
    primary: "bg-mira-button-primary-hover",
    reach: "bg-fyi-reach",
    gtm: "bg-fyi-gtm",
    intelligence: "bg-fyi-intelligence",
  },
  pressed: {
    primary: "bg-mira-button-primary-pressed scale-[0.96]",
    reach: "bg-fyi-reach scale-[0.96]",
    gtm: "bg-fyi-gtm scale-[0.96]",
    intelligence: "bg-fyi-intelligence scale-[0.96]",
  },
  focus: {
    primary: "shadow-mira-focus-ring",
    reach: "shadow-mira-focus-ring",
    gtm: "shadow-mira-focus-ring",
    intelligence: "shadow-mira-focus-ring",
  },
}

const PRIMARY_STATES: Record<ButtonState, string[]> = {
  default: ["Fill  Button/Primary", "Label  Text/On primary button"],
  hover: ["Fill  Button/Primary hover"],
  pressed: ["Fill  Button/Primary pressed"],
  focus: ["Fill  Button/Primary", "Edge  Focus ring · 2px gap + 2px"],
  disabled: ["Fill  Button/Disabled", "Label  Text/Disabled"],
}

function outlineStates(accent: string): Record<ButtonState, string[]> {
  return {
    default: [
      `Edge  1px ${accent}`,
      "Fill  none",
      "Label  Text/On primary button",
    ],
    hover: [`Fill  ${accent}`],
    pressed: [`Fill  ${accent}`],
    focus: [`Edge  1px ${accent}`, "+ Focus ring · 2px gap + 2px"],
    disabled: ["Edge  1px Text/Disabled", "Label  Text/Disabled"],
  }
}

type Row = MatrixRow & {
  variant: Variant
  size: Size
  arrow: boolean
  label: string
}

export const FYI_BUTTON_ROWS: Omit<Row, "states" | "token">[] = [
  {
    name: "Primary · Large",
    variant: "primary",
    size: "lg",
    arrow: true,
    label: "Send",
    use: "The one committing action — Send on the contact form. Full width on phones.",
    spec: "48px · padding 24 / 21 · arrow 20px",
  },
  {
    name: "Primary · Nav",
    variant: "primary",
    size: "md",
    arrow: false,
    label: "Talk to us",
    use: "The nav call to action — jumps to the contact form. No arrow. 36px and 14px on phones.",
    spec: "40px · padding 20 · no icon",
  },
  {
    name: "Outline Reach · Large",
    variant: "reach",
    size: "lg",
    arrow: true,
    label: "Media Kit",
    use: "The action in the lead Mira Reach card. 40px on phones.",
    spec: "48px · padding 24 / 21 · arrow 20px",
  },
  {
    name: "Outline GTM · Medium",
    variant: "gtm",
    size: "md",
    arrow: true,
    label: "Talk to us",
    use: "The action in the Mira GTM card.",
    spec: "40px · padding 20 / 17 · arrow 20px",
  },
  {
    name: "Outline Intelligence · Medium",
    variant: "intelligence",
    size: "md",
    arrow: true,
    label: "Request a briefing",
    use: "The action in the Mira Intelligence card.",
    spec: "40px · padding 20 / 17 · arrow 20px",
  },
]

const TOKENS: Record<string, string> = {
  "Primary · Large": "fyi/button/primary",
  "Primary · Nav": "fyi/button/primary-nav",
  "Outline Reach · Large": "fyi/button/reach",
  "Outline GTM · Medium": "fyi/button/gtm",
  "Outline Intelligence · Medium": "fyi/button/intelligence",
}

const ACCENT: Record<Variant, string> = {
  primary: "",
  reach: "fyi/reach",
  gtm: "fyi/gtm",
  intelligence: "fyi/intelligence",
}

const rows: Row[] = FYI_BUTTON_ROWS.map((row) => ({
  ...row,
  token: TOKENS[row.name],
  states:
    row.variant === "primary"
      ? PRIMARY_STATES
      : outlineStates(ACCENT[row.variant]),
}))

function Specimen({ row, state }: { row: Row; state: ButtonState }) {
  const frozen = state !== "default" && state !== "disabled"
  return (
    <FyiButton
      variant={row.variant}
      size={row.size}
      arrow={row.arrow}
      disabled={state === "disabled"}
      // Frozen specimens are pictures of a state, not controls.
      inert={frozen ? true : undefined}
      className={cn(frozen && FROZEN[state][row.variant])}
    >
      {row.label}
    </FyiButton>
  )
}

export function FyiButtonsBoard() {
  return (
    <DocBoard id="fyi-buttons" title="Buttons">
      <p className="-mt-4 max-w-[860px] text-mira-normal text-mira-text-meta">
        Live on /fyi. Pill buttons, label Montserrat Bold 16px trimmed to cap
        height. One filled primary; product actions are 1px outlines in the
        product accent that fill with it on hover. All press to 0.96.
      </p>
      <ButtonStateMatrix
        label="fyi button states"
        rows={rows}
        stateTitles={{ pressed: "Pressed · scale 0.96" }}
        renderSpecimen={(row, state) => <Specimen row={row} state={state} />}
      />
    </DocBoard>
  )
}
