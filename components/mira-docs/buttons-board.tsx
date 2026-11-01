import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

import { DocBoard } from "./doc-board"

/**
 * Buttons board (Figma: UI Elements › Buttons, node 51:6 / panel 121:231).
 * Table columns are Button · Where to use · Variables (640 / 560 / 420 at
 * 1700px), so the rows are composed here rather than through DocTable/DocRow.
 */

export type MiraButtonVariant = "primary" | "secondary" | "ghost"
export type MiraButtonSize = "lg" | "md" | "sm"
/** Visual state — anything other than "default" freezes the specimen. */
export type MiraButtonState =
  "default" | "hover" | "focus" | "pressed" | "disabled"

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

/*
 * Arrow glyphs copied from the Figma exports in /public/mira/buttons/
 * (Icon / Arrow right / 20·16, Icon / Arrow up / 24·20·16). They are inlined
 * so the stroke follows the label colour via currentColor.
 */
const arrowRight = {
  20: { d: "M4 10H16M11 15L16 10L11 5", strokeWidth: 1.75 },
  16: { d: "M3 8H13M9 12L13 8L9 4", strokeWidth: 1.5 },
} as const

const arrowUp = {
  24: { d: "M12 19V5M18 11L12 5L6 11", strokeWidth: 2 },
  20: { d: "M10 16V4M15 9L10 4L5 9", strokeWidth: 1.75 },
  16: { d: "M8 13V3M12 7L8 3L4 7", strokeWidth: 1.5 },
} as const

function ArrowGlyph({
  size,
  d,
  strokeWidth,
}: {
  size: 16 | 20 | 24
  d: string
  strokeWidth: number
}) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className="block shrink-0"
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowRightIcon({ size }: { size: 16 | 20 }) {
  return <ArrowGlyph size={size} {...arrowRight[size]} />
}

export function ArrowUpIcon({ size }: { size: 16 | 20 | 24 }) {
  return <ArrowGlyph size={size} {...arrowUp[size]} />
}

/* -------------------------------------------------------------------------- */
/* MiraButton                                                                 */
/* -------------------------------------------------------------------------- */

/** Large 48 · Medium 40 · Small 32, label Text Normal/Small Bold. */
const sizeClasses: Record<MiraButtonSize, { label: string; icon: string }> = {
  lg: { label: "h-12 gap-1 pr-[21px] pl-6 text-mira-normal", icon: "size-12" },
  md: { label: "h-10 gap-1 pr-[17px] pl-5 text-mira-normal", icon: "size-10" },
  sm: { label: "h-8 gap-1 pr-3.5 pl-4 text-mira-small", icon: "size-8" },
}

const trailingIconSize: Record<MiraButtonSize, 16 | 20> = {
  lg: 20,
  md: 20,
  sm: 16,
}

const iconOnlySize: Record<MiraButtonSize, 16 | 20 | 24> = {
  lg: 24,
  md: 20,
  sm: 16,
}

/**
 * Interactive styles for state="default": real :hover (pointer devices only —
 * Tailwind v4 wraps hover in `@media (hover: hover)`), :focus-visible
 * (mira-border/Focus ring) and :active (pressed fill, scales to 0.96).
 */
const interactiveClasses: Record<MiraButtonVariant, string> = {
  primary:
    "bg-mira-button-primary text-mira-text-on-primary-button hover:bg-mira-button-primary-hover active:bg-mira-button-primary-pressed",
  secondary:
    "bg-mira-button-secondary text-mira-text-body shadow-mira-button hover:bg-mira-button-secondary-hover hover:shadow-mira-button-hover active:bg-mira-button-secondary-pressed active:shadow-mira-button",
  ghost:
    "text-mira-text-link hover:bg-mira-background-hover active:bg-mira-button-ghost-pressed",
}

/** Frozen specimens, one per documented state. */
const stateClasses: Record<
  Exclude<MiraButtonState, "default">,
  Record<MiraButtonVariant, string>
> = {
  hover: {
    primary: "bg-mira-button-primary-hover text-mira-text-on-primary-button",
    secondary:
      "bg-mira-button-secondary-hover text-mira-text-body shadow-mira-button-hover",
    ghost: "bg-mira-background-hover text-mira-text-link",
  },
  focus: {
    primary:
      "bg-mira-button-primary text-mira-text-on-primary-button shadow-mira-focus-ring",
    secondary:
      "bg-mira-button-secondary text-mira-text-body shadow-mira-focus-ring",
    ghost: "bg-mira-background-page text-mira-text-link shadow-mira-focus-ring",
  },
  pressed: {
    primary: "bg-mira-button-primary-pressed text-mira-text-on-primary-button",
    secondary:
      "bg-mira-button-secondary-pressed text-mira-text-body shadow-mira-button",
    ghost: "bg-mira-button-ghost-pressed text-mira-text-link",
  },
  disabled: {
    primary: "bg-mira-button-disabled text-mira-text-disabled",
    secondary:
      "bg-mira-button-disabled text-mira-text-disabled shadow-mira-button",
    ghost: "text-mira-text-disabled",
  },
}

export function MiraButton({
  variant = "primary",
  size = "md",
  iconOnly = false,
  state = "default",
  children = "Button",
  icon,
  disabled,
  className,
  "aria-label": ariaLabel,
  ...props
}: Omit<ComponentProps<"button">, "children"> & {
  variant?: MiraButtonVariant
  size?: MiraButtonSize
  /** Circular icon-only button (48 / 40 / 32). Needs an accessible label. */
  iconOnly?: boolean
  /** Freeze a visual state for documentation. "default" is fully interactive. */
  state?: MiraButtonState
  /** Label text (or, for icon-only buttons, the accessible name). */
  children?: ReactNode
  /** Replaces the default trailing arrow / icon-only arrow-up glyph. */
  icon?: ReactNode
}) {
  const resolvedState: MiraButtonState = disabled ? "disabled" : state
  const frozen = resolvedState !== "default"
  const isDisabled = resolvedState === "disabled"

  return (
    <button
      type="button"
      disabled={isDisabled}
      // Frozen specimens (hover / focus / pressed) are pictures of a state,
      // not controls: keep them out of the tab order and pointer events.
      inert={frozen && !isDisabled ? true : undefined}
      aria-label={
        iconOnly
          ? (ariaLabel ?? (typeof children === "string" ? children : undefined))
          : ariaLabel
      }
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-clip rounded-full font-bold whitespace-nowrap outline-none select-none",
        iconOnly ? sizeClasses[size].icon : sizeClasses[size].label,
        frozen
          ? stateClasses[resolvedState as Exclude<MiraButtonState, "default">][
              variant
            ]
          : cn(
              interactiveClasses[variant],
              "cursor-pointer transition-[background-color,box-shadow,scale] duration-150 ease-out focus-visible:shadow-mira-focus-ring active:scale-[0.96] motion-reduce:transition-none"
            ),
        isDisabled && "cursor-not-allowed",
        className
      )}
      {...props}
    >
      {iconOnly ? (
        (icon ?? <ArrowUpIcon size={iconOnlySize[size]} />)
      ) : (
        <>
          <span className="[text-box:trim-both_cap_alphabetic]">
            {children}
          </span>
          {icon ?? <ArrowRightIcon size={trailingIconSize[size]} />}
        </>
      )}
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/* Board                                                                      */
/* -------------------------------------------------------------------------- */

const tableColumns =
  "grid grid-cols-1 gap-4 md:grid-cols-[640fr_560fr_420fr] md:items-center"

type ButtonRow = {
  variant: MiraButtonVariant
  state: MiraButtonState
  title: string
  use: string
  variables: string[]
}

const rows: ButtonRow[] = [
  {
    variant: "primary",
    state: "default",
    title: "Primary · Default",
    use: "The one main action on a screen: Get tickets, Submit, Log in.",
    variables: ["Fill  Button/Primary", "Label  Text/On primary button"],
  },
  {
    variant: "primary",
    state: "hover",
    title: "Primary · Hover",
    use: "Pointer over it — pointer devices only.",
    variables: ["Fill  Button/Primary hover", "Label  Text/On primary button"],
  },
  {
    variant: "primary",
    state: "focus",
    title: "Primary · Focus",
    use: "Keyboard focus: 2px white gap + 2px indigo ring.",
    variables: [
      "Fill  Button/Primary",
      "Label  Text/On primary button",
      "Edge  mira-border/Focus ring",
    ],
  },
  {
    variant: "primary",
    state: "pressed",
    title: "Primary · Pressed",
    use: "While pressed; scales to 0.96.",
    variables: [
      "Fill  Button/Primary pressed",
      "Label  Text/On primary button",
    ],
  },
  {
    variant: "primary",
    state: "disabled",
    title: "Primary · Disabled",
    use: "Not available yet — no hover, no press.",
    variables: ["Fill  Button/Disabled", "Label  Text/Disabled"],
  },
  {
    variant: "secondary",
    state: "default",
    title: "Secondary · Default",
    use: "Secondary and repeated actions: Interested, Promote, Cancel, per-row Apply.",
    variables: [
      "Fill  Button/Secondary",
      "Label  Text/Body",
      "Edge  mira-border/Button",
    ],
  },
  {
    variant: "secondary",
    state: "hover",
    title: "Secondary · Hover",
    use: "Pointer over it — pointer devices only.",
    variables: [
      "Fill  Button/Secondary hover",
      "Label  Text/Body",
      "Edge  mira-border/Button hover",
    ],
  },
  {
    variant: "secondary",
    state: "focus",
    title: "Secondary · Focus",
    use: "Keyboard focus: 2px white gap + 2px indigo ring.",
    variables: [
      "Fill  Button/Secondary",
      "Label  Text/Body",
      "Edge  mira-border/Focus ring",
    ],
  },
  {
    variant: "secondary",
    state: "pressed",
    title: "Secondary · Pressed",
    use: "While pressed; scales to 0.96.",
    variables: [
      "Fill  Button/Secondary pressed",
      "Label  Text/Body",
      "Edge  mira-border/Button",
    ],
  },
  {
    variant: "secondary",
    state: "disabled",
    title: "Secondary · Disabled",
    use: "Not available yet — no hover, no press.",
    variables: [
      "Fill  Button/Disabled",
      "Label  Text/Disabled",
      "Edge  mira-border/Button",
    ],
  },
  {
    variant: "ghost",
    state: "default",
    title: "Ghost · Default",
    use: "Low-emphasis actions: See all, Add to calendar, Notifications.",
    variables: ["Fill  No fill", "Label  Text/Link"],
  },
  {
    variant: "ghost",
    state: "hover",
    title: "Ghost · Hover",
    use: "Pointer over it — pointer devices only.",
    variables: ["Fill  Background/Hover", "Label  Text/Link"],
  },
  {
    variant: "ghost",
    state: "focus",
    title: "Ghost · Focus",
    use: "Keyboard focus: 2px white gap + 2px indigo ring.",
    variables: [
      "Fill  Background/Page",
      "Label  Text/Link",
      "Edge  mira-border/Focus ring",
    ],
  },
  {
    variant: "ghost",
    state: "pressed",
    title: "Ghost · Pressed",
    use: "While pressed; scales to 0.96.",
    variables: ["Fill  Button/Ghost pressed", "Label  Text/Link"],
  },
  {
    variant: "ghost",
    state: "disabled",
    title: "Ghost · Disabled",
    use: "Not available yet — no hover, no press.",
    variables: ["Fill  No fill", "Label  Text/Disabled"],
  },
]

const headers = [
  "Button · Large · Medium · Small · icon only",
  "Where to use · Large: hero · Medium: default · Small: rows and cards · Icons follow the Icons rule (24 / 20 / 16px at 2 / 1.75 / 1.5px stroke)",
  "Variables",
] as const

const sampleSizes: MiraButtonSize[] = ["lg", "md", "sm"]

function ButtonSamples({
  variant,
  state,
}: {
  variant: MiraButtonVariant
  state: MiraButtonState
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {sampleSizes.map((size) => (
        <MiraButton
          key={`label-${size}`}
          variant={variant}
          size={size}
          state={state}
        />
      ))}
      {sampleSizes.map((size) => (
        <MiraButton
          key={`icon-${size}`}
          variant={variant}
          size={size}
          state={state}
          iconOnly
          aria-label="Button"
        />
      ))}
    </div>
  )
}

export function ButtonsBoard() {
  return (
    <DocBoard id="buttons" title="Buttons">
      <div
        role="table"
        className="w-full overflow-clip rounded-mira-table bg-mira-background-card shadow-[inset_0_0_0_1px_var(--mira-border-divider)]"
      >
        <div
          role="row"
          className={cn(
            tableColumns,
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

        {rows.map((row) => {
          const isDefault = row.state === "default"
          return (
            <div
              key={row.title}
              role="row"
              className={cn(
                tableColumns,
                "bg-mira-background-card px-6 py-[18px] shadow-mira-divider last:shadow-none"
              )}
            >
              <div role="cell" className="min-w-0">
                <ButtonSamples variant={row.variant} state={row.state} />
              </div>
              <div
                role="cell"
                className="flex flex-col gap-1 text-mira-normal text-pretty"
              >
                <p
                  className={cn(
                    "font-bold",
                    isDefault ? "text-mira-text-heading" : "text-mira-text-body"
                  )}
                >
                  {row.title}
                </p>
                <p
                  className={cn(
                    "font-normal",
                    isDefault ? "text-mira-text-body" : "text-mira-text-meta"
                  )}
                >
                  {row.use}
                </p>
              </div>
              <div
                role="cell"
                className="flex flex-col gap-1 text-mira-small font-normal whitespace-pre-wrap text-mira-text-body"
              >
                {row.variables.map((variable) => (
                  <p key={variable}>{variable}</p>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </DocBoard>
  )
}
