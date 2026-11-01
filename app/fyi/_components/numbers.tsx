import Image from "next/image"

import { cn } from "@/lib/utils"

// Figma: fyiPage-v1 › 04 · Numbers (Desktop 536:2280 · Tablet 536:2583 ·
// Mobile 536:2886). Logo rail 536:2285, stats panel 572:2222 / 572:2239 /
// 572:2258.

type Logo = {
  name: string
  src: string
  /** Desktop (1440) box size in px — tablet ×0.85, mobile ×0.7. */
  w: number
  h: number
  /**
   * Some SVG logos sit inside a clip group in Figma, offset by a fraction of
   * a pixel. `inset` mirrors that placement inside the clipped box.
   */
  inset?: { top: string; right: string; bottom: string; left: string }
}

const LOGOS: Logo[] = [
  { name: "Ethereum Foundation", src: "/fyi/logo-ethereum.png", w: 90, h: 31 },
  { name: "Solana", src: "/fyi/logo-solana.png", w: 109, h: 17 },
  {
    name: "Coinbase",
    src: "/fyi/logo-coinbase.svg",
    w: 96,
    h: 16.8,
    inset: { top: "1.06%", right: "0%", bottom: "-1.06%", left: "0%" },
  },
  {
    name: "OKX",
    src: "/fyi/logo-okx.svg",
    w: 67.2,
    h: 19.2,
    inset: { top: "1.81%", right: "1.52%", bottom: "-0.6%", left: "1.33%" },
  },
  { name: "Binance", src: "/fyi/logo-binance.svg", w: 107.462, h: 21.6 },
  { name: "BlackRock", src: "/fyi/logo-blackrock.png", w: 127, h: 18 },
  { name: "J.P. Morgan", src: "/fyi/logo-jpmorgan.png", w: 75, h: 32 },
  {
    name: "Goldman Sachs",
    src: "/fyi/logo-goldman.svg",
    w: 75.6,
    h: 31.2,
    inset: { top: "1.92%", right: "1.55%", bottom: "-1.92%", left: "0%" },
  },
  {
    name: "Standard Chartered",
    src: "/fyi/logo-stanchart.png",
    w: 86,
    h: 36,
  },
  { name: "a16z", src: "/fyi/logo-channels4.png", w: 55, h: 55 },
  { name: "Fireblocks", src: "/fyi/logo-lockup.svg", w: 128.105, h: 21.6 },
  { name: "Ledger", src: "/fyi/logo-ledger.png", w: 72, h: 24 },
]

const STATS = [
  { value: "4", label: "Years of behavioral data" },
  { value: "5k", label: "Digital asset companies indexed" },
  { value: "80k", label: "Newsletter subscribers" },
  { value: "100+", label: "Companies worked with across the ecosystem" },
] as const

// Seamless loop: two identical tracks, the pair slides by exactly one track.
const MARQUEE_KEYFRAMES =
  "@keyframes fyi-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}"

function LogoTrack({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className={cn(
        // justify-around + half-gap padding keeps the seam gap equal to the
        // inner gaps, and min-w-screen keeps the loop gap-free on wide screens.
        "flex min-w-screen shrink-0 items-center justify-around",
        "gap-x-[calc(64px*var(--logo-scale))] px-[calc(32px*var(--logo-scale))]",
        "motion-reduce:w-full motion-reduce:min-w-0 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6 motion-reduce:px-6",
        duplicate && "motion-reduce:hidden"
      )}
    >
      {LOGOS.map((logo) => (
        <li
          key={logo.name}
          className="relative shrink-0 overflow-hidden"
          style={{
            width: `calc(${logo.w}px * var(--logo-scale))`,
            height: `calc(${logo.h}px * var(--logo-scale))`,
          }}
        >
          {logo.inset ? (
            <span className="absolute" style={logo.inset}>
              <Image
                src={logo.src}
                alt={duplicate ? "" : logo.name}
                fill
                sizes={`${Math.ceil(logo.w)}px`}
              />
            </span>
          ) : (
            <Image
              src={logo.src}
              alt={duplicate ? "" : logo.name}
              fill
              sizes={`${Math.ceil(logo.w)}px`}
              className="object-contain"
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export function FyiNumbers() {
  return (
    <section
      aria-labelledby="fyi-numbers-heading"
      className="flex flex-col items-center pt-20 pb-16 md:pt-24 lg:pt-30"
    >
      <style>{MARQUEE_KEYFRAMES}</style>

      {/* Headline */}
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-16">
        <h2
          id="fyi-numbers-heading"
          className="text-center font-fyi-display text-[28px] leading-[1.1] font-medium tracking-[-0.02em] text-balance text-mira-text-heading md:text-[36px] lg:text-[48px]"
        >
          Trusted across digital finance
        </h2>
      </div>

      {/* Read by teams at · full-bleed logo rail */}
      <div className="flex w-full flex-col items-center gap-6 pt-12 pb-20">
        <p className="text-center font-fyi-display text-[13px] leading-[1.4] font-medium text-mira-text-meta md:text-mira-small lg:text-mira-normal">
          Read by teams at
        </p>
        <div
          className={cn(
            "group/rail w-full overflow-hidden",
            "[--logo-scale:0.7] md:[--logo-scale:0.85] lg:[--logo-scale:1]",
            "h-[calc(56px*var(--logo-scale))] motion-reduce:h-auto"
          )}
        >
          <div
            className={cn(
              "flex h-full w-max items-center motion-reduce:w-full",
              "animate-[fyi-marquee_40s_linear_infinite] [animation-delay:-3.8s] motion-reduce:animate-none",
              "group-hover/rail:[animation-play-state:paused]"
            )}
          >
            <LogoTrack />
            <LogoTrack duplicate />
          </div>
        </div>
      </div>

      {/* Stats panel · one surface, 4 stats */}
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div
          className={cn(
            // 1px gradient edge: the wrapper's background shows through p-px.
            "rounded-[28px] p-px",
            "bg-[linear-gradient(var(--fyi-stats-edge-angle),rgb(255_255_255/0.32)_0%,transparent_20%,transparent_80%,rgb(255_255_255/0.32)_100%)]",
            "[--fyi-stats-edge-angle:139deg] md:[--fyi-stats-edge-angle:153deg] lg:[--fyi-stats-edge-angle:168deg]"
          )}
        >
          <dl className="grid grid-cols-2 overflow-hidden rounded-[27px] bg-mira-background-card lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "relative flex min-w-0 flex-col gap-2 py-6 pr-3 pl-4 md:gap-3 md:py-8 md:pr-6 md:pl-8",
                  "lg:gap-5 lg:py-12 lg:pr-[clamp(20px,2.22vw,32px)] lg:pl-[clamp(28px,2.78vw,40px)]",
                  // Vertical 1px divider that fades at both ends.
                  "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-linear-to-b before:from-transparent before:via-white/14 before:to-transparent",
                  i % 2 === 0 && "before:hidden",
                  i === 2 && "lg:before:block",
                  // Horizontal divider between the two rows (2×2 only),
                  // spanning both columns, fading at both ends.
                  i === 2 &&
                    "after:pointer-events-none after:absolute after:top-0 after:left-0 after:h-px after:w-[200%] after:bg-linear-to-r after:from-transparent after:via-white/14 after:to-transparent lg:after:hidden"
                )}
              >
                <dt className="order-2 text-mira-small font-normal text-mira-text-meta md:text-mira-normal lg:text-mira-large">
                  {stat.label}
                </dt>
                <dd className="order-1 font-fyi-display text-[40px] leading-none font-medium tracking-[-0.04em] whitespace-nowrap text-mira-text-heading md:text-[64px] lg:text-[clamp(64px,6.67vw,96px)]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
