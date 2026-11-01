import type { Metadata } from "next"

import { FyiButtonsBoard } from "./_components/buttons-board"
import { FyiTactileButtonsBoard } from "./_components/tactile-buttons-board"
import { FyiTypographyBoard } from "./_components/typography-board"

export const metadata: Metadata = {
  title: "Mira fyi · Design elements",
  description:
    "The design elements behind fyi.miragather — typography, with fonts and semantic fyi variable names.",
}

// The /fyi counterpart to the home "UI Elements" boards, rendered in the
// fyi dark theme so every specimen shows in its real font and colour.
export default function FyiDesignPage() {
  return (
    <main className="mira-dark min-h-svh bg-mira-background-page font-mira text-mira-text-body">
      <h1 className="sr-only">Mira fyi design elements</h1>
      <div className="mx-auto flex w-full max-w-[1856px] flex-col gap-16 px-4 py-10 min-[2096px]:px-0 md:px-10 lg:gap-[120px] lg:px-[120px] lg:py-[120px]">
        <FyiTypographyBoard />
        <FyiButtonsBoard />
        <FyiTactileButtonsBoard />
      </div>
    </main>
  )
}
