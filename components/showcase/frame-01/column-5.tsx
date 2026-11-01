"use client"

import * as React from "react"
import {
  IconChevronLeft,
  IconChevronRight,
  IconCreditCard,
  IconX,
} from "@tabler/icons-react"
import { cn } from "cn"

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
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const brandButton = "bg-brand text-brand-foreground hover:bg-brand/90"
const fieldInput = "h-8 rounded-lg bg-input/30 px-2.5 text-sm"

/* -------------------------------------------------------------------------- */
/* Payout Preferences                                                         */
/* -------------------------------------------------------------------------- */

const receivingMethods = [
  { value: "bank", title: "Bank Transfer", description: "SWIFT / IBAN" },
  { value: "paypal", title: "PayPal", description: "Instant Payout" },
]

function PayoutPreferencesCard() {
  const [method, setMethod] = React.useState("bank")
  const [iban, setIban] = React.useState("")

  return (
    <Card size="sm" className="w-full pb-0">
      <CardHeader>
        <CardDescription>Payout Preferences</CardDescription>
        <CardTitle className="text-base">Receiving Method</CardTitle>
        <CardAction>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Close"
            className="size-7 rounded-md bg-muted hover:bg-muted/80"
          >
            <IconX />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-5">
          <Field className="gap-2">
            <FieldLabel htmlFor="f01-c5-holder" className="leading-none">
              Account Holder Name
            </FieldLabel>
            <Input
              id="f01-c5-holder"
              defaultValue="Synthetic Horizons Music LLC"
              className={fieldInput}
            />
          </Field>
          <div className="flex flex-col gap-3">
            <FieldTitle id="f01-c5-method" className="mb-1.5">
              Receiving Method
            </FieldTitle>
            <RadioGroup
              aria-labelledby="f01-c5-method"
              value={method}
              onValueChange={(value) => setMethod(value as string)}
              className="grid-cols-2 items-start gap-3"
            >
              {receivingMethods.map((option) => (
                <FieldLabel
                  key={option.value}
                  htmlFor={`f01-c5-method-${option.value}`}
                  className="rounded-lg *:data-[slot=field]:p-2.5"
                >
                  <Field orientation="horizontal" className="gap-2">
                    <RadioGroupItem
                      id={`f01-c5-method-${option.value}`}
                      value={option.value}
                      className="mt-px data-checked:border-brand data-checked:bg-brand dark:data-checked:bg-brand [&_[data-slot=radio-group-indicator]>span]:bg-foreground"
                    />
                    <FieldContent className="gap-0.5">
                      <FieldTitle className="leading-[1.375]">
                        {option.title}
                      </FieldTitle>
                      <FieldDescription className="line-clamp-1 font-medium">
                        {option.description}
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              ))}
            </RadioGroup>
          </div>
          <Field className="gap-2">
            <FieldLabel htmlFor="f01-c5-iban" className="leading-none">
              IBAN / Account Number
            </FieldLabel>
            <Input
              id="f01-c5-iban"
              placeholder="DE89 3704 0044 ...."
              value={iban}
              onChange={(event) => setIban(event.target.value)}
              className={fieldInput}
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 pb-4">
        <Button
          disabled={iban.trim().length === 0}
          className={`h-8 w-full rounded-lg ${brandButton}`}
        >
          Save Payout Settings
        </Button>
      </CardFooter>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Power Usage                                                                */
/* -------------------------------------------------------------------------- */

const powerUsage = [
  { hour: "6a", height: 33.474 },
  { hour: "8a", height: 78.105 },
  { hour: "10a", height: 86.474 },
  { hour: "12p", height: 66.947 },
  { hour: "2p", height: 94.842 },
  { hour: "4p", height: 80.895 },
  { hour: "6p", height: 106 },
  { hour: "8p", height: 89.263 },
]

function PowerUsageCard() {
  return (
    <Card size="sm" className="w-full pb-0">
      <CardHeader>
        <CardTitle className="text-base">Power Usage</CardTitle>
        <CardDescription>Whole Home</CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <div className="flex h-[140px] w-full flex-col" aria-hidden="true">
          <div className="mt-1 flex h-[106px] items-end">
            {powerUsage.map((bar) => (
              <div key={bar.hour} className="flex flex-1 justify-center">
                <div
                  className="w-[79%] rounded-t-sm bg-chart-2"
                  style={{ height: bar.height }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex">
            {powerUsage.map((bar) => (
              <div
                key={bar.hour}
                className="flex-1 text-center text-xs leading-none text-neutral-500"
              >
                {bar.hour}
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-0.5">
            <div className="text-sm text-muted-foreground">Currently Using</div>
            <div className="text-lg leading-7 font-semibold text-foreground tabular-nums">
              3.4 kW
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="text-sm text-muted-foreground">Solar Gen</div>
            <div className="text-lg leading-7 font-semibold text-chart-1 tabular-nums">
              +1.2 kW
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 border-t bg-muted/50 pb-4">
        <div id="f01-c5-battery" className="text-sm text-muted-foreground">
          Battery Level
        </div>
        <div className="flex w-full items-center gap-2">
          <Progress
            value={85}
            aria-labelledby="f01-c5-battery"
            className="flex-1 [&_[data-slot=progress-indicator]]:bg-brand [&_[data-slot=progress-track]]:h-1"
          />
          <span className="text-sm font-medium text-foreground tabular-nums">
            85%
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Connect Bank                                                               */
/* -------------------------------------------------------------------------- */

function ConnectBankCard() {
  return (
    <Card size="sm" className="w-full">
      <CardContent>
        <Empty className="gap-4 rounded-xl p-4">
          <EmptyMedia variant="icon" className="size-8 rounded-lg">
            <IconCreditCard className="size-4" />
          </EmptyMedia>
          <EmptyHeader className="gap-2">
            <EmptyTitle className="text-sm leading-5 font-medium tracking-tight">
              Connect Bank
            </EmptyTitle>
            <EmptyDescription>
              Link your payout method to receive monthly royalty distributions
              automatically.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="gap-2.5">
            <Button className={`h-8 rounded-lg px-2.5 ${brandButton}`}>
              Set Up Payouts
            </Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Upcoming Payments                                                          */
/* -------------------------------------------------------------------------- */

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function getCalendarWeeks(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const last = new Date(month.getFullYear(), month.getMonth() + 1, 0)
  const start = new Date(first)
  start.setDate(first.getDate() - first.getDay())
  const end = new Date(last)
  end.setDate(last.getDate() + (6 - last.getDay()))

  const weeks: Date[][] = []
  const cursor = new Date(start)
  while (cursor <= end) {
    const week: Date[] = []
    for (let i = 0; i < 7; i++) {
      week.push(new Date(cursor))
      cursor.setDate(cursor.getDate() + 1)
    }
    weeks.push(week)
  }
  return weeks
}

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
})
const dayFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "full" })

function PaymentsCalendar() {
  const [month, setMonth] = React.useState(() => new Date(2026, 8, 1))
  const [selected, setSelected] = React.useState(() => new Date(2026, 8, 26))
  const weeks = React.useMemo(() => getCalendarWeeks(month), [month])

  const shiftMonth = (delta: number) =>
    setMonth(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + delta, 1)
    )

  return (
    <div className="flex w-full items-center justify-center rounded-lg border border-border px-3 py-2.5">
      <div className="w-full p-2">
        <div className="relative flex flex-col gap-4">
          <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-1">
            <Button
              variant="ghost"
              size="icon-lg"
              aria-label="Previous month"
              className="rounded-lg"
              onClick={() => shiftMonth(-1)}
            >
              <IconChevronLeft />
            </Button>
            <Button
              variant="ghost"
              size="icon-lg"
              aria-label="Next month"
              className="rounded-lg"
              onClick={() => shiftMonth(1)}
            >
              <IconChevronRight />
            </Button>
          </div>
          <div className="flex h-10 w-full items-center justify-center px-10">
            <div
              className="text-sm font-medium text-foreground"
              aria-live="polite"
            >
              {monthFormatter.format(month)}
            </div>
          </div>
          <div role="grid" className="w-full">
            <div role="row" className="flex">
              {weekdays.map((day) => (
                <div
                  key={day}
                  role="columnheader"
                  className="flex-1 text-center text-[13px] leading-5 text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>
            {weeks.map((week) => (
              <div
                key={week[0].toISOString()}
                role="row"
                className="mt-2 flex w-full"
              >
                {week.map((day) => {
                  const outside = day.getMonth() !== month.getMonth()
                  const isSelected = isSameDay(day, selected)
                  return (
                    <div
                      key={day.toISOString()}
                      role="gridcell"
                      aria-selected={isSelected}
                      className="flex-1"
                    >
                      <button
                        type="button"
                        aria-label={dayFormatter.format(day)}
                        aria-pressed={isSelected}
                        onClick={() => {
                          setSelected(day)
                          if (outside) {
                            setMonth(
                              new Date(day.getFullYear(), day.getMonth(), 1)
                            )
                          }
                        }}
                        className={cn(
                          "flex aspect-square w-full items-center justify-center rounded-lg text-sm leading-none outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50",
                          outside ? "text-muted-foreground" : "text-foreground",
                          isSelected &&
                            "bg-brand text-brand-foreground hover:bg-brand/90"
                        )}
                      >
                        {day.getDate()}
                      </button>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const upcomingPayments = [
  { name: "Netflix Subscription", date: "Apr 15, 2024", amount: "$19.99" },
  { name: "Rent Payment", date: "Apr 1, 2024", amount: "$2,400.00" },
  { name: "Auto Insurance", date: "Apr 22, 2024", amount: "$186.00" },
]

function UpcomingPaymentsCard() {
  return (
    <Card size="sm" className="w-full">
      <CardHeader>
        <CardTitle className="text-base">Upcoming Payments</CardTitle>
        <CardDescription>
          Select a date to view scheduled payments.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <PaymentsCalendar />
        <ItemGroup className="gap-4 has-data-[size=sm]:gap-4">
          {upcomingPayments.map((payment) => (
            <Item
              key={payment.name}
              variant="muted"
              size="sm"
              role="listitem"
              className="rounded-lg"
            >
              <ItemContent>
                <ItemTitle className="leading-[1.375]">
                  {payment.name}
                </ItemTitle>
                <ItemDescription>{payment.date}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Badge className="bg-muted text-foreground tabular-nums">
                  {payment.amount}
                </Badge>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Living Room shades                                                         */
/* -------------------------------------------------------------------------- */

const shadePresets = [
  { value: "open", label: "Open", position: 0 },
  { value: "half", label: "Half", position: 50 },
  { value: "closed", label: "Closed", position: 100 },
]

function LivingRoomCard() {
  const [position, setPosition] = React.useState(50)
  const preset = shadePresets.find((item) => item.position === position)

  return (
    <Card size="sm" className="w-full pb-0">
      <CardHeader>
        <CardTitle className="text-base">Living Room</CardTitle>
        <CardDescription>Roller Shades</CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <div
          className="flex h-32 shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-muted"
          aria-hidden="true"
        >
          <div
            className="bg-muted-foreground transition-[height] duration-200 ease-out"
            style={{ height: `${position}%` }}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Open
          </span>
          <Slider
            aria-label="Shade position"
            value={[position]}
            onValueChange={(value) =>
              setPosition(Array.isArray(value) ? value[0] : value)
            }
            className="flex-1 [&_[data-slot=slider-range]]:bg-brand [&_[data-slot=slider-thumb]]:size-3 [&_[data-slot=slider-thumb]]:border-ring [&_[data-slot=slider-track]]:h-1!"
          />
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Close
          </span>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 pb-4">
        <ToggleGroup
          variant="outline"
          size="sm"
          spacing={1}
          aria-label="Shade presets"
          value={preset ? [preset.value] : []}
          onValueChange={(values) => {
            const next = shadePresets.find((item) => item.value === values[0])
            if (next) setPosition(next.position)
          }}
          className="w-full rounded-lg"
        >
          {shadePresets.map((item) => (
            <ToggleGroupItem
              key={item.value}
              value={item.value}
              className="h-8 flex-1 rounded-lg px-2.5 shadow-none"
            >
              {item.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardFooter>
    </Card>
  )
}

export function Frame01Column5() {
  return (
    <div className="flex w-full flex-col gap-10">
      <PayoutPreferencesCard />
      <PowerUsageCard />
      <ConnectBankCard />
      <UpcomingPaymentsCard />
      <LivingRoomCard />
    </div>
  )
}
