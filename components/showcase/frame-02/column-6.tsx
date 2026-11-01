"use client"

import * as React from "react"
import { IconCloudUpload } from "@tabler/icons-react"

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
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"

const fitnessDays = [
  { day: "M", value: 84 },
  { day: "T", value: 52 },
  { day: "W", value: 73 },
  { day: "T", value: 66 },
  { day: "F", value: 91 },
  { day: "S", value: 48 },
  { day: "S", value: 61 },
]

function WeeklyFitnessCard() {
  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className="text-base leading-snug">
          Weekly Fitness Summary
        </CardTitle>
        <CardDescription>Calories and workout load by day</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1.5">
          {fitnessDays.map((item, index) => (
            <div key={index} className="rounded-md p-1.5 ring-1 ring-border">
              <div className="text-center text-sm text-muted-foreground">
                {item.day}
              </div>
              <div className="relative mt-1 h-16 overflow-hidden rounded-sm bg-muted">
                <div
                  className="absolute inset-x-0 bottom-0 rounded-sm bg-chart-4"
                  style={{ height: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 pb-4">
        <Button
          size="sm"
          className="w-full rounded-lg bg-brand text-brand-foreground hover:bg-brand/90"
        >
          View details
        </Button>
      </CardFooter>
    </Card>
  )
}

function FileUploadCard() {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [files, setFiles] = React.useState<File[]>([])

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="text-base leading-snug">File Upload</CardTitle>
        <CardDescription>Drag and drop or browse</CardDescription>
      </CardHeader>
      <CardContent>
        <Empty
          className="gap-4 rounded-xl border border-dashed border-border p-6"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault()
            setFiles(Array.from(event.dataTransfer.files))
          }}
        >
          <EmptyHeader>
            <EmptyMedia variant="icon" className="size-8 rounded-lg">
              <IconCloudUpload className="size-4" stroke={2} />
            </EmptyMedia>
            <EmptyTitle className="text-sm leading-5">
              {files.length > 0
                ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
                : "Upload files"}
            </EmptyTitle>
            <EmptyDescription>PNG, JPG, PDF up to 10MB</EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="gap-2.5">
            <input
              ref={inputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              multiple
              className="sr-only"
              tabIndex={-1}
              onChange={(event) =>
                setFiles(Array.from(event.target.files ?? []))
              }
            />
            <Button
              size="sm"
              className="rounded-lg bg-brand text-brand-foreground hover:bg-brand/90"
              onClick={() => inputRef.current?.click()}
            >
              Browse Files
            </Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}

function AnalyticsCard() {
  return (
    <Card size="sm" className="gap-3 pt-3 pb-0">
      <CardHeader className="px-3">
        <CardTitle className="leading-snug">Analytics</CardTitle>
        <CardDescription>418.2K Visitors +10%</CardDescription>
        <CardAction>
          <Button
            variant="outline"
            className="h-7 rounded-md px-2.5 text-[13px]"
          >
            View Analytics
          </Button>
        </CardAction>
      </CardHeader>
      <svg
        viewBox="0 0 381 133"
        preserveAspectRatio="none"
        className="block aspect-[1/0.35] w-full"
        aria-hidden="true"
      >
        <path
          d="M0,55.694L76.2,6.234L152.4,34.497L228.6,102.659L304.8,46.134L381,44.056L381,133L304.8,133L228.6,133L152.4,133L76.2,133L0,133Z"
          className="fill-chart-1/40"
        />
        <path
          d="M0,55.694L76.2,6.234L152.4,34.497L228.6,102.659L304.8,46.134L381,44.056"
          className="fill-none stroke-chart-1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </Card>
  )
}

// Ring progress as a fraction of the full circumference (267.035).
const usageItems = [
  { label: "Edge Requests", value: "$1.83K", progress: 179.822 / 267.035 },
  {
    label: "Fast Data Transfer",
    value: "$952.51",
    progress: 139.339 / 267.035,
  },
  {
    label: "Monitoring data points",
    value: "$901.20",
    progress: 238.783 / 267.035,
  },
  {
    label: "Web Analytics Events",
    value: "$603.71",
    progress: 121.955 / 267.035,
  },
  { label: "ISR Writes", value: "524.52K / 2M", progress: 70.043 / 267.035 },
  {
    label: "Function Duration",
    value: "5.11 GB Hrs / 1K GB Hrs",
    progress: 13.646 / 267.035,
  },
]

function ProgressRing({ progress }: { progress: number }) {
  const circumference = 2 * Math.PI * 42.5
  return (
    <svg
      viewBox="0 0 100 100"
      className="size-4 shrink-0 -rotate-90"
      aria-hidden="true"
    >
      <circle
        cx="50"
        cy="50"
        r="42.5"
        className="fill-none stroke-primary opacity-20"
        strokeWidth="12"
      />
      <circle
        cx="50"
        cy="50"
        r="42.5"
        className="fill-none stroke-primary"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={`${progress * circumference} ${circumference}`}
      />
    </svg>
  )
}

function UsageCard() {
  return (
    <Card size="sm">
      <CardHeader>
        <div className="px-1">
          <CardTitle className="leading-snug">
            5 days remaining in cycle
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="gap-0">
        {usageItems.map((item) => (
          <div
            key={item.label}
            className="flex w-full flex-wrap items-center gap-2 rounded-lg border border-transparent py-2"
          >
            <ProgressRing progress={item.progress} />
            <div className="min-w-0 grow basis-0 overflow-hidden">
              <div className="line-clamp-1 text-sm leading-snug font-medium text-foreground">
                {item.label}
              </div>
            </div>
            <div className="font-mono text-xs font-medium text-muted-foreground tabular-nums">
              {item.value}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

const shortcuts = [
  { label: "Search", key: "K" },
  { label: "Quick Actions", key: "J" },
  { label: "New File", key: "N" },
  { label: "Save", key: "S" },
  { label: "Toggle Sidebar", key: "B" },
]

function ShortcutsCard() {
  return (
    <Card size="sm">
      <CardContent className="gap-3">
        <div className="text-sm font-medium text-foreground">Shortcuts</div>
        <div className="flex w-full flex-col gap-2">
          {shortcuts.map((shortcut, index) => (
            <React.Fragment key={shortcut.label}>
              {index > 0 && <Separator className="my-2" />}
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm leading-snug text-muted-foreground">
                  {shortcut.label}
                </span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>{shortcut.key}</Kbd>
                </KbdGroup>
              </div>
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function Frame02Column6() {
  return (
    <div className="flex w-full flex-col gap-10">
      <WeeklyFitnessCard />
      <FileUploadCard />
      <AnalyticsCard />
      <UsageCard />
      <ShortcutsCard />
    </div>
  )
}
