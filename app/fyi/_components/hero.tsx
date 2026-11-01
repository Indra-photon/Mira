"use client"

import {
  animate,
  motion,
  MotionConfig,
  useMotionValue,
  useReducedMotion,
  type AnimationPlaybackControls,
  type MotionValue,
} from "motion/react"
import Image from "next/image"
import Link from "next/link"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"

import { FyiButtonLink } from "./fyi-button"

/**
 * 01 · Hero (Figma: fyiPage-v1 › 536:2214 desktop, 536:2517 tablet,
 * 536:2820 mobile).
 *
 * - Mobile: dimmed world (70%) bleeding off the right, behind the text, with
 *   left / bottom / top-edge fades. No plane.
 * - Tablet: full-strength world behind the text, left + bottom fades, plane
 *   "on the line" inside the world.
 * - Desktop: a large world (1136×720) bleeding off the right, its point
 *   aiming left behind the tagline; the plane flies left out of the tip and
 *   the bottom 320px of the hero fades into the page.
 *
 * The illustration is the same PNG mirrored (point aims left). Its far edge is
 * a hard crop, so at every width it is anchored to bleed off the right.
 */

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 * Read top-to-bottom. Each value is ms after the hero mounts.
 *
 *    0ms   dark stage, world hidden behind a clip
 *  100ms   nav fades down into place
 *  250ms   wordmark letters rise M → I → R → A (80ms apart), blur 10 → 0
 *  650ms   tagline words drift up one by one (35ms apart)
 * 1150ms   desktop: plane fades in at the far right, small (0.72) and
 *          high, and idles with a slow bob
 * 1850ms   plane flies a curved glide to its spot by the world's point,
 *          growing to full size and banking into the turn (2.2s).
 *          A torn V-shaped rip trails its tail, revealing the world;
 *          the world settles from 1.06 → 1 as it opens
 *          (waits for the illustration to load, up to +2.5s)
 *  ~4050ms clip removed; everything at rest
 *
 * Tablet / mobile: same text sequence, then the rip sweeps right → left on
 * its own (1.4s); the tablet plane fades in once the world is open.
 * Reduced motion: everything appears in place with a short fade.
 * ───────────────────────────────────────────────────────── */

const TIMING = {
  nav: 100, //          nav fades down
  wordmark: 250, //     first wordmark letter rises
  tagline: 650, //      first tagline word drifts up
  planeAppear: 1150, // desktop plane appears at the right and idles
  flight: 1850, //      plane takes off / rip begins
  loadTimeout: 2500, // max extra wait for the illustration before flying
}

/** Stage reached at each beat (single source of truth for the JSX). */
const STAGE = {
  idle: 0,
  nav: 1,
  wordmark: 2,
  tagline: 3,
  plane: 4,
  flight: 5,
  settled: 6,
}

const LG_QUERY = "(min-width: 64rem)" // Tailwind `lg`

function subscribeLg(onChange: () => void) {
  const query = window.matchMedia(LG_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}
const getLg = () => window.matchMedia(LG_QUERY).matches
const getLgOnServer = () => false

/* Nav row */
const NAV = {
  offsetY: -8, // px it drops in from
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
}

/* Wordmark — the one SVG, sliced into four letters by clip-path cuts placed
   in the gaps between glyphs (M 0–137 · I 200–222 · R 284–388 · A 427–560
   on the 560-wide artboard). */
const WORDMARK = {
  slices: [
    { key: "m", from: 0, to: 30 },
    { key: "i", from: 30, to: 45.18 },
    { key: "r", from: 45.18, to: 72.86 },
    { key: "a", from: 72.86, to: 100 },
  ],
  stagger: 0.08, //  s between letters
  offsetY: "32%", // of the wordmark height
  blur: 10, //       px blur before settling
  spring: { type: "spring" as const, stiffness: 220, damping: 26 },
}

/* Tagline — word by word */
const TAGLINE = {
  words: "Ecosystem intelligence for digital finance".split(" "),
  stagger: 0.035, // s between words
  offsetY: 10, //    px each word drifts up from
  blur: 6, //        px blur before settling
  spring: { type: "spring" as const, stiffness: 260, damping: 28 },
}

/* Desktop plane: where it waits, the glide it flies, how it banks */
const PLANE = {
  rightInset: 64, //   px from the hero's right edge while waiting
  liftY: -190, //      px above its final spot while waiting
  startScale: 0.72, // smaller (farther away) while waiting
  appearScale: 0.85, // pop-in scale on top of startScale
  appearSpring: { type: "spring" as const, stiffness: 200, damping: 22 },
  fade: { duration: 0.5, ease: "easeOut" as const },
  bob: { distance: 5, duration: 2.4 }, // idle float while waiting
  curve: { controlX: 0.45, controlY: 56 }, // quadratic control: × dx, px below
  bank: { factor: 0.55, max: 16 }, // fraction of the path angle, ° clamp
  tailRatio: 0.85, //  where the tail sits along the plane's width (nose left)
}

/* The flight itself (progress 0 → 1 drives plane + rip together) */
const FLIGHT = {
  duration: 2.2, // s
  ease: [0.55, 0, 0.2, 1] as [number, number, number, number], // slow lift-off, long glide in
}

/* The rip that reveals the world: a jagged V whose point trails the plane */
const TEAR = {
  lead: 120, //        px the rip starts ahead of the tail (keeps it off-screen at rest)
  endPull: 280, //     px the rip races past the tail at the end (opens the point)
  spread: 0.45, //     V width at take-off, × illustration width
  samples: 16, //      points down the torn edge
  jag: [0, 10, -6, 14, -2, 9, -11, 4, -7, 12, -3, 8, -9, 5, -4, 11, 0], // px
  sweepDuration: 1.4, // s · tablet/mobile (no plane to follow)
  sweepApex: 0.5, //   rip point height, × illustration height
  sweepEnd: -40, //    px · final edge, past the illustration's left side
  hidden: "inset(0px 0px 0px 100%)",
}

/* The world, settling as it opens */
const WORLD = {
  startScale: 1.06,
  origin: "30% 55%", // near the point, so it settles toward the plane
}

type Geometry = {
  lg: boolean
  illuLeft: number
  illuTop: number
  illuW: number
  illuH: number
  planeL: number
  planeT: number
  planeW: number
  planeH: number
  dx0: number
  dy0: number
}

type FlightValues = {
  x: MotionValue<number>
  y: MotionValue<number>
  rotate: MotionValue<number>
  scale: MotionValue<number>
  world: MotionValue<number>
  clip: MotionValue<string>
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v))

function measure(
  section: HTMLElement,
  illu: HTMLElement,
  plane: HTMLElement,
  lg: boolean
): Geometry {
  const s = section.getBoundingClientRect()
  const i = illu.getBoundingClientRect()
  // offset* ignore transforms, so this is the plane's resting slot.
  const planeL = plane.offsetLeft
  const planeW = plane.offsetWidth
  return {
    lg,
    illuLeft: i.left - s.left,
    illuTop: i.top - s.top,
    illuW: i.width,
    illuH: i.height,
    planeL,
    planeT: plane.offsetTop,
    planeW,
    planeH: plane.offsetHeight,
    dx0: s.width - PLANE.rightInset - planeW - planeL,
    dy0: PLANE.liftY,
  }
}

/** Torn edge: everything right of a jagged V whose point sits at apexY. */
function tearPolygon(edge: number, apexY: number, spread: number, h: number) {
  const points = ["100% 0px", "100% 100%"]
  for (let i = TEAR.samples; i >= 0; i--) {
    const y = (i / TEAR.samples) * h
    const x = edge + (spread * Math.abs(y - apexY)) / h + TEAR.jag[i]
    points.push(`${x.toFixed(1)}px ${y.toFixed(1)}px`)
  }
  return `polygon(${points.join(", ")})`
}

/** One progress value (0 → 1) places the plane and the rip together. */
function applyProgress(
  p: number,
  g: Geometry,
  v: FlightValues,
  withClip: boolean
) {
  const q = 1 - p
  let edge: number
  let apexY: number

  if (g.lg) {
    // Quadratic Bézier from the waiting spot (dx0, dy0) to the slot (0, 0).
    const c = { x: g.dx0 * PLANE.curve.controlX, y: PLANE.curve.controlY }
    const bx = q * q * g.dx0 + 2 * q * p * c.x
    const by = q * q * g.dy0 + 2 * q * p * c.y
    const vx = 2 * q * (c.x - g.dx0) - 2 * p * c.x
    const vy = 2 * q * (c.y - g.dy0) - 2 * p * c.y
    // Nose points left, so pitch = heading − 180°. Level at both ends.
    const heading = (Math.atan2(vy, vx) * 180) / Math.PI
    const pitch = heading > 0 ? heading - 180 : heading + 180
    const envelope = Math.min(1, 3 * p) * Math.min(1, 3 * q)
    const scale = lerp(PLANE.startScale, 1, p)

    v.x.set(bx)
    v.y.set(by)
    v.scale.set(scale)
    v.rotate.set(clamp(pitch * PLANE.bank.factor, PLANE.bank.max) * envelope)

    const tail =
      g.planeL + bx + g.planeW * (0.5 + (PLANE.tailRatio - 0.5) * scale)
    edge = tail - g.illuLeft + TEAR.lead * q - TEAR.endPull * p ** 4
    apexY = g.planeT + by + g.planeH / 2 - g.illuTop
  } else {
    edge = lerp(g.illuW + TEAR.lead, TEAR.sweepEnd, p)
    apexY = g.illuH * TEAR.sweepApex
  }

  v.world.set(lerp(WORLD.startScale, 1, p))
  if (withClip) {
    v.clip.set(
      tearPolygon(edge, apexY, TEAR.spread * g.illuW * q ** 1.5, g.illuH)
    )
  }
}

export function FyiHero({ replayTrigger = 0 }: { replayTrigger?: number }) {
  const reduceMotion = useReducedMotion()
  const [sequenceStage, setStage] = useState(STAGE.idle)
  // Reduced motion skips the sequence: everything renders at rest.
  const stage = reduceMotion ? STAGE.settled : sequenceStage
  const isLg = useSyncExternalStore(subscribeLg, getLg, getLgOnServer)

  const sectionRef = useRef<HTMLElement>(null)
  const illuRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<HTMLDivElement>(null)

  const lgRef = useRef(false)
  const dueRef = useRef(false) // flight time reached
  const readyRef = useRef(false) // illustration decoded
  const startedRef = useRef(false)
  const controlsRef = useRef<AnimationPlaybackControls | null>(null)

  const values: FlightValues = {
    x: useMotionValue(0),
    y: useMotionValue(0),
    rotate: useMotionValue(0),
    scale: useMotionValue(1),
    world: useMotionValue(WORLD.startScale),
    clip: useMotionValue(TEAR.hidden),
  }
  const valuesRef = useRef(values)

  const getGeometry = useCallback(() => {
    const section = sectionRef.current
    const illu = illuRef.current
    const plane = planeRef.current
    if (!section || !illu || !plane) return null
    return measure(section, illu, plane, lgRef.current)
  }, [])

  const tryFly = useCallback(() => {
    if (!dueRef.current || !readyRef.current || startedRef.current) return
    const g = getGeometry()
    if (!g) return
    startedRef.current = true
    setStage(STAGE.flight)
    controlsRef.current = animate(0, 1, {
      duration: g.lg ? FLIGHT.duration : TEAR.sweepDuration,
      ease: FLIGHT.ease,
      onUpdate: (p) => applyProgress(p, g, valuesRef.current, true),
      onComplete: () => setStage(STAGE.settled),
    })
  }, [getGeometry])

  const handleIllustrationLoad = useCallback(() => {
    readyRef.current = true
    tryFly()
  }, [tryFly])

  useEffect(() => {
    const v = valuesRef.current
    lgRef.current = getLg()

    // Reset (also runs on replay).
    controlsRef.current?.stop()
    dueRef.current = false
    startedRef.current = false
    v.x.set(0)
    v.y.set(0)
    v.rotate.set(0)
    v.scale.set(1)
    v.world.set(1)

    if (reduceMotion) return

    v.world.set(WORLD.startScale)
    v.clip.set(TEAR.hidden)

    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => setStage(STAGE.idle), 0))
    timers.push(setTimeout(() => setStage(STAGE.nav), TIMING.nav))
    timers.push(setTimeout(() => setStage(STAGE.wordmark), TIMING.wordmark))
    timers.push(setTimeout(() => setStage(STAGE.tagline), TIMING.tagline))
    timers.push(
      setTimeout(() => {
        // Park the desktop plane at its waiting spot before it fades in.
        const g = getGeometry()
        if (g?.lg) applyProgress(0, g, v, false)
        setStage(STAGE.plane)
      }, TIMING.planeAppear)
    )
    timers.push(
      setTimeout(() => {
        dueRef.current = true
        tryFly()
      }, TIMING.flight)
    )
    timers.push(
      setTimeout(() => {
        readyRef.current = true
        tryFly()
      }, TIMING.flight + TIMING.loadTimeout)
    )

    return () => {
      timers.forEach(clearTimeout)
      controlsRef.current?.stop()
    }
  }, [reduceMotion, replayTrigger, getGeometry, tryFly])

  const planeVisible = isLg ? stage >= STAGE.plane : stage >= STAGE.settled
  const planeIdling = isLg && stage === STAGE.plane

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        className="relative isolate h-[560px] overflow-hidden md:h-[620px] lg:h-[800px]"
      >
        {/* World illustration (mirrored). Mobile 473×300 at -86/150, tablet
            757×480 at 48/96. Desktop 1136×720 at 553/135 (centre-167 at
            1440), its middle held at y=495; never closer than 471px so the
            tip clears the tagline at 1024, and growing past 1440 so the crop
            never shows. The rip clip lives on this unmirrored wrapper. */}
        <motion.div
          ref={illuRef}
          aria-hidden
          style={{
            clipPath: stage >= STAGE.settled ? "none" : values.clip,
          }}
          className="absolute top-[150px] left-[max(-86px,calc(100%-476px))] aspect-[757/480] w-[473px] md:top-[96px] md:left-[max(48px,calc(100%-720px))] md:w-[757px] lg:top-[495px] lg:left-[max(471px,calc(50%-167px))] lg:aspect-[1136/720] lg:w-[max(1136px,calc(50%+167px))] lg:-translate-y-1/2"
        >
          <motion.div
            className="absolute inset-0"
            style={{ scale: values.world, transformOrigin: WORLD.origin }}
          >
            <Image
              src="/fyi/hero-illustration.png"
              alt=""
              fill
              preload
              sizes="(min-width: 1938px) calc(50vw + 167px), (min-width: 1024px) 1136px, (min-width: 768px) 757px, 473px"
              onLoad={handleIllustrationLoad}
              className="pointer-events-none -scale-x-100 object-cover opacity-70 md:opacity-100"
            />
          </motion.div>
        </motion.div>

        {/* Desktop · Fade · bottom into page (320px, full width) */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-[480px] hidden h-[320px] bg-linear-to-b from-mira-background-page/0 via-mira-background-page/85 via-70% to-mira-background-page lg:block"
        />

        {/* Mobile fades */}
        <div
          aria-hidden
          className="absolute top-[148px] left-0 h-[304px] w-[280px] bg-linear-to-r from-mira-background-page via-mira-background-page/75 via-45% to-mira-background-page/0 md:hidden"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-[285px] h-[169px] bg-linear-to-b from-mira-background-page/0 via-mira-background-page/85 via-70% to-mira-background-page md:hidden"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-[148px] h-12 bg-linear-to-b from-mira-background-page/60 to-mira-background-page/0 md:hidden"
        />

        {/* Tablet fades */}
        <div
          aria-hidden
          className="absolute top-[94px] left-0 hidden h-[484px] w-[560px] bg-linear-to-r from-mira-background-page via-mira-background-page/80 via-50% to-mira-background-page/0 md:block lg:hidden"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-[336px] hidden h-[244px] bg-linear-to-b from-mira-background-page/0 via-mira-background-page/85 via-75% to-mira-background-page md:block lg:hidden"
        />

        {/* Plane. Tablet: 100w, mirrored, riding with the world. Desktop: 190w
            at 602/483, nose left, just out of the world's point — kept 49px
            right of the illustration so the tip-to-plane gap stays fixed at
            every width. The CSS sets its resting slot; the flight moves it
            with x / y / rotate / scale offsets that end at zero. */}
        <motion.div
          ref={planeRef}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: planeVisible ? 1 : 0 }}
          transition={PLANE.fade}
          style={{
            x: values.x,
            y: values.y,
            rotate: values.rotate,
            scale: values.scale,
          }}
          className="absolute hidden aspect-[122/45.217] -scale-x-100 md:top-[338px] md:left-[max(590px,calc(100%-178px))] md:block md:w-[100px] lg:top-[483px] lg:left-[max(520px,calc(50%-118px))] lg:w-[190px] lg:scale-x-100"
        >
          <motion.div
            className="absolute inset-[0_0.12%_1.31%_0]"
            initial={{ scale: PLANE.appearScale, y: 0 }}
            animate={{
              scale: planeVisible ? 1 : PLANE.appearScale,
              y: planeIdling ? [0, -PLANE.bob.distance, 0] : 0,
            }}
            transition={{
              scale: PLANE.appearSpring,
              y: planeIdling
                ? {
                    duration: PLANE.bob.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : PLANE.appearSpring,
            }}
          >
            <Image
              src="/fyi/hero-plane.svg"
              alt=""
              width={121.853}
              height={44.6243}
              className="absolute inset-0 block size-full max-w-none"
            />
          </motion.div>
        </motion.div>

        <div className="relative mx-auto max-w-[1440px]">
          <motion.header
            initial={{ opacity: 0, y: NAV.offsetY }}
            animate={{
              opacity: stage >= STAGE.nav ? 1 : 0,
              y: stage >= STAGE.nav ? 0 : NAV.offsetY,
            }}
            transition={NAV.spring}
          >
            <nav
              aria-label="Main"
              className="flex h-20 items-center justify-between px-6 md:px-12 lg:px-16"
            >
              <Link
                href="/fyi"
                aria-label="Mira home"
                className="relative h-6 w-[74.572px] shrink-0 overflow-clip rounded-sm outline-none focus-visible:shadow-mira-focus-ring md:h-7 md:w-[87px] lg:h-[30px] lg:w-[93.214px]"
              >
                <span className="absolute inset-[0_0.29%_0.06%_0] [mask-image:url(/fyi/hero-mira-logo-mask.svg)] [mask-size:100%_100%] [mask-repeat:no-repeat]">
                  <Image
                    src="/fyi/hero-mira-logo.svg"
                    alt=""
                    width={92.9478}
                    height={29.9809}
                    className="absolute inset-0 block size-full max-w-none"
                  />
                </span>
              </Link>
              <FyiButtonLink
                href="#contact"
                arrow={false}
                className="h-9 px-4 text-fyi-small md:h-10 md:px-5 md:text-fyi-button"
              >
                Talk to us
              </FyiButtonLink>
            </nav>
          </motion.header>

          {/* Message: wordmark (h1) + tagline */}
          <div className="px-6 pt-[141px] md:px-12 md:pt-[169px] lg:px-16 lg:pt-[258px]">
            <h1 className="relative aspect-[560/143.267] w-[220px] md:w-[250px] lg:w-[560px]">
              <span className="sr-only">Mira</span>
              {WORDMARK.slices.map((slice, i) => (
                <motion.span
                  key={slice.key}
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    clipPath: `inset(0 ${100 - slice.to}% 0 ${slice.from}%)`,
                  }}
                  initial={{
                    opacity: 0,
                    y: WORDMARK.offsetY,
                    filter: `blur(${WORDMARK.blur}px)`,
                  }}
                  animate={
                    stage >= STAGE.wordmark
                      ? { opacity: 1, y: "0%", filter: "blur(0px)" }
                      : {
                          opacity: 0,
                          y: WORDMARK.offsetY,
                          filter: `blur(${WORDMARK.blur}px)`,
                        }
                  }
                  transition={{
                    ...WORDMARK.spring,
                    delay: i * WORDMARK.stagger,
                  }}
                >
                  <Image
                    src="/fyi/hero-wordmark.svg"
                    alt=""
                    width={560}
                    height={143.267}
                    loading="eager"
                    className="block size-full"
                  />
                </motion.span>
              ))}
            </h1>
            <p className="max-w-[300px] pt-8 text-fyi-large font-normal text-mira-text-on-dark md:max-w-[480px] lg:max-w-[620px]">
              {TAGLINE.words.map((word, i) => (
                <span key={word}>
                  <motion.span
                    className="inline-block"
                    initial={{
                      opacity: 0,
                      y: TAGLINE.offsetY,
                      filter: `blur(${TAGLINE.blur}px)`,
                    }}
                    animate={
                      stage >= STAGE.tagline
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : {
                            opacity: 0,
                            y: TAGLINE.offsetY,
                            filter: `blur(${TAGLINE.blur}px)`,
                          }
                    }
                    transition={{
                      ...TAGLINE.spring,
                      delay: i * TAGLINE.stagger,
                    }}
                  >
                    {word}
                  </motion.span>
                  {i < TAGLINE.words.length - 1 ? " " : null}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
