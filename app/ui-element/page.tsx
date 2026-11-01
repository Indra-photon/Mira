import { Frame01Column1 } from "@/components/showcase/frame-01/column-1"
import { Frame01Column2 } from "@/components/showcase/frame-01/column-2"
import { Frame01Column3 } from "@/components/showcase/frame-01/column-3"
import { Frame01Column4 } from "@/components/showcase/frame-01/column-4"
import { Frame01Column5 } from "@/components/showcase/frame-01/column-5"
import { Frame01Column6 } from "@/components/showcase/frame-01/column-6"
import { Frame02Column1 } from "@/components/showcase/frame-02/column-1"
import { Frame02Column2 } from "@/components/showcase/frame-02/column-2"
import { Frame02Column3 } from "@/components/showcase/frame-02/column-3"
import { Frame02Column4 } from "@/components/showcase/frame-02/column-4"
import { Frame02Column5 } from "@/components/showcase/frame-02/column-5"
import { Frame02Column6 } from "@/components/showcase/frame-02/column-6"
import { Frame02Column7 } from "@/components/showcase/frame-02/column-7"

// Mirrors the Paper artboards: a 7-track grid (40px padding and gaps) that
// resolves to seven ~383px columns at 3000px and wraps down on smaller screens.
const frameGrid =
  "mx-auto grid w-full max-w-[3000px] grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] items-start gap-10 p-4 sm:p-10"

export default function UiElementPage() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <h1 className="sr-only">Component showcase</h1>

      <section aria-labelledby="frame-01" className={frameGrid}>
        <h2 id="frame-01" className="sr-only">
          Finance and dashboard components
        </h2>
        <Frame01Column1 />
        <Frame01Column2 />
        <div className="min-[800px]:col-span-2">
          <Frame01Column3 />
        </div>
        <Frame01Column4 />
        <Frame01Column5 />
        <Frame01Column6 />
      </section>

      <section aria-labelledby="frame-02" className={frameGrid}>
        <h2 id="frame-02" className="sr-only">
          Product and form components
        </h2>
        <Frame02Column1 />
        <Frame02Column2 />
        <Frame02Column3 />
        <Frame02Column4 />
        <Frame02Column5 />
        <Frame02Column6 />
        <Frame02Column7 />
      </section>
    </main>
  )
}
