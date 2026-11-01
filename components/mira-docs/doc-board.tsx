import Image from "next/image"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Shared building blocks for the Mira "UI Elements" documentation boards
 * (Figma: New Mira file › UI Elements). Every board is a white panel with the
 * mira-border/Card edge, a Heading 1 title and a three-column table:
 * Style · Where to use · Variables (520 / 640 / 520 at 1760px).
 */

export function DocBoard({
  id,
  title,
  children,
  className,
}: {
  id: string
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      aria-labelledby={id}
      className={cn(
        "flex w-full flex-col items-start gap-8 rounded-mira-panel bg-mira-background-card p-6 shadow-mira-card md:p-12",
        className
      )}
    >
      <h2 id={id} className="text-mira-heading-1 text-mira-text-heading">
        {title}
      </h2>
      {children}
    </section>
  )
}

const tableColumns =
  "grid grid-cols-1 gap-4 md:grid-cols-[520fr_640fr_520fr] md:items-center"

export function DocTable({
  headers,
  children,
  className,
}: {
  headers: [string, string, string]
  children: ReactNode
  className?: string
}) {
  return (
    <div
      role="table"
      className={cn(
        "w-full overflow-clip rounded-mira-table bg-mira-background-card shadow-[inset_0_0_0_1px_var(--mira-border-divider)]",
        className
      )}
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
      {children}
    </div>
  )
}

export function DocRow({
  sample,
  use,
  variables,
  className,
}: {
  /** The specimen / example column. */
  sample: ReactNode
  /** "Where to use" copy. */
  use: ReactNode
  /** One line per variable, e.g. "Heading 1/Line height   110%". */
  variables: ReactNode[]
  className?: string
}) {
  return (
    <div
      role="row"
      className={cn(
        tableColumns,
        "bg-mira-background-card px-6 py-5 shadow-mira-divider last:shadow-none",
        className
      )}
    >
      <div role="cell" className="flex min-w-0 flex-col items-start gap-3">
        {sample}
      </div>
      <div
        role="cell"
        className="text-mira-normal font-normal text-pretty text-mira-text-body"
      >
        {use}
      </div>
      <div
        role="cell"
        className="flex flex-col gap-1 text-mira-small font-normal whitespace-pre-wrap text-mira-text-body"
      >
        {variables.map((variable, index) => (
          <p key={index}>{variable}</p>
        ))}
      </div>
    </div>
  )
}

/**
 * Renders a Figma-exported icon SVG at its exact position inside its icon
 * frame. `inset` positions the vector group inside the frame and `bleed`
 * expands it for the stroke — both copied from the Figma layout.
 */
export function FigmaIcon({
  src,
  size,
  inset,
  bleed,
  label,
}: {
  src: string
  size: 16 | 20 | 24
  inset: string
  bleed: string
  label?: string
}) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className="relative block shrink-0 overflow-clip"
      style={{ width: size, height: size }}
    >
      <span className="absolute" style={{ inset }}>
        <span className="absolute" style={{ inset: bleed }}>
          <Image src={src} alt="" fill unoptimized className="max-w-none" />
        </span>
      </span>
    </span>
  )
}
