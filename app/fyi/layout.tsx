import { Outfit } from "next/font/google"
import type { ReactNode } from "react"

// fyi.miragather pairs Montserrat (UI, loaded in the root layout) with Outfit
// for display type — headlines, card titles and stat figures (Figma).
const fontDisplay = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

export default function FyiLayout({ children }: { children: ReactNode }) {
  return <div className={fontDisplay.variable}>{children}</div>
}
