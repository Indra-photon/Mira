import Image from "next/image"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

import type { Size, Variant } from "../../_components/fyi-button"
import type { ButtonState } from "./state-matrix"

/**
 * Tactile button — PROPOSAL for /fyi/design only (the live /fyi page still
 * uses FyiButton). Same pill, label and sizes; the surface is built in four
 * layers from the reference recipe, in the Mira main colour:
 *
 *   1. Fill          Button/Primary (#4e50f6 dark)
 *   2. Stroke        1px inside, white 40% → 0% linear, top to bottom
 *   3. Shadows       drop    0 3 6   black 20%
 *                    ring    0 0 0 1 fill colour 100%
 *
 * Every layer reads a --tb-* variable, so states only swap values:
 * hover → hover fill · pressed → scale 0.97 only (colour and shadow stay)
 * · focus → Mira focus ring outside the 1px ring · disabled → flat.
 *
 * Product buttons keep their outline role: a dark Button/Secondary surface
 * ringed in the accent, turning into a tactile
 * accent button on hover.
 */

const base = cn(
  "group relative isolate inline-flex shrink-0 items-center justify-center gap-1 rounded-full",
  "font-mira text-fyi-button font-bold whitespace-nowrap text-mira-text-on-primary-button outline-none select-none",
  // Defaults for the shared layers
  "[--tb-drop-blur:6px] [--tb-drop-y:3px] [--tb-focus:0_0_#0000]",
  // 1 · fill
  "bg-(--tb-fill)",
  // 3 · ring · focus · drop (ring painted first so the focus gap sits outside it)
  "shadow-[0_0_0_1px_var(--tb-ring),var(--tb-focus),0_var(--tb-drop-y)_var(--tb-drop-blur)_rgb(0_0_0/0.2)]",
  // 2 · inside stroke: white 40% → 0, masked to a 1px frame
  "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:p-px",
  "before:bg-linear-to-b before:from-white/40 before:to-white/0",
  "before:[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]",
  // Motion
  "transition-[background-color,box-shadow,scale] duration-150 ease-out motion-reduce:transition-none",
  // Disabled: flat — no stroke, no drop, divider ring
  "disabled:pointer-events-none disabled:text-mira-text-disabled disabled:before:opacity-0",
  "disabled:[--tb-drop-blur:0px] disabled:[--tb-drop-y:0px] disabled:[--tb-fill:var(--mira-button-disabled)] disabled:[--tb-ring:var(--mira-border-divider)]"
)

/** Live interaction: hover / press / keyboard focus. */
const interactive = cn(
  "cursor-pointer hover:[--tb-fill:var(--tb-fill-hover)]",
  "active:scale-[0.97] motion-reduce:active:scale-100",
  "focus-visible:[--tb-focus:0_0_0_3px_var(--mira-border-ring-gap),0_0_0_5px_var(--mira-border-focus-ring)]"
)

/** The same states, frozen for documentation. */
const frozen: Record<Exclude<ButtonState, "default" | "disabled">, string> = {
  hover: "[--tb-fill:var(--tb-fill-hover)]",
  pressed: "scale-[0.97] [--tb-fill:var(--tb-fill-hover)]",
  focus:
    "[--tb-focus:0_0_0_3px_var(--mira-border-ring-gap),0_0_0_5px_var(--mira-border-focus-ring)]",
}

/** Per-variant layer values. */
const variants: Record<Variant, string> = {
  primary: cn(
    "[--tb-fill-hover:var(--mira-button-primary-hover)] [--tb-fill:var(--mira-button-primary)]",
    "[--tb-ring:var(--tb-fill)]"
  ),
  reach: cn(
    "[--tb-fill-hover:var(--fyi-reach)] [--tb-fill:var(--mira-button-secondary)]",
    "[--tb-ring:var(--fyi-reach)]"
  ),
  gtm: cn(
    "[--tb-fill-hover:var(--fyi-gtm)] [--tb-fill:var(--mira-button-secondary)]",
    "[--tb-ring:var(--fyi-gtm)]"
  ),
  intelligence: cn(
    "[--tb-fill-hover:var(--fyi-intelligence)] [--tb-fill:var(--mira-button-secondary)]",
    "[--tb-ring:var(--fyi-intelligence)]"
  ),
}

const sizes: Record<Size, { base: string; withArrow: string }> = {
  md: { base: "h-10 px-5", withArrow: "pr-[17px]" },
  lg: { base: "h-12 px-6", withArrow: "pr-[21px]" },
}

export function TactileButton({
  variant = "primary",
  size = "md",
  arrow = true,
  state = "default",
  className,
  children,
  type = "button",
  disabled,
  ...props
}: ComponentProps<"button"> & {
  variant?: Variant
  size?: Size
  arrow?: boolean
  /** Freeze a state for documentation. "default" is fully interactive. */
  state?: ButtonState
}) {
  const isFrozen = state !== "default" && state !== "disabled"
  return (
    <button
      type={type}
      disabled={state === "disabled" || disabled}
      // Frozen specimens are pictures of a state, not controls.
      inert={isFrozen ? true : undefined}
      className={cn(
        base,
        variants[variant],
        sizes[size].base,
        arrow && sizes[size].withArrow,
        isFrozen ? frozen[state] : interactive,
        className
      )}
      {...props}
    >
      <span className="relative [text-box:trim-both_cap_alphabetic]">
        {children}
      </span>
      {arrow ? (
        <Image
          src="/fyi/arrow-right-20.svg"
          alt=""
          width={20}
          height={20}
          className="relative size-5 shrink-0 group-disabled:opacity-40"
        />
      ) : null}
    </button>
  )
}
