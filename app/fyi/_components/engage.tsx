import Image from "next/image"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { FyiButtonLink } from "./fyi-button"

// Figma: fyiPage-v1 › 03 · Three ways to engage (Desktop 536:2242 · Tablet
// 536:2545 · Mobile 536:2848). Bento 7 + 5 on desktop, 1 + 2 on tablet,
// stacked on mobile.

/**
 * Card shell: a 1px gradient "border" (the outer pill shows through the
 * padding) in the product accent, glowing at the top-left and bottom-right
 * corners and clear along the middle (stops 0 · 20% · 80% · 100%).
 *
 * `border` sets two custom properties on the card itself:
 * - `--edge`: the accent at the corners. It must read the raw `--fyi-*` var
 *   (defined on `.mira-dark`), not `--color-fyi-*`: that theme alias resolves
 *   on :root, where the raw var doesn't exist, and would void the gradient.
 * - `--angle`: Figma's exact gradient angle for each breakpoint.
 */
function Card({
  border,
  surface,
  className,
  children,
}: {
  border: string
  surface?: string
  className?: string
  children: ReactNode
}) {
  return (
    <article
      className={cn(
        "flex rounded-[28px] bg-[linear-gradient(var(--angle),var(--edge)_0%,transparent_20%,transparent_80%,var(--edge)_100%)] p-px",
        border,
        className
      )}
    >
      <div
        className={cn(
          "relative flex min-w-0 flex-1 flex-col rounded-[27px] bg-mira-background-card md:justify-between",
          surface
        )}
      >
        {children}
      </div>
    </article>
  )
}

/** Big index number pinned to the card's top-right (Montserrat Bold). */
function CardNumber({
  className,
  children,
}: {
  className: string
  children: ReactNode
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute text-[28px] leading-none font-bold whitespace-nowrap md:text-[36px] lg:text-[40px]",
        className
      )}
    >
      {children}
    </span>
  )
}

const emphasis = "font-bold text-mira-text-heading"

const smallTitle =
  "font-fyi-display text-[28px] leading-[1.05] font-semibold tracking-[-0.03em] whitespace-nowrap text-mira-text-heading md:text-[32px] lg:text-[40px]"

const smallBody =
  "text-mira-small font-normal text-mira-text-meta md:text-[15px] lg:text-mira-normal"

export function FyiEngage() {
  return (
    <section
      aria-labelledby="fyi-engage-heading"
      className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-20 md:gap-10 md:px-12 md:py-24 lg:gap-12 lg:px-16 lg:py-[120px]"
    >
      <h2
        id="fyi-engage-heading"
        className="font-fyi-display text-[28px] leading-[1.1] font-medium tracking-[-0.02em] text-mira-text-heading md:text-[36px] lg:text-[48px]"
      >
        Three ways to engage
      </h2>

      <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:min-h-[640px] lg:grid-cols-[755fr_533fr] lg:grid-rows-[1fr_1fr]">
        {/* 01 · Mira Reach */}
        <Card
          className="md:col-span-2 md:min-h-[440px] lg:col-span-1 lg:row-span-2"
          border="[--angle:137.81deg] [--edge:color-mix(in_srgb,var(--fyi-reach)_80%,transparent)] md:[--angle:146.78deg] lg:[--angle:139.71deg]"
          surface="gap-10 p-7 md:gap-8 md:p-10 lg:p-12"
        >
          <div className="flex flex-col gap-8">
            <h3 className="font-fyi-display text-[48px] leading-none font-semibold tracking-[-0.03em] whitespace-nowrap text-mira-text-heading md:text-[72px] lg:text-[96px]">
              Mira <span className="block text-fyi-reach">Reach</span>
            </h3>
            <p className="text-mira-normal font-normal text-mira-text-meta md:text-mira-medium lg:max-w-[560px] lg:text-mira-large">
              Get in front of 100k+ professionals via{" "}
              <strong className={emphasis}>Platform</strong> and{" "}
              <strong className={emphasis}>Publication</strong>.
            </p>
          </div>
          <div className="flex">
            <FyiButtonLink
              href="#"
              variant="reach"
              size="lg"
              className="max-md:h-10 max-md:pr-[17px] max-md:pl-5"
            >
              Media Kit
            </FyiButtonLink>
          </div>
          <CardNumber className="top-7 right-7 text-fyi-reach-number md:top-10 md:right-10 lg:top-12 lg:right-12">
            01
          </CardNumber>
        </Card>

        {/* 02 · Mira GTM */}
        <Card
          className="md:min-h-[392px] lg:min-h-0"
          border="[--angle:142.33deg] [--edge:color-mix(in_srgb,var(--fyi-gtm)_80%,transparent)] md:[--angle:149.74deg] lg:[--angle:149.98deg]"
          surface="gap-8 p-7 md:p-8"
        >
          <div className="flex flex-col gap-4">
            <h3 className={smallTitle}>
              Mira <span className="block text-fyi-gtm">GTM</span>
            </h3>
            <p className={smallBody}>
              A structured fractional GTM service, powered by{" "}
              <strong className={emphasis}>four years of ecosystem data</strong>
              .
            </p>
          </div>
          <div className="flex">
            <FyiButtonLink href="#contact" variant="gtm" size="md">
              Talk to us
            </FyiButtonLink>
          </div>
          <CardNumber className="top-7 right-7 text-fyi-gtm-number md:top-8 md:right-8">
            02
          </CardNumber>
        </Card>

        {/* 03 · Mira Intelligence — plum glow washing down from the top */}
        <Card
          className="md:min-h-[392px] lg:min-h-0"
          border="[--angle:136.2deg] [--edge:color-mix(in_srgb,var(--fyi-intelligence)_90%,transparent)] md:[--angle:149.74deg] lg:[--angle:149.98deg]"
          surface="gap-8 bg-[linear-gradient(180deg,rgba(207,95,211,0.2)_3%,rgba(16,15,18,0.2)_60%)] p-7 md:p-8"
        >
          <div className="flex flex-col gap-4">
            <h3 className={smallTitle}>
              Mira{" "}
              <span className="block text-fyi-intelligence">Intelligence</span>
            </h3>
            <p className={smallBody}>
              In partnership with <strong className={emphasis}>Bluechip</strong>
              , we combine Mira&apos;s ecosystem data with proprietary
              stablecoin fundamentals to give you a clearer read on the market.
            </p>
          </div>
          <div className="flex flex-col items-start gap-5 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-4">
            <FyiButtonLink href="#contact" variant="intelligence" size="md">
              Request a briefing
            </FyiButtonLink>
            <div className="flex items-center gap-3">
              <Image
                src="/fyi/engage-lp-mira-icon.png"
                alt="Mira"
                width={62}
                height={20}
                className="h-5 w-[62px] shrink-0 object-contain"
              />
              <span
                aria-hidden
                className="text-mira-small leading-normal font-normal text-mira-text-meta"
              >
                ×
              </span>
              <Image
                src="/fyi/engage-lp-bluechip.png"
                alt="Bluechip"
                width={75}
                height={24}
                className="h-6 w-[75px] shrink-0 object-contain"
              />
            </div>
          </div>
          <CardNumber className="top-7 right-7 text-fyi-intelligence-number md:top-8 md:right-8">
            03
          </CardNumber>
        </Card>
      </div>
    </section>
  )
}
