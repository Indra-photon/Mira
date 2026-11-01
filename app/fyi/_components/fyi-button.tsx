import Image from "next/image"
import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * fyi.miragather buttons (Figma: fyiPage-v1). Pill-shaped, Montserrat Bold
 * 16px with a cap-height-trimmed label and an optional white trailing arrow.
 *
 * - primary: filled Button/Primary (nav "Talk to us", form "Send")
 * - reach | gtm | intelligence: 1px outline in the product accent, filling
 *   with that accent on hover (Figma: "outline iris/orange/plum (hover: fill)")
 */
type Variant = "primary" | "reach" | "gtm" | "intelligence"
type Size = "md" | "lg"

const variants: Record<Variant, string> = {
  primary:
    "bg-mira-button-primary hover:bg-mira-button-primary-hover active:bg-mira-button-primary-pressed",
  reach: "border border-fyi-reach hover:bg-fyi-reach",
  gtm: "border border-fyi-gtm hover:bg-fyi-gtm",
  intelligence: "border border-fyi-intelligence hover:bg-fyi-intelligence",
}

const sizes: Record<Size, { base: string; withArrow: string }> = {
  md: { base: "h-10 px-5", withArrow: "pr-[17px]" },
  lg: { base: "h-12 px-6", withArrow: "pr-[21px]" },
}

export function fyiButtonClasses({
  variant = "primary",
  size = "md",
  arrow = true,
  className,
}: {
  variant?: Variant
  size?: Size
  arrow?: boolean
  className?: string
}) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-1 rounded-full font-mira text-mira-normal font-bold whitespace-nowrap text-mira-text-on-primary-button outline-none select-none",
    "transition-[background-color,scale] duration-150 ease-out focus-visible:shadow-mira-focus-ring active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100",
    variants[variant],
    sizes[size].base,
    arrow && sizes[size].withArrow,
    className
  )
}

function Label({ children, arrow }: { children: ReactNode; arrow: boolean }) {
  return (
    <>
      <span className="[text-box:trim-both_cap_alphabetic]">{children}</span>
      {arrow ? (
        <Image
          src="/fyi/arrow-right-20.svg"
          alt=""
          width={20}
          height={20}
          className="size-5 shrink-0"
        />
      ) : null}
    </>
  )
}

export function FyiButtonLink({
  href,
  variant,
  size,
  arrow = true,
  className,
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant
  size?: Size
  arrow?: boolean
  className?: string
}) {
  return (
    <Link
      href={href}
      className={fyiButtonClasses({ variant, size, arrow, className })}
      {...props}
    >
      <Label arrow={arrow}>{children}</Label>
    </Link>
  )
}

export function FyiButton({
  variant,
  size,
  arrow = true,
  className,
  children,
  type = "button",
  ...props
}: ComponentProps<"button"> & {
  variant?: Variant
  size?: Size
  arrow?: boolean
}) {
  return (
    <button
      type={type}
      className={fyiButtonClasses({ variant, size, arrow, className })}
      {...props}
    >
      <Label arrow={arrow}>{children}</Label>
    </button>
  )
}
