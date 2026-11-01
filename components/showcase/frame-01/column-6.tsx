"use client"

import * as React from "react"
import {
  IconCamera,
  IconCirclePlus,
  IconCloudUpload,
  IconWaveform,
  IconWorld,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const brandButton = "bg-brand text-brand-foreground hover:bg-brand/90"

/* ------------------------------------------------------------------ */
/* Stock Performance                                                   */
/* ------------------------------------------------------------------ */

// 6 monthly closes per ticker, plotted against a fixed 0–600 domain.
const TICKERS = {
  VOO: [412, 438, 395, 450, 420, 462],
  SPY: [448, 471, 430, 489, 466, 505],
  QQQ: [365, 392, 371, 418, 401, 436],
  VTI: [221, 235, 214, 242, 229, 251],
} as const

type Ticker = keyof typeof TICKERS

const CHART_W = 343
const CHART_H = 200
const CHART_TOP = 8
const DOMAIN_MAX = 600
const GRID_YS = [8, 56, 104, 152, 200]

// Monotone-X cubic interpolation (same curve as d3.curveMonotoneX).
function monotonePath(points: Array<[number, number]>) {
  const n = points.length
  if (n < 2) return ""
  const sign = (v: number) => (v < 0 ? -1 : 1)
  const tangents: number[] = new Array(n).fill(0)
  for (let i = 1; i < n - 1; i++) {
    const [x0, y0] = points[i - 1]
    const [x1, y1] = points[i]
    const [x2, y2] = points[i + 1]
    const h0 = x1 - x0
    const h1 = x2 - x1
    const s0 = (y1 - y0) / h0
    const s1 = (y2 - y1) / h1
    const p = (s0 * h1 + s1 * h0) / (h0 + h1)
    tangents[i] =
      (sign(s0) + sign(s1)) *
        Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0
  }
  const endSlope = (i: number, j: number, t: number) => {
    const h = points[j][0] - points[i][0]
    return h ? ((3 * (points[j][1] - points[i][1])) / h - t) / 2 : t
  }
  tangents[0] = endSlope(0, 1, tangents[1] ?? 0)
  tangents[n - 1] = endSlope(n - 2, n - 1, tangents[n - 2] ?? 0)

  let d = `M${points[0][0]},${points[0][1]}`
  for (let i = 0; i < n - 1; i++) {
    const [x0, y0] = points[i]
    const [x1, y1] = points[i + 1]
    const dx = (x1 - x0) / 3
    d += `C${x0 + dx},${y0 + dx * tangents[i]},${x1 - dx},${
      y1 - dx * tangents[i + 1]
    },${x1},${y1}`
  }
  return d
}

function StockPerformanceCard() {
  const [ticker, setTicker] = React.useState<Ticker>("VOO")

  const path = React.useMemo(() => {
    const values = TICKERS[ticker]
    const step = CHART_W / (values.length - 1)
    const points = values.map(
      (v, i) =>
        [
          +(i * step).toFixed(3),
          +(CHART_H - (v / DOMAIN_MAX) * (CHART_H - CHART_TOP)).toFixed(2),
        ] as [number, number]
    )
    return monotonePath(points)
  }, [ticker])

  return (
    <Card size="sm" className="w-full">
      <CardHeader>
        <CardTitle className="text-base">Stock Performance</CardTitle>
        <CardDescription>6-month price history.</CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <FieldGroup className="gap-5">
          <Field className="gap-2">
            <FieldLabel htmlFor="f01-c6-ticker">Ticker</FieldLabel>
            <Select
              value={ticker}
              onValueChange={(value) => {
                if (value) setTicker(value as Ticker)
              }}
            >
              <SelectTrigger
                id="f01-c6-ticker"
                size="sm"
                className="w-full rounded-lg"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(TICKERS) as Ticker[]).map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
        <Separator />
        <div className="h-50 w-full">
          <svg
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            preserveAspectRatio="none"
            className="size-full overflow-visible"
            role="img"
            aria-label={`${ticker} 6-month price history`}
          >
            {GRID_YS.map((y) => (
              <line
                key={y}
                x1={0}
                x2={CHART_W}
                y1={y}
                y2={y}
                strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
                className="stroke-foreground/5"
              />
            ))}
            <path
              d={path}
              fill="none"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              className="stroke-chart-1 transition-[d] duration-300"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Explore Catalog                                                     */
/* ------------------------------------------------------------------ */

function ExploreCatalogCard() {
  return (
    <Card size="sm" className="w-full">
      <CardContent>
        <Empty className="gap-4 rounded-xl p-4">
          <EmptyHeader className="gap-2">
            <EmptyMedia
              variant="icon"
              className="size-8 rounded-lg [&_svg:not([class*='size-'])]:size-4"
            >
              <IconWaveform />
            </EmptyMedia>
            <EmptyTitle className="text-sm">Explore Catalog</EmptyTitle>
            <EmptyDescription>
              Check your ISRC codes, metadata, and visual assets before going
              live.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="gap-2.5">
            <Button size="sm" className={`rounded-lg ${brandButton}`}>
              View Catalog
            </Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Set a new milestone                                                 */
/* ------------------------------------------------------------------ */

function MilestoneCard() {
  return (
    <Card size="sm" className="w-full pb-0">
      <CardHeader>
        <CardTitle className="text-base">Set a new milestone</CardTitle>
        <CardDescription>
          Define your financial target and we&apos;ll help you pace your
          savings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-5">
          <Field className="gap-2">
            <FieldLabel htmlFor="f01-c6-goal-name">Goal Name</FieldLabel>
            <Input
              id="f01-c6-goal-name"
              placeholder="e.g. New Car, Home Downpayment"
              className="h-8 rounded-lg"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field className="gap-2">
              <FieldLabel htmlFor="f01-c6-target-amount">
                Target Amount
              </FieldLabel>
              <Input
                id="f01-c6-target-amount"
                defaultValue="$15,000"
                inputMode="decimal"
                className="h-8 rounded-lg"
              />
            </Field>
            <Field className="gap-2">
              <FieldLabel htmlFor="f01-c6-target-date">Target Date</FieldLabel>
              <Input
                id="f01-c6-target-date"
                defaultValue="Dec 2025"
                className="h-8 rounded-lg"
              />
            </Field>
          </div>
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex-col gap-2 border-t bg-muted/50 pb-4">
        <Button size="sm" className={`w-full rounded-lg ${brandButton}`}>
          Create Goal
        </Button>
        <Button size="sm" variant="outline" className="w-full rounded-lg">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Social Links                                                        */
/* ------------------------------------------------------------------ */

const SOCIAL_FIELDS = [
  {
    id: "spotify",
    label: "Spotify Artist URL",
    icon: IconCirclePlus,
    defaultValue: "spotify.com/artist/3j...2k",
    placeholder: "spotify.com/artist/…",
  },
  {
    id: "instagram",
    label: "Instagram Handle",
    icon: IconCamera,
    defaultValue: "@julianduryea_music",
    placeholder: "@handle",
  },
  {
    id: "soundcloud",
    label: "SoundCloud URL",
    icon: IconCloudUpload,
    defaultValue: undefined,
    placeholder: "soundcloud.com/username",
  },
  {
    id: "website",
    label: "Website",
    icon: IconWorld,
    defaultValue: undefined,
    placeholder: "https://yoursite.com",
  },
] as const

function SocialLinksCard() {
  return (
    <Card size="sm" className="w-full pb-0">
      <CardHeader>
        <CardTitle className="text-base">Social Links</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-5">
          {SOCIAL_FIELDS.map(
            ({ id, label, icon: Icon, defaultValue, placeholder }) => (
              <Field key={id} className="gap-2">
                <FieldLabel htmlFor={`f01-c6-${id}`}>{label}</FieldLabel>
                <InputGroup className="h-8 rounded-lg">
                  <InputGroupInput
                    id={`f01-c6-${id}`}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                  />
                  <InputGroupAddon>
                    <Icon />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            )
          )}
        </FieldGroup>
      </CardContent>
      <CardFooter className="justify-end gap-2 border-t bg-muted/50 pb-4">
        <Button size="sm" variant="secondary" className="rounded-lg">
          Discard
        </Button>
        <Button size="sm" className={`rounded-lg ${brandButton}`}>
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Notifications                                                       */
/* ------------------------------------------------------------------ */

const NOTIFICATION_OPTIONS = [
  {
    id: "transactions",
    label: "Transaction alerts",
    description: "Deposits, withdrawals, and transfers.",
  },
  {
    id: "security",
    label: "Security alerts",
    description: "Login attempts and account changes.",
  },
  {
    id: "goals",
    label: "Goal milestones",
    description: "Updates at 25%, 50%, 75%, and 100%.",
  },
  {
    id: "market",
    label: "Market updates",
    description: "Daily portfolio summary and price alerts.",
  },
] as const

const brandCheckbox =
  "data-checked:border-brand data-checked:bg-brand data-checked:text-brand-foreground dark:data-checked:bg-brand"

function NotificationsCard() {
  const [selected, setSelected] = React.useState<string[]>([
    "transactions",
    "security",
  ])

  const allChecked = selected.length === NOTIFICATION_OPTIONS.length
  const someChecked = selected.length > 0 && !allChecked

  return (
    <Card size="sm" className="w-full pb-0">
      <CardHeader>
        <CardTitle className="text-base">Notifications</CardTitle>
        <CardDescription>
          Choose what you want to be notified about.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-5">
          <Field orientation="horizontal" className="gap-2">
            <Checkbox
              id="f01-c6-notify-all"
              checked={allChecked}
              indeterminate={someChecked}
              onCheckedChange={(checked) =>
                setSelected(
                  checked ? NOTIFICATION_OPTIONS.map((o) => o.id) : []
                )
              }
              className={brandCheckbox}
            />
            <FieldContent className="gap-0.5">
              <FieldLabel htmlFor="f01-c6-notify-all">Select all</FieldLabel>
            </FieldContent>
          </Field>
          {NOTIFICATION_OPTIONS.map((option) => (
            <Field key={option.id} orientation="horizontal" className="gap-2">
              <Checkbox
                id={`f01-c6-notify-${option.id}`}
                checked={selected.includes(option.id)}
                onCheckedChange={(checked) =>
                  setSelected((prev) =>
                    checked
                      ? [...prev, option.id]
                      : prev.filter((id) => id !== option.id)
                  )
                }
                className={brandCheckbox}
              />
              <FieldContent className="gap-0.5">
                <FieldLabel htmlFor={`f01-c6-notify-${option.id}`}>
                  {option.label}
                </FieldLabel>
                <FieldDescription>{option.description}</FieldDescription>
              </FieldContent>
            </Field>
          ))}
        </FieldGroup>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 pb-4">
        <Button size="sm" className={`w-full rounded-lg ${brandButton}`}>
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  )
}

export function Frame01Column6() {
  return (
    <div className="flex w-full flex-col gap-10">
      <StockPerformanceCard />
      <ExploreCatalogCard />
      <MilestoneCard />
      <SocialLinksCard />
      <NotificationsCard />
    </div>
  )
}
