import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Shared table pieces for the /fyi/design boards. The tables stack into
 * labelled cards below their breakpoint and become a grid above it.
 */

export function DocGrid({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: ReactNode
}) {
  return (
    <div
      role="table"
      aria-label={label}
      className={cn(
        "w-full overflow-clip rounded-mira-table bg-mira-background-card shadow-[inset_0_0_0_1px_var(--mira-border-divider)]",
        className
      )}
    >
      {children}
    </div>
  )
}

export function DocHeaderRow({
  columns,
  headers,
  showAt = "lg:grid",
}: {
  columns: string
  headers: readonly string[]
  showAt?: string
}) {
  return (
    <div
      role="row"
      className={cn(
        columns,
        "hidden bg-mira-background-section px-6 py-3 shadow-mira-divider",
        showAt
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
  )
}

/** Column label repeated inside each cell when the table stacks. */
export function CellLabel({
  children,
  hideAt = "lg:hidden",
}: {
  children: ReactNode
  hideAt?: string
}) {
  return (
    <span
      className={cn(
        "text-mira-extra-small font-bold tracking-wide text-mira-text-meta uppercase",
        hideAt
      )}
    >
      {children}
    </span>
  )
}

/**
 * Semantic `fyi/…` name with its CSS custom-property form underneath and,
 * when the token is live, the Tailwind class(es) that apply it.
 */
export function TokenCell({
  token,
  utility,
}: {
  token: string
  utility?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <code className="w-fit rounded-md bg-mira-background-input px-2 py-1 font-mono text-mira-small font-bold text-mira-text-heading">
        {token}
      </code>
      <code className="font-mono text-mira-extra-small text-mira-text-meta">
        --{token.replaceAll("/", "-")}
      </code>
      {utility ? (
        <code className="font-mono text-mira-extra-small text-mira-text-link">
          {utility}
        </code>
      ) : null}
    </div>
  )
}
