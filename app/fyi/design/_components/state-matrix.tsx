import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { CellLabel, DocGrid, DocHeaderRow, TokenCell } from "./doc-parts"

/**
 * Button state matrix shared by the /fyi/design button boards: one row per
 * button, one column per state. Default is live; the other states are frozen
 * pictures of that state.
 */

export type ButtonState = "default" | "hover" | "pressed" | "focus" | "disabled"

export type MatrixRow = {
  name: string
  use: string
  spec: string
  token: string
  /** Variables per state, shown under each specimen. */
  states: Record<ButtonState, string[]>
}

const DEFAULT_STATES: { key: ButtonState; title: string }[] = [
  { key: "default", title: "Default · live" },
  { key: "hover", title: "Hover" },
  { key: "pressed", title: "Pressed" },
  { key: "focus", title: "Focus · keyboard" },
  { key: "disabled", title: "Disabled" },
]

// Every row shares the same track sizes so the state columns line up; the
// widest specimen ("Request a briefing", 218px) fits the 224px state track.
const columns =
  "grid grid-cols-1 gap-5 lg:grid-cols-[minmax(220px,1fr)_repeat(5,224px)] lg:items-start lg:gap-4"

export function ButtonStateMatrix<Row extends MatrixRow>({
  label,
  rows,
  renderSpecimen,
  stateTitles,
}: {
  label: string
  rows: Row[]
  renderSpecimen: (row: Row, state: ButtonState) => ReactNode
  /** Override column titles, e.g. { pressed: "Pressed · scale 0.96" }. */
  stateTitles?: Partial<Record<ButtonState, string>>
}) {
  const states = DEFAULT_STATES.map((state) => ({
    ...state,
    title: stateTitles?.[state.key] ?? state.title,
  }))
  const headers = [
    "Button · where to use · semantic variable",
    ...states.map((state) => state.title),
  ]

  return (
    <div className="w-full overflow-x-auto">
      <DocGrid label={label} className="lg:min-w-[1440px]">
        <DocHeaderRow columns={columns} headers={headers} />
        {rows.map((row) => (
          <div
            key={row.token}
            role="row"
            className={cn(
              columns,
              "px-6 py-6 shadow-mira-divider last:shadow-none"
            )}
          >
            <div role="cell" className="flex flex-col gap-2">
              <p className="text-mira-normal font-bold text-mira-text-heading">
                {row.name}
              </p>
              <p className="text-mira-small text-pretty text-mira-text-body">
                {row.use}
              </p>
              <p className="text-mira-extra-small text-mira-text-meta">
                {row.spec}
              </p>
              <div className="pt-2">
                <TokenCell token={row.token} />
              </div>
            </div>

            {states.map((state) => (
              <div key={state.key} role="cell" className="flex flex-col gap-3">
                <CellLabel>{state.title}</CellLabel>
                <div className="flex min-h-14 items-center">
                  {renderSpecimen(row, state.key)}
                </div>
                <div className="flex flex-col gap-0.5 text-mira-extra-small whitespace-pre-wrap text-mira-text-meta">
                  {row.states[state.key].map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </DocGrid>
    </div>
  )
}
