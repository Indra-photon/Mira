"use client"

import * as React from "react"
import Link from "next/link"
import { IconSearch } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const brandButton =
  "rounded-lg bg-brand text-brand-foreground hover:bg-brand/90"

function AnomaliesCard() {
  return (
    <Card size="sm">
      <CardContent>
        <Empty className="h-48 gap-4 rounded-xl p-6">
          <EmptyHeader>
            <EmptyTitle className="text-sm leading-5">
              Get alerted for anomalies
            </EmptyTitle>
            <EmptyDescription>
              Automatically monitor your projects for anomalies and get
              notified.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="gap-2.5">
            <Button size="sm" className={brandButton}>
              Upgrade to Observability Plus
            </Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}

// Bar heights / opacities measured from the Paper waveform bitmap (697×160).
const waveformBars: [height: number, opacity: number][] = [
  [44, 0.36],
  [44, 0.41],
  [42, 0.46],
  [42, 0.51],
  [42, 0.57],
  [42, 0.59],
  [40, 0.59],
  [40, 0.58],
  [38, 0.58],
  [38, 0.58],
  [36, 0.57],
  [36, 0.56],
  [34, 0.56],
  [34, 0.55],
  [32, 0.55],
  [32, 0.55],
  [30, 0.54],
  [30, 0.53],
  [28, 0.53],
  [28, 0.53],
  [26, 0.52],
  [26, 0.52],
  [24, 0.51],
  [24, 0.51],
  [24, 0.51],
  [24, 0.51],
  [24, 0.51],
  [24, 0.51],
  [24, 0.51],
  [24, 0.51],
  [24, 0.51],
  [24, 0.51],
  [25, 0.51],
  [26, 0.52],
  [26, 0.52],
  [26, 0.52],
  [28, 0.53],
  [28, 0.53],
  [28, 0.53],
  [28, 0.53],
  [28, 0.53],
  [29, 0.53],
  [30, 0.53],
  [30, 0.54],
  [30, 0.54],
  [30, 0.54],
  [30, 0.54],
  [30, 0.54],
  [30, 0.54],
  [30, 0.53],
  [28, 0.53],
  [28, 0.53],
  [28, 0.53],
  [27, 0.53],
  [26, 0.52],
  [26, 0.51],
  [24, 0.51],
  [22, 0.51],
  [22, 0.5],
  [20, 0.49],
  [18, 0.49],
  [17, 0.48],
  [16, 0.47],
  [14, 0.46],
  [12, 0.45],
  [10, 0.44],
  [8, 0.39],
  [8, 0.35],
  [8, 0.31],
]

type WaveformMode = "listening" | "processing" | "static"

function Waveform({ mode }: { mode: WaveformMode }) {
  return (
    <svg
      viewBox="0 0 697 160"
      className="block h-20 w-full"
      aria-label={`Audio waveform, ${mode}`}
      role="img"
    >
      {waveformBars.map(([height, opacity], index) => {
        const h = mode === "static" ? 8 : height
        return (
          <rect
            key={index}
            x={index * 10}
            y={80 - h / 2}
            width={6}
            height={h}
            rx={3}
            className={
              mode === "listening"
                ? "animate-pulse fill-chart-2"
                : "fill-chart-2 transition-all duration-300"
            }
            style={{
              opacity,
              animationDelay:
                mode === "listening" ? `${(index % 12) * 120}ms` : undefined,
            }}
          />
        )
      })}
    </svg>
  )
}

const waveformModes: { value: WaveformMode; label: string }[] = [
  { value: "listening", label: "Start Listening" },
  { value: "processing", label: "Stop Processing" },
  { value: "static", label: "Static" },
]

function LiveAudioWaveformCard() {
  const [mode, setMode] = React.useState<WaveformMode>("processing")

  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className="text-base leading-snug">
          Live Audio Waveform
        </CardTitle>
        <CardDescription>
          Real-time microphone input visualization with audio reactivity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Waveform mode={mode} />
      </CardContent>
      <CardFooter className="border-t bg-muted/50 pb-4">
        <ToggleGroup
          value={[mode]}
          onValueChange={(value) => {
            const next = value[0] as WaveformMode | undefined
            if (next) setMode(next)
          }}
          spacing={2}
        >
          {waveformModes.map((item) => (
            <ToggleGroupItem
              key={item.value}
              value={item.value}
              variant="outline"
              className="h-7 min-w-0 rounded-md border-input bg-input/30 px-2.5 text-[13px] text-foreground shadow-none hover:bg-input/50 aria-pressed:border-transparent aria-pressed:bg-brand aria-pressed:text-brand-foreground aria-pressed:hover:bg-brand/90"
            >
              {item.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardFooter>
    </Card>
  )
}

function VisitorsCard() {
  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className="text-base leading-snug">Visitors</CardTitle>
        <CardDescription>Last 6 months</CardDescription>
        <CardAction>
          <Badge className="bg-muted text-foreground">+2% vs last month</Badge>
        </CardAction>
      </CardHeader>
      <svg
        viewBox="0 0 381 192"
        preserveAspectRatio="none"
        className="block h-48 w-full"
        aria-hidden="true"
      >
        <path
          d="M0,83.887C25.4,53.692,50.8,23.497,76.2,14.719C101.6,5.941,127,18.58,152.4,54.244C177.8,89.908,203.2,148.596,228.6,149.569C254,150.541,279.4,93.797,304.8,70.519C330.2,47.24,355.6,57.426,381,67.613L381,192C355.6,192,330.2,192,304.8,192C279.4,192,254,192,228.6,192C203.2,192,177.8,192,152.4,192C127,192,101.6,192,76.2,192C50.8,192,25.4,192,0,192Z"
          className="fill-chart-1/15"
        />
        <path
          d="M0,83.887C25.4,53.692,50.8,23.497,76.2,14.719C101.6,5.941,127,18.58,152.4,54.244C177.8,89.908,203.2,148.596,228.6,149.569C254,150.541,279.4,93.797,304.8,70.519C330.2,47.24,355.6,57.426,381,67.613"
          className="fill-none stroke-chart-1"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </Card>
  )
}

function ContributionsCard() {
  const id = React.useId()
  const [isPrivate, setIsPrivate] = React.useState(false)

  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className="text-base leading-snug">
          Contributions &amp; Activity
        </CardTitle>
        <CardDescription>
          Manage your contributions and activity visibility.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field orientation="horizontal" className="gap-2">
          <Checkbox
            id={id}
            checked={isPrivate}
            onCheckedChange={(checked) => setIsPrivate(checked)}
          />
          <FieldContent className="gap-0.5">
            <FieldLabel htmlFor={id} className="leading-none">
              Make profile private and hide activity
            </FieldLabel>
            <FieldDescription>
              Enabling this will hide your contributions and activity from your
              GitHub profile and from social features like followers, stars,
              feeds, leaderboards and releases.
            </FieldDescription>
          </FieldContent>
        </Field>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 pb-4">
        <Button size="sm" className={brandButton}>
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  )
}

function NotFoundCard() {
  return (
    <Card size="sm">
      <CardContent>
        <Empty className="h-72 gap-4 rounded-xl p-6">
          <EmptyHeader>
            <EmptyTitle className="text-sm leading-5">
              404 - Not Found
            </EmptyTitle>
            <EmptyDescription>
              The page you&apos;re looking for doesn&apos;t exist. Try searching
              for what you need below.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="gap-2.5">
            <InputGroup className="h-8 w-3/4 rounded-lg">
              <InputGroupInput
                placeholder="Try searching for pages..."
                aria-label="Search pages"
              />
              <InputGroupAddon>
                <IconSearch />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Kbd>/</Kbd>
              </InputGroupAddon>
            </InputGroup>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-lg text-primary"
              nativeButton={false}
              render={<Link href="/" />}
            >
              Go to homepage
            </Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}

export function Frame02Column7() {
  return (
    <div className="flex w-full flex-col gap-10">
      <AnomaliesCard />
      <LiveAudioWaveformCard />
      <VisitorsCard />
      <ContributionsCard />
      <NotFoundCard />
    </div>
  )
}
