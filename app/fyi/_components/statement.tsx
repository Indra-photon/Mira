/**
 * 02 · Statement (Figma: fyiPage-v1 › 536:2240 desktop, 536:2543 tablet,
 * 536:2846 mobile). Left-aligned Montserrat Regular in Text/Meta, in a
 * centred 1089px column, with the three proof points lifted to Text/Heading.
 * Type: fyi/text/lead (20 → 28 → 32px).
 */
const emphasis = "text-mira-text-heading"

export function FyiStatement() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-[120px] lg:px-16 lg:py-40">
      <p className="mx-auto max-w-[1089px] text-left text-fyi-lead font-normal text-mira-text-meta">
        Mira is the ecosystem intelligence company for digital finance. We
        combine <span className={emphasis}>proprietary data</span>,{" "}
        <span className={emphasis}>market insights</span>, and a network of{" "}
        <span className={emphasis}>100k+ digital asset professionals</span> to
        help companies build visibility, reach the right people, and turn market
        opportunities into growth.
      </p>
    </section>
  )
}
