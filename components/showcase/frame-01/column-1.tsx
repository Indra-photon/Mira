"use client"

import { IconLoader, IconPlus, IconX } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"

/* -------------------------------------------------------------------------- */
/*                            Contribution History                            */
/* -------------------------------------------------------------------------- */

// Bar heights in px inside a 162px plot area (Paper chart values).
const contributions = [
  { month: "Dec", height: 92.571 },
  { month: "Jan", height: 127.286 },
  { month: "Feb", height: 104.143 },
  { month: "Mar", height: 150.429 },
  { month: "Apr", height: 86.786 },
  { month: "May", height: 162 },
]

const contributionStats = [
  { label: "Upcoming", value: "May 25, 2024", detail: "$1,000 scheduled" },
  { label: "Auto-Save Plan", value: "Accelerated", detail: "Recurring weekly" },
]

function ContributionHistoryCard() {
  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className="group-data-[size=sm]/card:text-base">
          Contribution History
        </CardTitle>
        <CardDescription>Last 6 months of activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          role="img"
          aria-label="Monthly contributions, December to May"
          className="flex h-[200px] w-full"
        >
          {contributions.map((bar) => (
            <div key={bar.month} className="flex flex-1 flex-col items-center">
              <div className="mt-2 flex h-[162px] w-full items-end justify-center">
                <div
                  className="w-10 rounded-t-sm bg-blue-950"
                  style={{ height: bar.height }}
                />
              </div>
              <span className="mt-3.5 text-xs leading-none text-neutral-500">
                {bar.month}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardContent>
        <div className="grid w-full grid-cols-2 gap-3">
          {contributionStats.map((stat) => (
            <Item
              key={stat.label}
              variant="muted"
              size="sm"
              className="flex-col items-stretch rounded-lg"
            >
              <ItemContent>
                <div className="line-clamp-2 text-xs leading-normal font-medium tracking-wide text-muted-foreground uppercase">
                  {stat.label}
                </div>
                <div className="text-lg leading-7 font-semibold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.detail}
                </div>
              </ItemContent>
            </Item>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 py-4">
        <Button
          size="sm"
          className="w-full rounded-lg bg-blue-950 text-foreground hover:bg-blue-950/80"
        >
          View Full Report
        </Button>
      </CardFooter>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*                              Distribute Track                              */
/* -------------------------------------------------------------------------- */

function DistributeTrackCard() {
  return (
    <Card size="sm">
      <CardContent>
        <div className="flex w-full flex-col items-center justify-center gap-4 rounded-xl p-4">
          <div className="mb-2 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
            <IconPlus className="size-4" stroke={2} />
          </div>
          <div className="flex max-w-96 flex-col items-center gap-2">
            <div className="text-center text-sm font-medium tracking-tight text-balance text-foreground">
              Distribute Track
            </div>
            <p className="text-center text-sm leading-relaxed text-balance text-muted-foreground">
              Upload your first master to start reaching listeners on Spotify,
              Apple Music, and more.
            </p>
          </div>
          <div className="flex w-full max-w-96 min-w-0 flex-col items-center gap-2.5">
            <Button
              size="sm"
              className="rounded-lg bg-brand text-brand-foreground hover:bg-brand/90"
            >
              Create Release
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*                               Scan to connect                              */
/* -------------------------------------------------------------------------- */

// Dark modules of the 29×29 QR code, as column indices per row (from Paper).
const qrRows: number[][] = [
  [0, 1, 2, 3, 4, 5, 6, 12, 13, 16, 17, 18, 19, 22, 23, 24, 25, 26, 27, 28],
  [0, 6, 9, 12, 13, 14, 15, 18, 22, 28],
  [0, 2, 3, 4, 6, 11, 13, 16, 17, 18, 19, 20, 22, 24, 25, 26, 28],
  [0, 2, 3, 4, 6, 9, 13, 14, 15, 18, 22, 24, 25, 26, 28],
  [0, 2, 3, 4, 6, 9, 11, 12, 13, 14, 16, 18, 22, 24, 25, 26, 28],
  [0, 6, 8, 10, 11, 13, 14, 18, 19, 22, 28],
  [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 23, 24, 25, 26, 27, 28],
  [9, 11, 12, 14, 17, 18, 19, 20],
  [0, 3, 5, 6, 8, 9, 11, 15, 16, 19, 21, 23],
  [0, 1, 3, 4, 8, 9, 10, 11, 12, 14, 15, 17, 20, 21, 22, 25, 28],
  [0, 1, 2, 3, 4, 6, 7, 9, 10, 16, 17, 18, 19, 21, 23, 25, 26, 27],
  [0, 2, 3, 4, 9, 10, 12, 14, 15, 18, 20, 23, 26, 27],
  [1, 2, 3, 4, 6, 7, 8, 9, 12, 15, 17, 20, 21, 22, 25, 27, 28],
  [2, 4, 5, 9, 10, 11, 12, 16, 17, 18, 19, 20],
  [0, 3, 4, 6, 8, 16, 17, 20, 22, 23, 24, 25, 26, 27, 28],
  [0, 2, 3, 11, 13, 14, 17, 20, 21, 22, 25, 27],
  [1, 2, 4, 5, 6, 10, 13, 14, 16, 17, 18, 20, 27],
  [11, 17, 20, 21, 22, 23, 25, 28],
  [0, 3, 4, 6, 7, 13, 16, 17, 20, 21, 23, 24, 27, 28],
  [4, 9, 10, 12, 13, 15, 16, 17, 18, 21, 27, 28],
  [0, 2, 5, 6, 7, 11, 14, 15, 20, 21, 22, 23, 24, 26],
  [8, 9, 10, 11, 13, 20, 24, 26, 27, 28],
  [0, 1, 2, 3, 4, 5, 6, 13, 14, 17, 18, 20, 22, 24, 27],
  [0, 6, 8, 9, 11, 13, 15, 16, 20, 24, 25, 26, 27, 28],
  [0, 2, 3, 4, 6, 14, 17, 20, 21, 22, 23, 24, 28],
  [0, 2, 3, 4, 6, 8, 9, 10, 12, 14, 16, 17, 22, 23, 24, 25, 26, 27],
  [0, 2, 3, 4, 6, 9, 12, 17, 24, 25, 26, 28],
  [0, 6, 10, 11, 15, 16, 17, 20, 21, 23, 27],
  [0, 1, 2, 3, 4, 5, 6, 8, 12, 13, 15, 17, 18, 20, 21, 23, 25, 27],
]

const qrPath = qrRows
  .flatMap((cols, y) => cols.map((x) => `M${x} ${y}h1v1h-1z`))
  .join("")

function ScanToConnectCard() {
  return (
    <Card size="sm" className="pb-0">
      <div className="flex justify-center px-4 pt-6">
        <div className="rounded-xl border border-border bg-white p-4">
          <svg
            viewBox="0 0 29 29"
            className="size-40"
            role="img"
            aria-label="QR code to link your mobile device"
            shapeRendering="crispEdges"
          >
            <path d={qrPath} className="fill-black" />
          </svg>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-center group-data-[size=sm]/card:text-base">
          Scan to connect your mobile device
        </CardTitle>
        <CardDescription className="text-center">
          Open the Ledger mobile app and scan this code to link your device.
        </CardDescription>
      </CardHeader>
      <CardFooter className="border-t bg-muted/50 py-4">
        <Button
          size="sm"
          className="w-full rounded-lg bg-muted text-foreground hover:bg-muted/80"
        >
          Got it
        </Button>
      </CardFooter>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*                             Q2 Dividend Income                             */
/* -------------------------------------------------------------------------- */

// Top (y) of each of the four mini bars inside a 96×32 sparkline (Paper values).
const dividends = [
  {
    name: "Vanguard VIG",
    shares: "450 Shares",
    amount: "$1,842.10",
    bars: [16.8, 15.2, 16.4, 5.92],
  },
  {
    name: "S&P 500 VOO",
    shares: "112 Shares",
    amount: "$928.40",
    bars: [14, 11, 0, 10.2],
  },
  {
    name: "Apple AAPL",
    shares: "85 Shares",
    amount: "$340.00",
    bars: [16, 13.333, 0, 8],
  },
  {
    name: "Realty Income",
    shares: "320 Shares",
    amount: "$1,139.50",
    bars: [10.667, 8.889, 7.111, 0],
  },
]

function miniBarPath(x: number, y: number) {
  // 19px wide bar, 3px top corner radius, resting on the 32px baseline.
  return `M${x},${y + 3}A3,3,0,0,1,${x + 3},${y}L${x + 16},${y}A3,3,0,0,1,${x + 19},${y + 3}L${x + 19},32L${x},32Z`
}

function MiniBars({ bars }: { bars: number[] }) {
  return (
    <svg viewBox="0 0 96 32" className="h-8 w-24 shrink-0" aria-hidden="true">
      {bars.map((y, i) => (
        <path
          key={i}
          d={miniBarPath(2.4 + i * 24, y)}
          className="fill-chart-2"
        />
      ))}
    </svg>
  )
}

function DividendIncomeCard() {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="group-data-[size=sm]/card:text-base">
          Q2 Dividend Income
        </CardTitle>
        <CardDescription>
          Quarterly dividend payouts across your portfolio holdings.
        </CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Close"
            className="size-7 rounded-md bg-muted"
          >
            <IconX stroke={2} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-col gap-4">
          {dividends.map((row) => (
            <Item
              key={row.name}
              variant="muted"
              size="sm"
              className="rounded-lg"
            >
              <ItemContent>
                <ItemTitle>{row.name}</ItemTitle>
                <ItemDescription>{row.shares}</ItemDescription>
              </ItemContent>
              <MiniBars bars={row.bars} />
              <ItemActions className="text-sm font-semibold text-foreground tabular-nums">
                {row.amount}
              </ItemActions>
            </Item>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*                            Dollar-Cost Averaging                           */
/* -------------------------------------------------------------------------- */

function DollarCostAveragingCard() {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="group-data-[size=sm]/card:text-base">
          Dollar-Cost Averaging
        </CardTitle>
        <CardDescription>
          A strategy for building wealth over time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Over time, this smooths out the average cost of your investments. When
          prices drop, your fixed amount buys more shares. When prices rise, you
          buy fewer. The result is a lower average cost per share compared to
          lump-sum investing during volatile periods.
        </p>
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*                            Syncing your accounts                           */
/* -------------------------------------------------------------------------- */

function SyncingAccountsCard() {
  return (
    <Card size="sm">
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-xl p-4">
        <div className="flex max-w-96 flex-col items-center gap-2">
          <div className="mb-2 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
            <IconLoader
              className="size-4 motion-safe:animate-spin"
              stroke={2}
              aria-label="Loading"
            />
          </div>
          <div className="text-center text-sm font-medium tracking-tight text-balance text-foreground">
            Syncing your accounts
          </div>
          <p className="text-center text-sm leading-relaxed text-balance text-muted-foreground">
            We&apos;re pulling in your latest transactions. This usually takes a
            few seconds.
          </p>
        </div>
        <div className="flex w-full max-w-96 min-w-0 flex-col items-center gap-2.5">
          <Button variant="outline" size="sm" className="rounded-lg">
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  )
}

export function Frame01Column1() {
  return (
    <div className="flex w-full flex-col gap-10">
      <ContributionHistoryCard />
      <DistributeTrackCard />
      <ScanToConnectCard />
      <DividendIncomeCard />
      <DollarCostAveragingCard />
      <SyncingAccountsCard />
    </div>
  )
}
