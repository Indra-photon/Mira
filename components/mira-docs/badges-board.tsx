import Image from "next/image"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { DocBoard } from "./doc-board"

/**
 * Badges board (Figma: UI Elements › Badges, node 94:92).
 * Left: documentation table (118:264). Right: source components (112:182).
 */

export type MiraBadgeTone =
  | "featured"
  | "members-only"
  | "popular"
  | "topic"
  | "error"
  | "warning"
  | "live"
  | "success"
  | "info"
  | "side-event"

export type MiraBadgeSize = "md" | "sm"

/** Visual state of the side-event link — only forced on the documentation specimens. */
export type MiraBadgeState = "default" | "hover" | "focus" | "pressed"

const toneClasses: Record<Exclude<MiraBadgeTone, "side-event">, string> = {
  featured: "bg-mira-badge-featured-background text-mira-badge-featured-text",
  "members-only":
    "bg-mira-badge-members-only-background text-mira-badge-members-only-text",
  popular: "bg-mira-badge-popular-background text-mira-badge-popular-text",
  topic:
    "bg-mira-background-card text-mira-badge-topic-text shadow-[inset_0_0_0_1px_var(--mira-badge-topic-border)]",
  error: "bg-mira-badge-error-background text-mira-badge-error-text",
  warning: "bg-mira-badge-warning-background text-mira-badge-warning-text",
  live: "bg-mira-badge-live-background text-mira-badge-live-text",
  success: "bg-mira-badge-success-background text-mira-badge-success-text",
  info: "bg-mira-badge-info-background text-mira-badge-info-text",
}

/** Medium 24px · Text Small SemiBold 14 — Small 20px · Text Extra small SemiBold 12. */
const sizeClasses: Record<MiraBadgeSize, string> = {
  md: "h-6 rounded-[6px] text-mira-small",
  sm: "h-5 rounded-[4px] text-mira-extra-small",
}

const paddingClasses: Record<MiraBadgeSize, string> = {
  md: "pl-2.5 pr-2.5",
  sm: "pl-2 pr-2",
}

/** Badges with a leading glyph sit 1px closer to the left edge. */
const leadingClasses: Record<MiraBadgeSize, { popular: string; live: string }> =
  {
    md: { popular: "gap-1 pl-[9px] pr-2.5", live: "gap-[5px] pl-[9px] pr-2.5" },
    sm: { popular: "gap-[3px] pl-[7px] pr-2", live: "gap-1 pl-[7px] pr-2" },
  }

const sideEventSizeClasses: Record<MiraBadgeSize, string> = {
  md: "gap-1 pl-2.5 pr-[9px]",
  sm: "gap-[3px] pl-2 pr-[7px]",
}

/** The label is set to Multiply over the solid badge background. */
const labelClasses =
  "font-semibold whitespace-nowrap mix-blend-multiply [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]"

const icons = {
  flame: {
    md: { src: "/mira/badges/flame-md.svg", width: 10, height: 12 },
    sm: { src: "/mira/badges/flame-sm.svg", width: 8, height: 10 },
  },
  chevron: {
    md: { src: "/mira/badges/chevron-right-md.svg", width: 6, height: 10 },
    sm: { src: "/mira/badges/chevron-right-sm.svg", width: 5, height: 8 },
  },
  liveDot: { src: "/mira/badges/live-dot.svg", width: 6, height: 6 },
} as const

function BadgeGlyph({
  icon,
  className,
}: {
  icon: { src: string; width: number; height: number }
  className?: string
}) {
  return (
    <Image
      src={icon.src}
      alt=""
      aria-hidden
      width={icon.width}
      height={icon.height}
      unoptimized
      className={cn("block max-w-none shrink-0", className)}
    />
  )
}

export function MiraBadge({
  tone,
  size = "md",
  children,
  href = "#",
  state,
  className,
}: {
  tone: MiraBadgeTone
  size?: MiraBadgeSize
  children: ReactNode
  /** Side-event only: the series page the badge links to. */
  href?: string
  /**
   * Side-event only: forces a visual state for documentation specimens. When
   * set, the badge renders as a static, non-interactive specimen.
   */
  state?: MiraBadgeState
  className?: string
}) {
  if (tone === "side-event") {
    const underlined = state === "hover" || state === "pressed"
    const base = cn(
      "relative inline-flex shrink-0 items-center justify-center",
      sizeClasses[size],
      sideEventSizeClasses[size],
      "text-mira-badge-side-event-text",
      state === "pressed"
        ? "bg-mira-badge-side-event-background-hover"
        : "bg-mira-badge-side-event-background",
      state === "focus" && "shadow-mira-focus-ring",
      className
    )
    const content = (
      <>
        <span
          className={cn(
            labelClasses,
            "decoration-from-font [text-underline-position:from-font]",
            underlined && "underline",
            !state && "group-hover:underline group-active:underline"
          )}
        >
          {children}
        </span>
        <BadgeGlyph icon={icons.chevron[size]} />
      </>
    )

    if (state) {
      return (
        <span aria-hidden className={base}>
          {content}
        </span>
      )
    }

    return (
      <a
        href={href}
        className={cn(
          base,
          "group outline-none",
          // Touch hit area 44px.
          "after:absolute after:inset-x-0 after:top-1/2 after:h-11 after:-translate-y-1/2 after:content-['']",
          "focus-visible:shadow-mira-focus-ring",
          "active:bg-mira-badge-side-event-background-hover",
          // Pressed: scale 0.96 over 150ms ease-out, never under reduced motion.
          "motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:active:scale-96"
        )}
      >
        {content}
      </a>
    )
  }

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        sizeClasses[size],
        toneClasses[tone],
        tone === "popular"
          ? leadingClasses[size].popular
          : tone === "live"
            ? leadingClasses[size].live
            : paddingClasses[size],
        className
      )}
    >
      {tone === "popular" && <BadgeGlyph icon={icons.flame[size]} />}
      {/* Only Live has a dot, and it pulses. */}
      {tone === "live" && (
        <BadgeGlyph
          icon={icons.liveDot}
          className="motion-safe:animate-pulse"
        />
      )}
      <span className={labelClasses}>{children}</span>
    </span>
  )
}

const rows: {
  tone: MiraBadgeTone
  label: string
  name: string
  use: string
  variables: string[]
}[] = [
  {
    tone: "featured",
    label: "Featured",
    name: "Featured",
    use: "Events picked by Mira: Featured, New, Recommended. Always goes first.",
    variables: ["Badge/Featured/Background", "Badge/Featured/Text"],
  },
  {
    tone: "members-only",
    label: "CNC Member tix",
    name: "Members only",
    use: "Membership perks: CNC Member tix, Members only, Perks.",
    variables: ["Badge/Members only/Background", "Badge/Members only/Text"],
  },
  {
    tone: "popular",
    label: "Trending",
    name: "Popular",
    use: "Popularity hints: Trending, Most popular. Never for warnings.",
    variables: [
      "Badge/Popular/Background",
      "Badge/Popular/Text",
      "Badge/Popular/Icon",
    ],
  },
  {
    tone: "topic",
    label: "Dev Rel",
    name: "Topic",
    use: "Topic tags on detail pages: Dev Rel, AI, TradFi.",
    variables: ["Badge/Topic/Text", "Badge/Topic/Border · inset 0 0 0 1px"],
  },
  {
    tone: "error",
    label: "Sold out",
    name: "Error",
    use: "Blocked: Sold out, Payment failed.",
    variables: ["Badge/Error/Background", "Badge/Error/Text"],
  },
  {
    tone: "warning",
    label: "Few spots left",
    name: "Warning",
    use: "Act soon: Few spots left, Closes today.",
    variables: ["Badge/Warning/Background", "Badge/Warning/Text"],
  },
  {
    tone: "live",
    label: "Happening now",
    name: "Live",
    use: "Happening right now. The only badge with a dot.",
    variables: ["Badge/Live/Background", "Badge/Live/Text", "Badge/Live/Dot"],
  },
  {
    tone: "success",
    label: "You’re going",
    name: "Success",
    use: "Confirmed for this person: You’re going, Saved, Paid.",
    variables: ["Badge/Success/Background", "Badge/Success/Text"],
  },
  {
    tone: "info",
    label: "Online event",
    name: "Info",
    use: "Neutral facts: Online event, Hybrid.",
    variables: ["Badge/Info/Background", "Badge/Info/Text"],
  },
  {
    tone: "side-event",
    label: "SF Tech Week",
    name: "Side event link",
    use: "Event series. Opens the series page — the only badge you can click.",
    variables: [
      "Badge/Side event/Background",
      "Badge/Side event/Background hover",
      "Badge/Side event/Text",
      "Badge/Side event/Icon",
    ],
  },
]

/** Badge · Where to use · Variables — 400 / 620 / 440 at 1636px. */
const tableColumns =
  "grid grid-cols-1 gap-4 md:grid-cols-[400fr_620fr_440fr] md:items-center"

function BadgesTable() {
  return (
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
        {[
          "Badge · Medium · Small",
          "Where to use · Medium on cards and mobile, Small in tables",
          "Variables",
        ].map((header) => (
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
            tableColumns,
            "bg-mira-background-card px-6 py-[18px] shadow-mira-divider last:shadow-none"
          )}
        >
          <div role="cell" className="flex flex-wrap items-center gap-4">
            <MiraBadge tone={row.tone} size="md">
              {row.label}
            </MiraBadge>
            <MiraBadge tone={row.tone} size="sm">
              {row.label}
            </MiraBadge>
          </div>
          <div
            role="cell"
            className="flex flex-col gap-1 text-mira-normal text-pretty"
          >
            <p className="font-bold text-mira-text-heading">{row.name}</p>
            <p className="font-normal text-mira-text-body">{row.use}</p>
          </div>
          <div
            role="cell"
            className="flex flex-col gap-1 text-mira-small font-normal text-mira-text-body"
          >
            {row.variables.map((variable) => (
              <p key={variable}>{variable}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const componentTones: Exclude<MiraBadgeTone, "side-event">[] = [
  "featured",
  "members-only",
  "popular",
  "topic",
  "live",
  "success",
  "warning",
  "error",
  "info",
]

const sideEventStates: MiraBadgeState[] = [
  "default",
  "hover",
  "focus",
  "pressed",
]

/** Component-set frame: two columns (Medium · Small), 24px inset, 20px rows. */
const componentGrid =
  "grid w-full grid-cols-[repeat(2,minmax(0,200px))] items-start justify-items-start gap-5 px-6 pt-6 pb-5"

function BadgeComponents({ className }: { className?: string }) {
  return (
    <section
      aria-label="Badge components"
      className={cn(
        "flex w-full flex-col items-start gap-6 rounded-mira-panel bg-mira-background-card p-6 shadow-mira-card md:p-12",
        className
      )}
    >
      <p className="text-mira-small font-normal text-mira-text-meta">
        Source components — edit these, the table shows instances.
      </p>
      <div className={componentGrid}>
        {componentTones.flatMap((tone) =>
          (["md", "sm"] as const).map((size) => (
            <MiraBadge key={`${tone}-${size}`} tone={tone} size={size}>
              Label
            </MiraBadge>
          ))
        )}
      </div>
      <div className={componentGrid}>
        {sideEventStates.flatMap((state) =>
          (["md", "sm"] as const).map((size) => (
            <MiraBadge
              key={`${state}-${size}`}
              tone="side-event"
              size={size}
              state={state === "default" ? undefined : state}
            >
              SF Tech Week
            </MiraBadge>
          ))
        )}
      </div>
    </section>
  )
}

export function BadgesBoard() {
  return (
    <div className="flex w-full flex-col items-start gap-8 2xl:flex-row 2xl:gap-20">
      <DocBoard id="badges" title="Badges" className="min-w-0 2xl:flex-1">
        <BadgesTable />
      </DocBoard>
      <BadgeComponents className="2xl:w-[564px] 2xl:shrink-0" />
    </div>
  )
}
