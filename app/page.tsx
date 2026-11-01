import type { Metadata } from "next"

import { BadgesBoard } from "@/components/mira-docs/badges-board"
import { BordersBoard } from "@/components/mira-docs/borders-board"
import { ButtonsBoard } from "@/components/mira-docs/buttons-board"
import { IconsBoard } from "@/components/mira-docs/icons-board"
import { TypographyBoard } from "@/components/mira-docs/typography-board"

export const metadata: Metadata = {
  title: "Mira · UI Elements",
  description:
    "Mira design system foundations: typography, buttons, badges, borders and icons.",
}

// Figma: New Mira file › Brand token set up › UI Elements. The Mira brand is
// light-only for now, so this page pins its own surface regardless of theme.
export default function Page() {
  return (
    <main className="min-h-svh bg-mira-background-page font-mira text-mira-text-body scheme-light">
      <h1 className="sr-only">Mira UI Elements</h1>
      <div className="mx-auto flex w-full max-w-[1856px] flex-col gap-16 px-4 py-10 min-[2096px]:px-0 md:px-10 lg:gap-[120px] lg:px-[120px] lg:py-[120px]">
        <TypographyBoard />
        <ButtonsBoard />
        <BadgesBoard />
        <BordersBoard />
        <IconsBoard />
      </div>
    </main>
  )
}
