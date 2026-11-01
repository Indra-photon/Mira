import type { Metadata } from "next"

import { FyiContact } from "./_components/contact"
import { FyiEngage } from "./_components/engage"
import { FyiFooter } from "./_components/footer"
import { FyiHero } from "./_components/hero"
import { FyiNumbers } from "./_components/numbers"
import { FyiStatement } from "./_components/statement"

export const metadata: Metadata = {
  title: "Mira — Ecosystem intelligence for digital finance",
  description:
    "Mira combines proprietary data, market insights and a network of 100k+ digital asset professionals to help companies build visibility, reach the right people and turn market opportunities into growth.",
}

// Figma: New Mira file › fyi.miragather › fyiPage-v1 (Desktop 1440 · Tablet
// 768 · Mobile 390). Mobile-first: base = 390 design, md = 768, lg = 1440.
export default function FyiPage() {
  return (
    <main className="mira-dark min-h-svh overflow-x-clip bg-mira-background-page font-mira text-mira-text-body">
      <FyiHero />
      <FyiStatement />
      <FyiEngage />
      <FyiNumbers />
      <FyiContact />
      <FyiFooter />
    </main>
  )
}
