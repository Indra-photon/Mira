import Image from "next/image"
import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

/**
 * 06 · Footer · flight into the ecosystem (Figma: fyiPage-v1 › 536:2462
 * desktop, 536:2765 tablet, 536:3068 mobile).
 *
 * A dotted path "flown" from the form's Send button curves down to the plane,
 * which trails a second dotted path "ahead" into the world illustration
 * (point aims right). Sign-off: Mira wordmark + tagline.
 *
 * Each breakpoint is its own composition, laid out in Figma pixels inside a
 * box that keeps the design's aspect ratio and scales with the viewport. The
 * box is pinned so the flown path always starts under the Send button:
 * - mobile: Send is full width → path starts at the horizontal centre
 * - tablet / desktop: Send is right-aligned in the card → path starts at
 *   card right − card padding − half the button (97px / 105px)
 * Scaling with the viewport keeps the illustration's hard left crop off-screen
 * at every width (it would show past 1440 if the art stayed fixed).
 */

type Box = { x: number; y: number; w: number; h: number }
type Path = Box & { src: string }

type Composition = {
  /** Composition size in Figma px (origin = illustration's left edge). */
  width: number
  height: number
  illustration: Box
  flown: Path
  ahead: Path
  plane: Box
  className: string
}

const compositions: Composition[] = [
  // Mobile 390 · s = min(vw / 390, 1.2), path start (x 355) on the centre.
  {
    width: 476,
    height: 456,
    illustration: { x: 0, y: 190, w: 420, h: 266 },
    flown: {
      src: "/fyi/footer-flight-flown-sm.svg",
      x: 354,
      y: 8,
      w: 121.636,
      h: 301,
    },
    ahead: {
      src: "/fyi/footer-flight-ahead-sm.svg",
      x: 333,
      y: 317.28,
      w: 31.6945,
      h: 18.7195,
    },
    plane: { x: 370, y: 297, w: 79.9039, h: 29.262 },
    className:
      "left-[calc(50%_-_min(426px,91.026vw))] w-[min(571.2px,122.051vw)] md:hidden",
  },
  // Tablet 768 · s = vw / 768, path start 97px in from the card's right edge.
  {
    width: 744,
    height: 425,
    illustration: { x: 0, y: 70, w: 560, h: 355 },
    flown: {
      src: "/fyi/footer-flight-flown-md.svg",
      x: 625.7,
      y: 8,
      w: 118.303,
      h: 233.953,
    },
    ahead: {
      src: "/fyi/footer-flight-ahead-md.svg",
      x: 442,
      y: 250.04,
      w: 72.2814,
      h: 13.9596,
    },
    plane: { x: 520, y: 226, w: 99.8799, h: 36.5775 },
    className: "right-[96px] hidden w-[96.875vw] md:block lg:hidden",
  },
  // Desktop 1440 · s = vw / 1440, path start 105px in from the card's right.
  {
    width: 1301,
    height: 540,
    illustration: { x: 0, y: 60, w: 757, h: 480 },
    flown: {
      src: "/fyi/footer-flight-flown-lg.svg",
      x: 1001,
      y: 7,
      w: 300,
      h: 277,
    },
    ahead: {
      src: "/fyi/footer-flight-ahead-lg.svg",
      x: 592,
      y: 300,
      w: 267,
      h: 22.0001,
    },
    plane: { x: 869, y: 269, w: 121.853, h: 44.6243 },
    className: "right-[103.5px] hidden w-[90.347vw] lg:block",
  },
]

const ILLUSTRATION_SIZES =
  "(min-width: 1024px) 52.6vw, (min-width: 768px) 73vw, min(504px, 108vw)"

/** Place a layer by its Figma box, as percentages of the composition. */
function place(c: Composition, box: Box): CSSProperties {
  return {
    left: `${(box.x / c.width) * 100}%`,
    top: `${(box.y / c.height) * 100}%`,
    width: `${(box.w / c.width) * 100}%`,
  }
}

function FlightArt({ c }: { c: Composition }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute top-0", c.className)}
      style={{ aspectRatio: `${c.width} / ${c.height}` }}
    >
      <Image
        src="/fyi/hero-illustration.png"
        alt=""
        width={757}
        height={480}
        sizes={ILLUSTRATION_SIZES}
        className="absolute block h-auto max-w-none"
        style={place(c, c.illustration)}
      />
      <Image
        src={c.flown.src}
        alt=""
        width={c.flown.w}
        height={c.flown.h}
        className="absolute block h-auto max-w-none"
        style={place(c, c.flown)}
      />
      <Image
        src={c.ahead.src}
        alt=""
        width={c.ahead.w}
        height={c.ahead.h}
        className="absolute block h-auto max-w-none"
        style={place(c, c.ahead)}
      />
      <Image
        src="/fyi/hero-plane.svg"
        alt=""
        width={121.853}
        height={44.6243}
        className="absolute block h-auto max-w-none"
        style={place(c, c.plane)}
      />
    </div>
  )
}

export function FyiFooter() {
  return (
    <footer className="relative h-[min(720px,153.846vw)] overflow-hidden px-6 md:h-[62.5vw] md:px-12 lg:h-[38.889vw] lg:px-16">
      {/* Same box as the contact form card, so the art can find Send. */}
      <div className="relative mx-auto h-full w-full max-w-[1089px]">
        {compositions.map((c) => (
          <FlightArt key={c.flown.src} c={c} />
        ))}

        {/* Sign-off · wordmark + tagline. Centred on mobile, flush with the
            card's right edge from tablet up. */}
        <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 md:right-0 md:bottom-16 md:left-auto md:translate-x-0 md:items-end lg:bottom-[88px]">
          <div className="relative h-7 w-[87px] overflow-clip [mask-image:url(/fyi/footer-mira-logo-mask.svg)] [mask-size:100%_100%] [mask-repeat:no-repeat] md:h-8 md:w-[99.429px] lg:h-10 lg:w-[124.286px]">
            <div className="absolute inset-[0_0.29%_0.06%_0]">
              <Image
                src="/fyi/footer-mira-logo.svg"
                alt="Mira"
                width={123.93}
                height={39.9745}
                className="absolute inset-0 block size-full max-w-none"
              />
            </div>
          </div>
          <p className="text-center text-[13px] leading-[1.4] font-normal whitespace-nowrap text-mira-text-meta md:text-right md:text-mira-small lg:text-mira-normal">
            Ecosystem intelligence for digital finance.
          </p>
        </div>
      </div>
    </footer>
  )
}
