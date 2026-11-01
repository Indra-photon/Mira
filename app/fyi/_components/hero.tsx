import Image from "next/image"
import Link from "next/link"

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
export function FyiHero() {
  return (
    <section className="relative isolate h-[560px] overflow-hidden md:h-[620px] lg:h-[800px]">
      {/* World illustration (mirrored). Mobile 473×300 at -86/150, tablet
          757×480 at 48/96. Desktop 1136×720 at 553/135 (centre-167 at 1440),
          its middle held at y=495; never closer than 471px so the tip clears
          the tagline at 1024, and growing past 1440 so the crop never shows. */}
      <div
        aria-hidden
        className="absolute top-[150px] left-[max(-86px,calc(100%-476px))] aspect-[757/480] w-[473px] -scale-x-100 md:top-[96px] md:left-[max(48px,calc(100%-720px))] md:w-[757px] lg:top-[495px] lg:left-[max(471px,calc(50%-167px))] lg:aspect-[1136/720] lg:w-[max(1136px,calc(50%+167px))] lg:-translate-y-1/2"
      >
        <Image
          src="/fyi/hero-illustration.png"
          alt=""
          fill
          preload
          sizes="(min-width: 1938px) calc(50vw + 167px), (min-width: 1024px) 1136px, (min-width: 768px) 757px, 473px"
          className="pointer-events-none object-cover opacity-70 md:opacity-100"
        />
      </div>

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
          every width. */}
      <div
        aria-hidden
        className="absolute hidden aspect-[122/45.217] -scale-x-100 md:top-[338px] md:left-[max(590px,calc(100%-178px))] md:block md:w-[100px] lg:top-[483px] lg:left-[max(520px,calc(50%-118px))] lg:w-[190px] lg:scale-x-100"
      >
        <div className="absolute inset-[0_0.12%_1.31%_0]">
          <Image
            src="/fyi/hero-plane.svg"
            alt=""
            width={121.853}
            height={44.6243}
            className="absolute inset-0 block size-full max-w-none"
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        <header>
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
              className="h-9 px-4 text-mira-small md:h-10 md:px-5 md:text-mira-normal"
            >
              Talk to us
            </FyiButtonLink>
          </nav>
        </header>

        {/* Message: wordmark (h1) + tagline */}
        <div className="px-6 pt-[141px] md:px-12 md:pt-[169px] lg:px-16 lg:pt-[258px]">
          <h1 className="w-[220px] md:w-[250px] lg:w-[560px]">
            <Image
              src="/fyi/hero-wordmark.svg"
              alt="Mira"
              width={560}
              height={143.267}
              loading="eager"
              className="block aspect-[560/143.267] h-auto w-full"
            />
          </h1>
          <p className="max-w-[300px] pt-8 text-mira-medium font-normal text-mira-text-on-dark md:max-w-[480px] lg:max-w-[620px] lg:text-mira-large">
            Ecosystem intelligence for digital finance.
          </p>
        </div>
      </div>
    </section>
  )
}
